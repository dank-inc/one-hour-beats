ssh elijahlucian@onehourbeats.com cd one-hour-beats && docker-compose build --no-cache frontend && docker-compose -f prod-frontend-deploy.yml run --rm frontend npm run build