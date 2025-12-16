import unittest
from unittest.mock import MagicMock, patch
import sys
import os

# Add backend to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from backend.agents.report_agent import ReportWriterAgent

class TestReportWriterAgentFallback(unittest.TestCase):
    @patch('time.sleep')
    @patch('requests.post')
    def test_fallback_logic(self, mock_post, mock_sleep):
        agent = ReportWriterAgent()
        
        # Mock responses
        # 1. First model (Gemini 2.0) fails with 429 twice
        # 2. Second model (Llama) fails with 429 twice
        # 3. Third model (Mistral) succeeds
        
        mock_response_429 = MagicMock()
        mock_response_429.status_code = 429
        
        mock_response_200 = MagicMock()
        mock_response_200.status_code = 200
        mock_response_200.json.return_value = {
            "choices": [
                {
                    "message": {
                        "content": '{"report_markdown": "Success", "key_investment_points": []}'
                    }
                }
            ]
        }
        
        # Side effect sequence: 
        # Model 1: 429, 429
        # Model 2: 429, 429
        # Model 3: 200
        mock_post.side_effect = [
            mock_response_429, mock_response_429, 
            mock_response_429, mock_response_429,
            mock_response_200
        ]
        
        # Run generation
        result = agent.generate_report(
            "TEST", {}, {}, {}, {}, {}
        )
        
        # Verify result
        self.assertEqual(result['report_markdown'], "Success")
        
        # Verify calls
        # Should have called requests.post 5 times
        self.assertEqual(mock_post.call_count, 5)
        
        # Verify models used in calls
        # We can inspect the 'data' arg passed to requests.post
        calls = mock_post.call_args_list
        
        import json
        
        # Call 1 & 2: Model 1 (Gemini 2.0)
        data1 = json.loads(calls[0].kwargs['data'])
        self.assertEqual(data1['model'], agent.model)
        
        # Call 3 & 4: Model 2 (Llama)
        data3 = json.loads(calls[2].kwargs['data'])
        self.assertEqual(data3['model'], "meta-llama/llama-3.2-3b-instruct:free")
        
        # Call 5: Model 3 (Mistral)
        data5 = json.loads(calls[4].kwargs['data'])
        self.assertEqual(data5['model'], "mistralai/mistral-7b-instruct:free")
        
        print("\nTest passed: Fallback logic verified successfully.")

if __name__ == '__main__':
    unittest.main()
