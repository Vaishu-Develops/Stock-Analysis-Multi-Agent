import yfinance as yf

def get_peers(symbol: str) -> list:
    """
    Returns a list of peer symbols.
    """
    # yfinance doesn't always provide peers directly in a reliable way via API.
    # We might need to hardcode some or use sector-based lookup.
    # For V1, we'll try to get it from info, or fallback to a dummy list.
    ticker = yf.Ticker(symbol)
    # Sometimes 'sector' and 'industry' can help us find peers if we had a DB.
    # For this demo, we will return a static list based on known tech stocks if symbol is tech, etc.
    # Or just return a generic list for demo purposes if not found.
    
    # Very basic mapping for demo
    # Very basic mapping for demo
    peers_map = {
        "AAPL": ["MSFT", "GOOGL", "AMZN"],
        "MSFT": ["AAPL", "GOOGL", "AMZN"],
        "GOOGL": ["MSFT", "AAPL", "META"],
        "RELIANCE.NS": ["TCS.NS", "HDFCBANK.NS", "INFY.NS"],
        "TCS.NS": ["INFY.NS", "HCLTECH.NS", "WIPRO.NS", "TECHM.NS"],
        "INFY.NS": ["TCS.NS", "HCLTECH.NS", "WIPRO.NS", "TECHM.NS"],
        "HDFCBANK.NS": ["ICICIBANK.NS", "SBIN.NS", "KOTAKBANK.NS", "AXISBANK.NS"],
        "ICICIBANK.NS": ["HDFCBANK.NS", "SBIN.NS", "KOTAKBANK.NS", "AXISBANK.NS"],
    }
    
    if symbol in peers_map:
        return peers_map[symbol]
        
    if symbol.endswith(".NS"):
        return ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS"]
        
    return ["AAPL", "MSFT", "GOOGL"] # Default fallback for US/Global

def compare_with_peers(symbol: str, peers: list = None) -> dict:
    """
    Compares symbol with peers.
    """
    if not peers:
        peers = get_peers(symbol)
        
    comparison_data = []
    
    # Get data for main symbol
    main_ticker = yf.Ticker(symbol)
    main_info = main_ticker.info
    
    # Helper
    def extract_metrics(s, info):
        return {
            "symbol": s,
            "company_name": info.get("shortName", s),
            "market_cap": info.get("marketCap"),
            "pe": info.get("trailingPE"),
            "revenue_growth": info.get("revenueGrowth"),
            "net_margin": info.get("profitMargins"),
            "return_1y": info.get("52WeekChange"), # Approx
        }
        
    # Add main symbol first
    comparison_data.append(extract_metrics(symbol, main_info))
    
    # Add peers
    for p in peers:
        try:
            p_info = yf.Ticker(p).info
            comparison_data.append(extract_metrics(p, p_info))
        except:
            continue
            
    return {
        "peers": peers,
        "peer_table": comparison_data,
        "relative_position": "Analysis to be done by LLM or rules"
    }
