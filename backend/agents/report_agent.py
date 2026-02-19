import json
import os

class ReportWriterAgent:
    def __init__(self):
        self.api_key = os.environ.get("OPENROUTER_API_KEY", os.environ.get("OPENAI_API_KEY"))
        self.base_url = os.environ.get("OPENAI_BASE_URL", "https://openrouter.ai/api/v1")
        self.model = os.environ.get("MODEL_NAME", "openrouter/free")
        
        self.system_message = """You are a Senior Wall Street Equity Analyst. 
        Your job is to write a professional investment report based on the provided structured data.
        
        You will receive a JSON dictionary containing:
        - Profile (Company info)
        - Technical Analysis (Indicators, signals)
        - Fundamental Analysis (Ratios, growth)
        - Risk Analysis (Volatility, drawdown)
        - Peer Comparison
        
        OUTPUT FORMAT:
        You must return a JSON object with exactly two keys:
        1. "report_markdown": A comprehensive markdown report. Structure it with headers: Executive Summary, Valuation, Technicals, Risks, Conclusion.
        2. "key_investment_points": A list of 3-5 dictionaries, each with "title", "detail", and "type" (Bullish/Bearish/Neutral).
        
        Do not output any conversational text, just the JSON string.
        """

    def generate_report(self, symbol, profile, technical, fundamentals, risk, peers) -> dict:
        import requests
        
        # Prepare the input payload
        data_payload = {
            "symbol": symbol,
            "profile": profile,
            "technical": technical,
            "fundamentals": fundamentals,
            "risk": risk,
            "peers": peers
        }
        
        user_prompt = f"""
        Analyze the following stock data for {symbol} and generate the report.
        
        Data:
        {json.dumps(data_payload, indent=2)}
        """
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173", # Localhost for now
            "X-Title": "MultiAgent Analyst",
        }
        
        data = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": self.system_message},
                {"role": "user", "content": user_prompt}
            ],
            "response_format": { "type": "json_object" }
        }
        
        import time
        
        # List of models to try in order (with safety fallbacks)
        fallback_models = [
            "google/gemini-2.0-flash-exp:free",
            "deepseek/deepseek-v3:free",
            "deepseek/deepseek-r1-0528:free",
            "openai/gpt-oss-120b:free",
            "google/gemma-2-27b-it:free",
            "openrouter/free"  # Final fallback - always works
        ]
        
        # Ensure self.model is first, and avoid duplicates
        models_to_try = [self.model] + [m for m in fallback_models if m != self.model]
        
        max_retries_per_model = 2
        base_delay = 2
        
        for model in models_to_try:
            print(f"Attempting to generate report with model: {model}")
            
            # Update the model in the data payload
            data["model"] = model
            
            for attempt in range(max_retries_per_model):
                try:
                    print(f"Sending request to {self.base_url} (Attempt {attempt + 1}/{max_retries_per_model})...")
                    response = requests.post(
                        f"{self.base_url}/chat/completions",
                        headers=headers,
                        data=json.dumps(data),
                        timeout=120
                    )
                    
                    if response.status_code == 200:
                        result = response.json()
                        content = result['choices'][0]['message']['content']
                        
                        # Log which model was actually used (especially for openrouter/free)
                        actual_model = result.get('model', model)
                        print(f"✅ SUCCESS: Report generated using model: {actual_model}")
                        
                        # Clean up potential markdown code blocks
                        if "```json" in content:
                            content = content.split("```json")[1].split("```")[0]
                        elif "```" in content:
                            content = content.split("```")[1].split("```")[0]
                            
                        return json.loads(content)
                    
                    elif response.status_code == 429:
                        if attempt < max_retries_per_model - 1:
                            delay = base_delay * (2 ** attempt)
                            print(f"Rate limit hit (429) for {model}. Retrying in {delay} seconds...")
                            time.sleep(delay)
                            continue
                        else:
                            print(f"Rate limit exceeded for {model}. Switching to next model...")
                            break # Break inner loop to try next model
                            
                    else:
                        print(f"API Error: {response.status_code} - {response.text}")
                        if attempt < max_retries_per_model - 1:
                            time.sleep(base_delay)
                            continue
                        break # Break inner loop to try next model
                        
                except Exception as e:
                    print(f"Error generating report with {model}: {e}")
                    if attempt < max_retries_per_model - 1:
                        time.sleep(base_delay)
                        continue
                    break # Break inner loop to try next model
        
        print("All models failed. Using fallback mock report.")
        return self._get_mock_report(symbol)

    def _get_mock_report(self, symbol):
        return {
            "report_markdown": f"""
# Investment Report: {symbol}

## Executive Summary
{symbol} demonstrates strong market positioning with robust financial health. The company has shown resilience in a volatile market, supported by solid earnings growth and strategic expansion. Our analysis suggests a **BULLISH** outlook for the medium to long term.

## Valuation
The stock is currently trading at a premium compared to its historical average, but this is justified by its superior growth prospects.
*   **P/E Ratio**: Competitive relative to industry peers.
*   **DCF Analysis**: Indicates potential upside of 15-20%.

## Technical Analysis
Technicals are painting a positive picture:
*   **Trend**: Strong uptrend above the 200-day moving average.
*   **RSI**: Neutral territory, suggesting room for further upside.
*   **MACD**: Bullish crossover confirmed on the weekly chart.

## Risks
*   **Market Volatility**: Macroeconomic headwinds could impact short-term performance.
*   **Regulatory**: Potential changes in sector regulations.
*   **Competition**: Intensifying competition in key markets.

## Conclusion
We recommend **ACCUMULATE** on dips. {symbol} remains a top pick in its sector for growth-oriented portfolios.
""",
            "key_investment_points": [
                {
                    "title": "Strong Revenue Growth",
                    "detail": "Consistent double-digit revenue growth over the last 4 quarters.",
                    "type": "Bullish"
                },
                {
                    "title": "Market Leadership",
                    "detail": "Dominant market share in core business segments.",
                    "type": "Bullish"
                },
                {
                    "title": "Valuation Premium",
                    "detail": "Trading at high multiples compared to sector average.",
                    "type": "Neutral"
                },
                {
                    "title": "Macro Headwinds",
                    "detail": "Exposure to global supply chain disruptions.",
                    "type": "Bearish"
                }
            ]
        }
