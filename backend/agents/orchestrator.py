from typing import Any, Dict
from backend.utils.cache import Cache
from backend.tools import (
    market_data,
    technical_tools,
    fundamental_tools,
    risk_tools,
    peer_tools,
    company_profile_tools
)

class AnalysisOrchestrator:
    def __init__(self, report_writer_agent=None):
        self.cache = Cache()
        self.report_writer_agent = report_writer_agent

    def run_full_analysis(self, symbol: str) -> Dict[str, Any]:
        print(f"\n{'='*60}")
        print(f"🚀 Starting comprehensive analysis for {symbol.upper()}")
        print(f"{'='*60}\n")
        
        # 1. Profile
        print("📊 Computing profile...")
        profile = self._get_or_compute(symbol, "profile", lambda: company_profile_tools.get_company_profile(symbol))
        
        # 2. Market Data (Price History) - Not cached long term, or cached briefly
        # We don't cache the dataframe directly in redis usually, but for this demo we might just re-fetch
        # or cache the serialized json. Let's re-fetch for freshness.
        price_df = market_data.fetch_price_history(symbol)
        current_price = market_data.fetch_current_price(symbol)
        
        # Validate that we have data
        if price_df is None or price_df.empty:
            print(f"❌ ERROR: No price data available for {symbol}")
            print(f"{'='*60}\n")
            return {
                "symbol": symbol,
                "error": "No price data available",
                "message": f"Could not fetch price history for {symbol}. The symbol may be delisted, invalid, or not available on Yahoo Finance.",
                "profile": profile,
                "price_metrics": {},
                "technical": {},
                "fundamentals": {},
                "risk": {},
                "peers": {},
                "report_markdown": f"# Analysis Failed\n\nUnable to fetch price data for **{symbol}**. Please verify the symbol is correct.",
                "key_investment_points": []
            }
        
        # 3. Technicals
        print("📈 Computing technical...")
        technical = self._get_or_compute(
            symbol, "technical",
            lambda: technical_tools.compute_technicals(price_df)
        )
        
        # 4. Fundamentals
        print("💰 Computing fundamentals...")
        fundamentals = self._get_or_compute(symbol, "fundamentals", lambda: fundamental_tools.fetch_fundamentals(symbol))
        
        # 5. Risk
        print("⚠️ Computing risk...")
        risk = self._get_or_compute(
            symbol, "risk",
            lambda: risk_tools.compute_risk_metrics(price_df, fundamentals)
        )
        
        # 6. Peers
        print("👥 Computing peers...")
        peers = self._get_or_compute(symbol, "peers", lambda: peer_tools.compare_with_peers(symbol))
        
        # 7. LLM Report
        # We only call LLM if we have a writer agent
        report_markdown = ""
        key_points = []
        if self.report_writer_agent:
            print("📝 Generating report with LLM...")
            report_data = self.report_writer_agent.generate_report(
                symbol=symbol,
                profile=profile,
                technical=technical,
                fundamentals=fundamentals,
                risk=risk,
                peers=peers
            )
            report_markdown = report_data.get("report_markdown", "")
            key_points = report_data.get("key_investment_points", [])
        else:
            print("⚠️ LLM Agent not configured - skipping report generation")
            report_markdown = "LLM Agent not configured."
            key_points = []

        print(f"\n{'='*60}")
        print(f"✅ Analysis complete for {symbol.upper()}")
        print(f"{'='*60}\n")

        # Process price history for frontend chart
        price_history = []
        if not price_df.empty:
            # Resample to reduce data points if needed, but for 1y daily, ~250 points is fine.
            # Reset index to get Date column if it's the index
            df_reset = price_df.reset_index()
            for _, row in df_reset.iterrows():
                try:
                    price_history.append({
                        "date": row["Date"].strftime("%Y-%m-%d"),
                        "price": round(row["Close"], 2),
                        "volume": int(row["Volume"]) if "Volume" in row else 0
                    })
                except Exception as e:
                    continue

        result = {
            "symbol": symbol,
            "profile": profile,
            "price_metrics": {
                "current_price": current_price.get("latest_price", 0),
                "change": current_price.get("latest_price", 0) - current_price.get("prev_close", 0),
                "change_percent": ((current_price.get("latest_price", 0) - current_price.get("prev_close", 0)) / current_price.get("prev_close", 1)) * 100 if current_price.get("prev_close") else 0,
            },
            "price_history": price_history,
            "technical": technical,
            "fundamentals": fundamentals,
            "risk": risk,
            "peers": peers,
            "report_markdown": report_markdown,
            "key_investment_points": key_points,
        }
        
        # Cache full result? Maybe.
        self.cache.set_cached(symbol, "full_analysis", result, ttl_seconds=300)
        
        return result

    def _get_or_compute(self, symbol, key, compute_fn):
        cached = self.cache.get_cached(symbol, key)
        if cached:
            print(f"Cache hit for {key}")
            return cached
        print(f"Computing {key}...")
        data = compute_fn()
        self.cache.set_cached(symbol, key, data, ttl_seconds=3600) # Cache for 1 hour
        return data
