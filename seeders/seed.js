const { sequelize, Nodo, Conexion } = require("../models");

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    await Nodo.bulkCreate([
      {
        id: 1,
        label: "Magdiel.SC",
        group: "nucleo",
        value: 100,
        nivel: 10,
        descripcion: "Nodo central del ecosistema creativo: diseño UX/UI, desarrollo web, música, orfebrería, investigación visual y experimentación digital.",
        link: "https://www.linkedin.com/in/magdielsc",
        favicon: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=128"
      },
      {
        id: 2,
        label: "Fungiweb",
        group: "web",
        value: 90,
        nivel: 8,
        descripcion: "Proyecto de diseño y desarrollo web para pymes, landing pages, presencia digital, formularios, WhatsApp, SEO básico y analítica.",
        link: "https://fungiweb.cl",
        favicon: "https://www.google.com/s2/favicons?domain=fungiweb.cl&sz=128"
      },
      {
        id: 3,
        label: "Taller Demiurgo",
        group: "arte",
        value: 85,
        nivel: 8,
        descripcion: "Joyería de autor en plata 950. Proyecto artesanal que une fuego, metal, diseño e identidad visual.",
        link: "https://www.instagram.com/taller_demiurgo",
        favicon: "https://www.google.com/s2/favicons?domain=instagram.com&sz=128"
      },
      {
        id: 4,
        label: "Fuego y Plata",
        group: "sonido",
        value: 75,
        nivel: 7,
        descripcion: "Proyecto musical y audiovisual independiente vinculado a composición, experimentación sonora e identidad poética.",
        link: "https://www.youtube.com/@fuegoyplata",
        favicon: "https://www.google.com/s2/favicons?domain=youtube.com&sz=128"
      },
      {
        id: 5,
        label: "RS Construcciones",
        group: "marketing",
        value: 80,
        nivel: 7,
        descripcion: "Gestión de contenido, diseño gráfico, comunicación comercial, cotizaciones y presencia digital para constructora.",
        link: "https://rsconstrucciones.cl",
        favicon: "https://www.google.com/s2/favicons?domain=rsconstrucciones.cl&sz=128"
      },
      {
        id: 6,
        label: "UX/UI",
        group: "web",
        value: 82,
        nivel: 7,
        descripcion: "Diseño de interfaces, experiencia de usuario, arquitectura visual y construcción de productos digitales claros y funcionales.",
        link: "",
        favicon: ""
      },
      {
        id: 7,
        label: "Full Stack JavaScript",
        group: "experimento",
        value: 78,
        nivel: 6,
        descripcion: "Aprendizaje actual en Node.js, Express, Sequelize, PostgreSQL, HTML, CSS, JavaScript y desarrollo de aplicaciones web.",
        link: "",
        favicon: ""
      },
      {
        id: 8,
        label: "Portfolio Micelial",
        group: "experimento",
        value: 95,
        nivel: 9,
        descripcion: "Aplicación experimental en forma de red viva, donde los proyectos aparecen como nodos conectados por relaciones creativas.",
        link: "",
        favicon: ""
      },
      {
        id: 9,
        label: "Investigación visual",
        group: "academico",
        value: 88,
        nivel: 8,
        descripcion: "Línea de investigación sobre imagen, cuerpo, experiencia, archivo, museo, cine, memoria y cultura visual.",
        link: "",
        favicon: ""
      },
      {
        id: 10,
        label: "Curaduría contemporánea",
        group: "academico",
        value: 84,
        nivel: 7,
        descripcion: "Trabajo teórico y curatorial sobre museos, mediación, experiencia del visitante, cine, instituciones culturales y prácticas contemporáneas.",
        link: "",
        favicon: ""
      }
    ]);

    await Conexion.bulkCreate([
      { from: 1, to: 2, label: "desarrollo web" },
      { from: 1, to: 3, label: "orfebrería" },
      { from: 1, to: 4, label: "música" },
      { from: 1, to: 5, label: "media manager" },
      { from: 1, to: 6, label: "diseño" },
      { from: 1, to: 7, label: "formación técnica" },
      { from: 1, to: 8, label: "experimento digital" },
      { from: 1, to: 9, label: "investigación" },
      { from: 1, to: 10, label: "curaduría" },

      { from: 2, to: 6, label: "UX/UI + landing" },
      { from: 2, to: 7, label: "stack web" },
      { from: 2, to: 8, label: "portfolio/app" },

      { from: 3, to: 4, label: "fuego/plata" },
      { from: 3, to: 6, label: "identidad visual" },

      { from: 5, to: 2, label: "web comercial" },
      { from: 5, to: 6, label: "contenido visual" },

      { from: 9, to: 10, label: "museo/imagen" },
      { from: 10, to: 8, label: "curaduría digital" }
    ]);

    console.log("Base de datos sembrada correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("Error al sembrar datos:", error.message);
    process.exit(1);
  }
}

seed();