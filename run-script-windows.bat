echo "downloading packages"
npm install --prefix ./client/node_modules ./client
npm install --prefix ./server/node_modules ./server

echo "build docker images"
docker build -f client/Dockerfile . -t "client"
docker build -f server/Dockerfile . -t "server"

echo "start docker compose with: docker compose up"

