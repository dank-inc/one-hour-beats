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

## docker-compose commands

```sh
docker-compose build [container name or none] # builds docker containers
docker-compose up [container name or none] # starts up the docker network, optionaly with a given container
docker-compose run --rm [container name] [command] # runs a given docker container with an explicit command
```

# Other Instructions

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
