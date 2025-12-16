import yfinance as yf
import pandas as pd

def fetch_price_history(symbol: str, period: str = "1y") -> pd.DataFrame:
    """
    Fetches historical price data for a symbol.
    Returns a DataFrame with OHLCV data.
    """
    ticker = yf.Ticker(symbol)
    # auto_adjust=True gives us adjusted close as 'Close'
    df = ticker.history(period=period, auto_adjust=True)
    return df

def fetch_current_price(symbol: str) -> dict:
    """
    Fetches the latest price and basic info.
    """
    ticker = yf.Ticker(symbol)
    # fast_info is often faster/more reliable for current price than history
    try:
        info = ticker.fast_info
        return {
            "symbol": symbol,
            "latest_price": info.last_price,
            "prev_close": info.previous_close,
            "market_cap": info.market_cap,
            "fifty_two_week_high": info.year_high,
            "fifty_two_week_low": info.year_low,
        }
    except Exception as e:
        print(f"Error fetching fast_info for {symbol}: {e}")
        return {}
