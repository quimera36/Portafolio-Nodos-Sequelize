const express = require("express");
const router = express.Router();
const { Nodo, Conexion } = require("../models");

router.get("/nodos", async function(req, res) {
  try {
    const nodos = await Nodo.findAll({ order: [["id", "ASC"]] });
    res.json(nodos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar nodos", error: error.message });
  }
});

router.post("/nodos", async function(req, res) {
  try {
    const nuevoNodo = await Nodo.create(req.body);
    res.status(201).json(nuevoNodo);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear nodo", error: error.message });
  }
});

router.put("/nodos/:id", async function(req, res) {
  try {
    const id = Number(req.params.id);
    const nodo = await Nodo.findByPk(id);

    if (!nodo) {
      return res.status(404).json({ mensaje: "Nodo no encontrado" });
    }

    await nodo.update(req.body);
    res.json(nodo);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al editar nodo", error: error.message });
  }
});

router.delete("/nodos/:id", async function(req, res) {
  try {
    const id = Number(req.params.id);
    const nodo = await Nodo.findByPk(id);

    if (!nodo) {
      return res.status(404).json({ mensaje: "Nodo no encontrado" });
    }

    await Conexion.destroy({ where: { from: id } });
    await Conexion.destroy({ where: { to: id } });
    await nodo.destroy();

    res.json({ mensaje: "Nodo eliminado", id });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar nodo", error: error.message });
  }
});

module.exports = router;
