# git pull && \
docker-compose -f prod-compose.yml down && \
docker-compose -f prod-compose.yml build && \
docker-compose -f prod-compose.yml run --rm backend rails db:migrate && \
docker-compose -f prod-compose.yml down && \
docker-compose -f prod-compose.yml up -d