const express = require("express");
const router = express.Router();
const { Nodo, Conexion } = require("../models");

router.get("/red", async function(req, res) {
  try {
    const nodos = await Nodo.findAll({ order: [["id", "ASC"]] });
    const conexiones = await Conexion.findAll({ order: [["id", "ASC"]] });

    res.json({ nodos, conexiones });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la red", error: error.message });
  }
});

module.exports = router;
