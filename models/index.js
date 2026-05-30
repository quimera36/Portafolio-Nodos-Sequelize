const sequelize = require("../config/database");
const Nodo = require("./Nodo");
const Conexion = require("./Conexion");

Nodo.hasMany(Conexion, {
  foreignKey: "from",
  as: "conexionesOrigen"
});

Nodo.hasMany(Conexion, {
  foreignKey: "to",
  as: "conexionesDestino"
});

Conexion.belongsTo(Nodo, {
  foreignKey: "from",
  as: "origen"
});

Conexion.belongsTo(Nodo, {
  foreignKey: "to",
  as: "destino"
});

module.exports = {
  sequelize,
  Nodo,
  Conexion
};
