docker-compose build 
docker-compose run --rm backend rails db:reset db:seed
docker-compose up