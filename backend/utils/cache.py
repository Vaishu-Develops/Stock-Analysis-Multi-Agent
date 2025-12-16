import redis
import json
import os
from typing import Optional, Any

class Cache:
    def __init__(self, host='localhost', port=6379, db=0):
        self.use_redis = False
        self.memory_cache = {}
        try:
            # In a real app, use env vars
            self.redis_client = redis.Redis(host=host, port=port, db=db, decode_responses=True)
            self.redis_client.ping() # Test connection
            self.use_redis = True
            print("Connected to Redis.")
        except redis.ConnectionError:
            print("Warning: Redis connection failed. Using in-memory cache.")
            self.use_redis = False

    def get_cached(self, symbol: str, key: str) -> Optional[dict]:
        full_key = f"{symbol}:{key}"
        if self.use_redis:
            try:
                data = self.redis_client.get(full_key)
                if data:
                    return json.loads(data)
                return None
            except redis.ConnectionError:
                print("Redis error, falling back to memory.")
                self.use_redis = False
        
        # Fallback to memory
        return self.memory_cache.get(full_key)

    def set_cached(self, symbol: str, key: str, data: Any, ttl_seconds: int = 600):
        full_key = f"{symbol}:{key}"
        if self.use_redis:
            try:
                self.redis_client.setex(full_key, ttl_seconds, json.dumps(data))
                return
            except redis.ConnectionError:
                pass
        
        # Fallback to memory
        self.memory_cache[full_key] = data
