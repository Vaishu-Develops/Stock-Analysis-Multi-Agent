import yfinance as yf

def fetch_fundamentals(symbol: str) -> dict:
    """
    Fetches fundamental data for a symbol.
    """
    ticker = yf.Ticker(symbol)
    info = ticker.info
    
    # Helper to safely get keys
    def get(key, default=None):
        return info.get(key, default)

    return {
        "revenue_ttm": get("totalRevenue"),
        "revenue_growth_3y": get("revenueGrowth"), # This is usually 1y, yfinance doesn't always have 3y easily
        "net_margin": get("profitMargins"),
        "operating_margin": get("operatingMargins"),
        "roe": get("returnOnEquity"),
        "roa": get("returnOnAssets"),
        "debt_to_equity": get("debtToEquity"),
        "free_cash_flow": get("freeCashflow"),
        "pe_ratio": get("trailingPE"),
        "pb_ratio": get("priceToBook"),
        "ps_ratio": get("priceToSalesTrailing12Months"),
        "ev_ebitda": get("enterpriseToEbitda"),
        "fundamental_score": _calculate_score(info)
    }

def _calculate_score(info: dict) -> int:
    """
    Simple rule-based scoring (0-100).
    """
    score = 50 # Base
    
    # Profitability
    if info.get("profitMargins", 0) > 0.1: score += 10
    if info.get("returnOnEquity", 0) > 0.15: score += 10
    
    # Valuation
    pe = info.get("trailingPE")
    if pe and pe < 20: score += 10
    elif pe and pe > 50: score -= 10
    
    # Growth
    if info.get("revenueGrowth", 0) > 0.1: score += 10
    
    # Health
    if info.get("debtToEquity", 100) < 50: score += 10
    
    return min(100, max(0, score))
