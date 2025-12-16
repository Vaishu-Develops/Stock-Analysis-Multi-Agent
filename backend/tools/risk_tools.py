import pandas as pd
import numpy as np

def compute_risk_metrics(df: pd.DataFrame, fundamentals: dict = None) -> dict:
    """
    Computes risk metrics from price history and fundamentals.
    """
    if df.empty:
        return {}
    
    # Calculate daily returns
    df['returns'] = df['Close'].pct_change()
    
    # Volatility (Annualized)
    vol_30d = df['returns'].tail(30).std() * np.sqrt(252)
    vol_1y = df['returns'].std() * np.sqrt(252)
    
    # Max Drawdown (1Y)
    rolling_max = df['Close'].cummax()
    drawdown = (df['Close'] - rolling_max) / rolling_max
    max_drawdown = drawdown.min()
    
    # Beta Proxy (vs self? No, we need a benchmark. 
    # For now, we'll just use volatility as a proxy or return None if no benchmark data)
    # Real implementation would fetch SPY data to compare.
    beta_proxy = 1.0 # Placeholder
    
    # Risk Level Rule
    risk_level = "Medium"
    if vol_1y > 0.4: risk_level = "High"
    if vol_1y < 0.15: risk_level = "Low"
    
    risk_factors = []
    if max_drawdown < -0.3:
        risk_factors.append(f"Significant drawdown of {max_drawdown:.1%} in last year")
    if vol_1y > 0.3:
        risk_factors.append("High volatility stock")
    debt_to_equity = fundamentals.get("debt_to_equity") if fundamentals else 0
    if debt_to_equity is not None and debt_to_equity > 200:
        risk_factors.append("High leverage (Debt/Equity > 200)")

    return {
        "volatility_30d": round(vol_30d, 4),
        "volatility_1y": round(vol_1y, 4),
        "beta_proxy": beta_proxy,
        "max_drawdown_1y": round(max_drawdown, 4),
        "risk_level": risk_level,
        "risk_factors": risk_factors
    }
