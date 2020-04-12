import faker from "faker";

export const generateId = () =>
  `${faker.internet.protocol()}-${faker.hacker.adjective()}-${faker.hacker.noun()}`;

export const generateInt = () => faker.random.number(10);
