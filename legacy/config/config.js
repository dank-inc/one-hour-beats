module.exports = {
  development: {
    username: "postgres",
    password: "ohb",
    database: "one_hour_beats",
    host: "db",
    dialect: "postgres",
  },
  test: {
    username: "ohb",
    password: "ohb",
    database: "one_hour_beats_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: "ohb",
    database: "one_hour_beats",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
