# One Hour Beats YA

# First Time Setup

```sh
# step 1
docker-compose build
# frontend
docker-compose run --rm frontend npm i
# backend
docker-compose run --rm backend bash
> rails db:create
> rails db:migrate
> rails db:seed
> exit
```

# After a gem has been added to backend

```
docker-compose down
docker-compose build backend
docker-compose run --rm backend rails db:drop db:create db:migrate db:seed
docker-compose up
```

# after adding an npm package to frontend

```
docker-compose down
docker-compose build --no-cache frontend
docker-compose up
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

# Prod deploy instructions

```
docker-compose build

```

Icon Pack by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
