# One Hour Beats

## Frontend Instructions

### Run frontend locally

```sh
cd frontend
npm install
npm run start
```

## Legacy Setup

### setup the legacy app:

```sh
docker-compose build legacy
docker-compose run --rm legacy npm run db:init
```

### run the legacy app:

```sh
docker-compose run legacy
```
