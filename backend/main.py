from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from pathlib import Path
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend is running"}

from backend.agents.orchestrator import AnalysisOrchestrator
from backend.agents.report_agent import ReportWriterAgent
from pydantic import BaseModel

class StockRequest(BaseModel):
    symbol: str

# Initialize agents
try:
    report_agent = ReportWriterAgent()
except Exception as e:
    print(f"Warning: Could not initialize ReportWriterAgent (missing key?): {e}")
    report_agent = None

orchestrator = AnalysisOrchestrator(report_writer_agent=report_agent)

@app.post("/analyze-stock")
def analyze_stock(request: StockRequest):
    result = orchestrator.run_full_analysis(request.symbol)
    return result

from fastapi.responses import StreamingResponse
import io
from backend.utils.pdf_generator import generate_pdf_report

@app.post("/generate-pdf")
def generate_pdf(data: dict):
    # Expects the full analysis result dict
    symbol = data.get("symbol", "UNKNOWN")
    pdf = generate_pdf_report(symbol, data)
    
    # Output to buffer
    pdf_buffer = io.BytesIO()
    pdf.output(pdf_buffer)
    pdf_buffer.seek(0)
    
    headers = {
        'Content-Disposition': f'attachment; filename="{symbol}_Analysis_Report.pdf"'
    }
    return StreamingResponse(pdf_buffer, headers=headers, media_type='application/pdf')
