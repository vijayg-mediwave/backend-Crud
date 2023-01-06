const Sequelize = require("sequelize");

const db = new Sequelize("student", "postgres", "postgres", {
  HOST: "localhost",
  PORT: "5432",
  dialect: "postgres",
});

const db = {};
db.Sequelize = Sequelize;
db.sequel = sequel;

const employeeData = db.sequel.define("employees", {
  eid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  eName: {
    type: Sequelize.STRING,
  },
});
module.exports = db;
