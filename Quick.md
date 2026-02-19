  


cd d:\MultiAgent\frontend ; pnpm dev 

python -m uvicorn main:app --reload 

cd d:\MultiAgent\backend ; .\venv\Scripts\Activate.ps1  



docker run -d --name my-redis-container -p 6379:6379 -v redis-data:/data redis

docker start my-redis-container

docker stop my-redis-container

docker rm my-redis-


docker ps

docker exec -it my-redis-container redis-cli ping
