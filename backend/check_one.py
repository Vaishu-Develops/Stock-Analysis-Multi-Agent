import yfinance as yf
try:
    tick = yf.Ticker("RELIANCE.NS")
    print(f"Price: {tick.fast_info.last_price}")
except Exception as e:
    print(e)
