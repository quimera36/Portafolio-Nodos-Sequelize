const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("portfolio_micelial", "postgres", "tenshijin", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false
});

module.exports = sequelize;
