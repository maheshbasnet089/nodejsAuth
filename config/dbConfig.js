module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "authentication", // DATABASE NAME
  dialect: "mysql", // Kun variation of sql use garney
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
