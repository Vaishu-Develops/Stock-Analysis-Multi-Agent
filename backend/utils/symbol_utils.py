"""
Symbol normalization utilities for handling stock tickers across exchanges
"""
import yfinance as yf

def normalize_symbol(symbol: str) -> str:
    """
    Normalize stock symbol by adding appropriate suffix if needed.
    
    Args:
        symbol: Raw stock symbol (e.g., "RELIANCE", "AAPL", "RELIANCE.NS")
    
    Returns:
        Normalized symbol with correct suffix
    """
    symbol = symbol.strip().upper()
    
    # Already has a suffix - validate and return
    if '.' in symbol:
        base, suffix = symbol.rsplit('.', 1)
        
        # Fix common mistakes
        if suffix == 'BS':
            return f"{base}.BO"  # Fix .BS to .BO
        
        # Valid suffixes
        valid_suffixes = ['NS', 'BO', 'L', 'T', 'TO', 'V', 'AX', 'HK', 'SI']
        if suffix in valid_suffixes:
            return symbol
        
        # Unknown suffix - try to validate
        return symbol
    
    # No suffix - try to auto-detect
    # First, try as-is (US stocks)
    if is_valid_symbol(symbol):
        return symbol
    
    # Try NSE (most common Indian exchange)
    nse_symbol = f"{symbol}.NS"
    if is_valid_symbol(nse_symbol):
        print(f"✅ Auto-detected NSE symbol: {nse_symbol}")
        return nse_symbol
    
    # Try BSE
    bse_symbol = f"{symbol}.BO"
    if is_valid_symbol(bse_symbol):
        print(f"✅ Auto-detected BSE symbol: {bse_symbol}")
        return bse_symbol
    
    # Return original if nothing works
    print(f"⚠️ Could not auto-detect exchange for {symbol}, using as-is")
    return symbol


def is_valid_symbol(symbol: str) -> bool:
    """
    Check if a symbol is valid by attempting to fetch basic info
    
    Args:
        symbol: Stock symbol to validate
    
    Returns:
        True if symbol is valid, False otherwise
    """
    try:
        ticker = yf.Ticker(symbol)
        info = ticker.info
        
        # Check if we got meaningful data
        if info and info.get('regularMarketPrice'):
            return True
        
        # Try fetching history as fallback
        hist = ticker.history(period="5d")
        if not hist.empty:
            return True
        
        return False
    except Exception:
        return False


def get_exchange_info(symbol: str) -> dict:
    """
    Get exchange information for a symbol
    
    Args:
        symbol: Stock symbol
    
    Returns:
        Dictionary with exchange info
    """
    if '.' not in symbol:
        return {"exchange": "US", "suffix": None}
    
    base, suffix = symbol.rsplit('.', 1)
    
    exchange_map = {
        'NS': 'NSE (India)',
        'BO': 'BSE (India)',
        'L': 'London Stock Exchange',
        'T': 'Tokyo Stock Exchange',
        'TO': 'Toronto Stock Exchange',
        'V': 'TSX Venture Exchange',
        'AX': 'Australian Securities Exchange',
        'HK': 'Hong Kong Stock Exchange',
        'SI': 'Singapore Exchange'
    }
    
    return {
        "exchange": exchange_map.get(suffix, "Unknown"),
        "suffix": suffix,
        "base": base
    }
