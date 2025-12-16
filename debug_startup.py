import sys
import os

# Add current dir to path
sys.path.append(os.getcwd())

print("Attempting to import backend.main...")
try:
    from backend.main import app
    print("Successfully imported backend.main")
except Exception as e:
    print(f"Error importing backend.main: {e}")
    import traceback
    traceback.print_exc()
