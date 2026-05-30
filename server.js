const express = require("express");
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./models");

const redRoutes = require("./routes/red.routes");
const nodosRoutes = require("./routes/nodos.routes");
const conexionesRoutes = require("./routes/conexiones.routes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api", function(req, res) {
  res.json({ mensaje: "Backend micelial funcionando con Sequelize" });
});

app.use("/api", redRoutes);
app.use("/api", nodosRoutes);
app.use("/api", conexionesRoutes);

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, function() {
      console.log(`Servidor funcionando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
  }
}

iniciarServidor();
