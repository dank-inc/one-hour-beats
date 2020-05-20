# deploy frontend

docker-compose -f prod-frontend-build build
docker-compose -f prod-frontend-build run --rm npm run build

# deploy backend

docker-compose -f prod-compose.yml build 
docker-compose -f prod-compose.yml run --rm backend rails db:reset db:seed
docker-compose -f prod-compose.yml up