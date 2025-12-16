import yfinance as yf

symbols = ["RELIANCE", "RELIANCE.NS", "TCS", "TCS.NS"]

for sym in symbols:
    print(f"--- Checking {sym} ---")
    ticker = yf.Ticker(sym)
    try:
        info = ticker.fast_info
        print(f"Last Price: {info.last_price}")
        print(f"Market Cap: {info.market_cap}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Also check history
    hist = ticker.history(period="1d")
    if hist.empty:
        print("History: Empty")
    else:
        print(f"History: Found {len(hist)} rows")
