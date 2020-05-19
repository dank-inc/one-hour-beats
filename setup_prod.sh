docker-compose -f prod-compose.yml build 
docker-compose -f prod-compose.yml run --rm backend rails db:reset db:seed
docker-compose -f prod-compose.yml up