from backend.utils.pdf_generator import generate_pdf_report
import os

def test_pdf():
    dummy_data = {
        "symbol": "TEST",
        "profile": {
            "company_name": "Test Corp",
            "sector": "Technology",
            "industry": "Software",
            "currency": "USD",
            "description": "A test company description."
        },
        "price_metrics": {"current_price": 100},
        "fundamentals": {"pe_ratio": 20, "market_cap": 1000000},
        "report_markdown": "# Test Report\n\nThis is a *test* report."
    }
    
    try:
        pdf = generate_pdf_report("TEST", dummy_data)
        outfile = "test_report.pdf"
        pdf.output(outfile)
        if os.path.exists(outfile):
            print(f"SUCCESS: PDF created at {outfile}")
            os.remove(outfile)
        else:
            print("FAILED: PDF file not found after generation")
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    test_pdf()
