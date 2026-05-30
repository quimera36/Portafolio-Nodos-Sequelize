const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Conexion = sequelize.define("Conexion", {
  from: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  to: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "relación"
  }
}, {
  tableName: "conexiones",
  timestamps: true
});

module.exports = Conexion;
