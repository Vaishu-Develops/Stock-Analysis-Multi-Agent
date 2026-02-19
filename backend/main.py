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

@app.get("/search-symbols")
def search_symbols(query: str):
    """
    Search for stock symbols using Yahoo Finance autocomplete
    """
    import requests
    import json
    
    try:
        url = "https://query2.finance.yahoo.com/v1/finance/search"
        params = {
            "q": query,
            "quotesCount": 10,
            "newsCount": 0,
            "enableFuzzyQuery": False,
            "quotesQueryId": "tss_match_phrase_query"
        }
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
        
        response = requests.get(url, params=params, headers=headers, timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            quotes = data.get("quotes", [])
            
            # Format results
            results = []
            for quote in quotes:
                results.append({
                    "symbol": quote.get("symbol"),
                    "name": quote.get("longname") or quote.get("shortname"),
                    "type": quote.get("quoteType"),
                    "exchange": quote.get("exchange"),
                    "exchDisp": quote.get("exchDisp")
                })
            
            return {"success": True, "results": results}
        else:
            return {"success": False, "error": "Failed to fetch results", "results": []}
            
    except Exception as e:
        return {"success": False, "error": str(e), "results": []}

from backend.agents.orchestrator import AnalysisOrchestrator
from backend.agents.report_agent import ReportWriterAgent
from backend.utils.symbol_utils import normalize_symbol, get_exchange_info
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
    # Normalize symbol automatically
    raw_symbol = request.symbol
    normalized_symbol = normalize_symbol(raw_symbol)
    
    # Log the normalization
    if raw_symbol != normalized_symbol:
        print(f"📝 Normalized '{raw_symbol}' → '{normalized_symbol}'")
    
    # Get exchange info
    exchange_info = get_exchange_info(normalized_symbol)
    print(f"🌍 Exchange: {exchange_info['exchange']}")
    
    # Run analysis with normalized symbol
    result = orchestrator.run_full_analysis(normalized_symbol)
    
    # Add original and normalized symbols to result
    result["original_symbol"] = raw_symbol
    result["normalized_symbol"] = normalized_symbol
    result["exchange_info"] = exchange_info
    
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
