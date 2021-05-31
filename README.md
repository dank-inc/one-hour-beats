# One Hour Beats YA

# First Time Setup

```sh
# step 1
docker-compose build
# frontend
docker-compose run --rm frontend npm i
# backend
docker-compose run --rm backend bash
> bundle
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
docker-compose run --rm [container_name] [command] # runs a given docker container with an explicit command - commands like `bash` to get command line access to a container.
```

# Running it all

### Run entire docker dev environment

```sh
docker-compose down # murder any lingering containers
docker-compose up # spin up the dev environment
# navigate to http://localhost
```

### helpful commands

```sh
docker-compose run --rm backend rails c # runs the rails console
docker-compose logs -f [container_name] # shows logs for a specific container
```

### Run frontend locally (w/o Docker)

```sh
cd frontend
npm install
npm run start
```


Icon Pack by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
