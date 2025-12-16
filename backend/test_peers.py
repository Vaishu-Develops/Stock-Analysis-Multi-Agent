from backend.tools.peer_tools import get_peers

def test_peers():
    # Test specific map
    assert "TCS.NS" in get_peers("RELIANCE.NS")
    
    # Test generic fallback
    assert "RELIANCE.NS" in get_peers("SOMETHING.NS")
    
    # Test US fallback
    assert "AAPL" in get_peers("NVDA")
    
    print("All peer tests passed!")

if __name__ == "__main__":
    test_peers()
