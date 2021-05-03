echo "downloading packages"
cd client
npm install 

cd ../server
npm install 
cd ..

echo "build docker images"
docker build -f client/Dockerfile . -t "client"
docker build -f server/Dockerfile . -t "server"

echo "start docker compose with: docker compose up"

