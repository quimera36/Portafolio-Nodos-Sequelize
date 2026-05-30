const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Nodo = sequelize.define("Nodo", {
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  group: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "web"
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50
  },
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  favicon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "nodos",
  timestamps: true
});

module.exports = Nodo;
