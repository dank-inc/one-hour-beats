# One Hour Beats

# First Time Setup

```sh
# step 1
docker-compose build
# frontend
docker-compose run --rm frontend npm i
# backend
docker-compose run --rm bash
> rails db:create
> rails db:migrate
> rails db:seed
> exit
```

## Other Instructions

### Run frontend locally (w/o Docker)

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
