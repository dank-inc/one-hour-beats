FROM node:12

# install svelte deps
WORKDIR /usr/src/legacy
COPY . /usr/src/legacy

RUN npm install
RUN npm install -g sequelize-cli

CMD [ "npm", "run", "dev" ]

EXPOSE 3000