import os
from autogen import AssistantAgent, UserProxyAgent
from dotenv import load_dotenv

load_dotenv()

config_list = [
    {
        "model": "gpt-4o",
        "api_key": os.environ.get("OPENROUTER_API_KEY", "sk-placeholder"),
        "base_url": os.environ.get("OPENAI_BASE_URL", "https://api.openai.com/v1"),
    }
]

agent = AssistantAgent(
    name="test_agent",
    llm_config={
        "config_list": config_list,
        "temperature": 0.2,
        "cache_seed": None,
    }
)

user_proxy = UserProxyAgent(
    name="user_proxy",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=0,
    code_execution_config=False,
)

try:
    print("Initiating chat...")
    user_proxy.initiate_chat(
        agent,
        message="Hello, this is a test.",
        summary_method="last_msg"
    )
    print("Chat completed successfully.")
except Exception as e:
    print(f"Caught error: {e}")
