import pandas as pd
from ta.momentum import RSIIndicator
from ta.trend import MACD, SMAIndicator
from ta.volatility import BollingerBands

def compute_technicals(df: pd.DataFrame) -> dict:
    """
    Computes technical indicators from a DataFrame containing 'Close'.
    """
    if df.empty:
        return {}

    close = df['Close']

    # RSI
    rsi_indicator = RSIIndicator(close=close, window=14)
    rsi = rsi_indicator.rsi().iloc[-1]

    # MACD
    macd_indicator = MACD(close=close)
    macd_line = macd_indicator.macd().iloc[-1]
    macd_signal = macd_indicator.macd_signal().iloc[-1]
    macd_hist = macd_indicator.macd_diff().iloc[-1]

    # SMA
    sma_20 = SMAIndicator(close=close, window=20).sma_indicator().iloc[-1]
    sma_50 = SMAIndicator(close=close, window=50).sma_indicator().iloc[-1]
    sma_200 = SMAIndicator(close=close, window=200).sma_indicator().iloc[-1]

    # Bollinger Bands
    bb_indicator = BollingerBands(close=close, window=20, window_dev=2)
    bb_upper = bb_indicator.bollinger_hband().iloc[-1]
    bb_lower = bb_indicator.bollinger_lband().iloc[-1]
    bb_mid = bb_indicator.bollinger_mavg().iloc[-1]

    # Simple Trend Logic
    current_price = close.iloc[-1]
    if current_price > sma_50 and sma_50 > sma_200:
        trend = "Uptrend"
    elif current_price < sma_50 and sma_50 < sma_200:
        trend = "Downtrend"
    else:
        trend = "Sideways/Neutral"

    # Simple Signal Logic
    signals = []
    if rsi > 70:
        signals.append("Overbought")
    elif rsi < 30:
        signals.append("Oversold")
    
    if macd_hist > 0 and macd_hist > macd_line * 0.1: # Growing bullish momentum
        signals.append("Bullish Momentum")

    return {
        "rsi_14": round(rsi, 2),
        "macd_line": round(macd_line, 2),
        "macd_signal": round(macd_signal, 2),
        "macd_hist": round(macd_hist, 2),
        "sma_20": round(sma_20, 2),
        "sma_50": round(sma_50, 2),
        "sma_200": round(sma_200, 2),
        "bollinger_upper": round(bb_upper, 2),
        "bollinger_lower": round(bb_lower, 2),
        "bollinger_middle": round(bb_mid, 2),
        "trend_summary": trend,
        "signal_summary": ", ".join(signals) if signals else "Neutral"
    }
