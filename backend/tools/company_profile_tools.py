import yfinance as yf

def get_company_profile(symbol: str) -> dict:
    """
    Fetches company profile and metadata.
    """
    ticker = yf.Ticker(symbol)
    info = ticker.info
    
    return {
        "company_name": info.get("longName"),
        "symbol": info.get("symbol"),
        "exchange": info.get("exchange"),
        "sector": info.get("sector"),
        "industry": info.get("industry"),
        "country": info.get("country"),
        "description": info.get("longBusinessSummary"),
        "website": info.get("website"),
        "full_time_employees": info.get("fullTimeEmployees"),
        "mktCap": info.get("marketCap"),
        "currency": info.get("currency")
    }
