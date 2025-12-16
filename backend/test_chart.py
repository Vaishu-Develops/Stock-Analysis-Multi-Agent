from backend.agents.orchestrator import AnalysisOrchestrator
import sys

def test_chart_data():
    try:
        o = AnalysisOrchestrator()
        # Use a reliable symbol
        symbol = "RELIANCE.NS"
        print(f"Running analysis for {symbol}...")
        res = o.run_full_analysis(symbol)
        
        if "price_history" not in res:
            print("FAILED: price_history key missing from result")
            sys.exit(1)
            
        history = res["price_history"]
        if not isinstance(history, list):
            print("FAILED: price_history is not a list")
            sys.exit(1)
            
        if len(history) == 0:
            print("WARNING: price_history is empty (might be market holiday or bad data)")
        else:
            print(f"SUCCESS: Got {len(history)} data points")
            first_point = history[0]
            print(f"Sample point: {first_point}")
            
            required_keys = ["date", "price"]
            for k in required_keys:
                if k not in first_point:
                    print(f"FAILED: Missing key {k} in data point")
                    sys.exit(1)
                    
    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(1)

if __name__ == "__main__":
    test_chart_data()
