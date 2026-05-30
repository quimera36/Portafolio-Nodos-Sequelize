const express = require("express");
const router = express.Router();
const { Nodo, Conexion } = require("../models");

router.get("/conexiones", async function(req, res) {
  try {
    const conexiones = await Conexion.findAll({ order: [["id", "ASC"]] });
    res.json(conexiones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar conexiones", error: error.message });
  }
});

router.post("/conexiones", async function(req, res) {
  try {
    const origen = await Nodo.findByPk(req.body.from);
    const destino = await Nodo.findByPk(req.body.to);

    if (!origen || !destino) {
      return res.status(400).json({ mensaje: "El nodo origen o destino no existe" });
    }

    if (Number(req.body.from) === Number(req.body.to)) {
      return res.status(400).json({ mensaje: "Un nodo no puede conectarse consigo mismo" });
    }

    const nuevaConexion = await Conexion.create(req.body);
    res.status(201).json(nuevaConexion);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear conexión", error: error.message });
  }
});

router.put("/conexiones/:id", async function(req, res) {
  try {
    const id = Number(req.params.id);
    const conexion = await Conexion.findByPk(id);

    if (!conexion) {
      return res.status(404).json({
        mensaje: "Conexión no encontrada"
      });
    }

    const origen = await Nodo.findByPk(req.body.from);
    const destino = await Nodo.findByPk(req.body.to);

    if (!origen || !destino) {
      return res.status(400).json({
        mensaje: "El nodo origen o destino no existe"
      });
    }

    if (Number(req.body.from) === Number(req.body.to)) {
      return res.status(400).json({
        mensaje: "Un nodo no puede conectarse consigo mismo"
      });
    }

    await conexion.update({
      from: req.body.from,
      to: req.body.to,
      label: req.body.label
    });

    res.json(conexion);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al editar conexión",
      error: error.message
    });
  }
});

router.delete("/conexiones/:id", async function(req, res) {
  try {
    const id = Number(req.params.id);
    const conexion = await Conexion.findByPk(id);

    if (!conexion) {
      return res.status(404).json({ mensaje: "Conexión no encontrada" });
    }

    await conexion.destroy();
    res.json({ mensaje: "Conexión eliminada", id });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar conexión", error: error.message });
  }
});

module.exports = router;
