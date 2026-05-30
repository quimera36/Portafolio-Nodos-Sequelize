let nodes;
let edges;
let network;

async function cargarDatosDesdeBackend() {
  const respuesta = await fetch("/api/red");

  if (!respuesta.ok) {
    throw new Error("No se pudo cargar /api/red");
  }

  return await respuesta.json();
}

function obtenerColorPorGrupo(grupo) {
  const colores = {
    nucleo: { background: "#E2E8CE", border: "#FF7F11" },
    web: { background: "#FF7F11", border: "#E2E8CE" },
    arte: { background: "#ACBFA4", border: "#FF7F11" },
    sonido: { background: "#ACBFA4", border: "#E2E8CE" },
    marketing: { background: "#E2E8CE", border: "#ACBFA4" },
    academico: { background: "#ACBFA4", border: "#E2E8CE" },
    experimento: { background: "#FF7F11", border: "#ACBFA4" },
    cliente: { background: "#E2E8CE", border: "#FF7F11" }
  };

  return colores[grupo] || colores.experimento;
}

function prepararNodosParaRed(nodosBackend) {
  return nodosBackend.map(function (nodo) {
    const colorBase = obtenerColorPorGrupo(nodo.group);

    return {
      id: nodo.id,
      label: nodo.label,
      value: nodo.value || 50,
      group: nodo.group,
      nivel: nodo.nivel,
      descripcion: nodo.descripcion,
      link: nodo.link,
      favicon: nodo.favicon,

      color: {
        background: colorBase.background,
        border: colorBase.border,
        highlight: {
          background: colorBase.background,
          border: colorBase.border
        },
        hover: {
          background: colorBase.background,
          border: colorBase.border
        }
      },

      font: {
        color: "#E2E8CE",
        face: "monospace",
        size: 16,
        strokeWidth: 3,
        strokeColor: "#262626"
      },

      shadow: {
        enabled: true,
        color: "#FF7F11",
        size: 10,
        x: 0,
        y: 0
      }
    };
  });
}

async function crearRed() {
  const container = document.getElementById("network");

  if (!container) {
    console.error("No existe el contenedor #network");
    return;
  }

  const dataBackend = await cargarDatosDesdeBackend();

  nodes = new vis.DataSet(prepararNodosParaRed(dataBackend.nodos));
  edges = new vis.DataSet(dataBackend.conexiones);

  const data = {
    nodes: nodes,
    edges: edges
  };

  const options = {
    nodes: {
      shape: "dot",
      size: 25,
      borderWidth: 2,
      margin: 12,
      chosen: false,
      scaling: {
        min: 18,
        max: 45
      }
    },

    edges: {
      color: {
        color: "#ACBFA4",
        highlight: "#ACBFA4",
        hover: "#ACBFA4"
      },
      width: 1.4,
      smooth: {
        type: "continuous"
      },
      font: {
        color: "#E2E8CE",
        face: "monospace",
        size: 11,
        strokeWidth: 3,
        strokeColor: "#262626"
      },
      chosen: false
    },

    physics: {
      enabled: true,
      barnesHut: {
        gravitationalConstant: -9000,
        springLength: 220,
        springConstant: 0.03
      },
      stabilization: {
        enabled: true,
        iterations: 250
      }
    },

    interaction: {
      hover: true,
      dragNodes: true,
      zoomView: true
    }
  };

  network = new vis.Network(container, data, options);

  setTimeout(function () {
    network.fit({
      animation: true
    });
  }, 800);

  network.on("click", function (params) {
    if (params.nodes.length > 0) {
      const nodo = nodes.get(params.nodes[0]);
      mostrarInfoNodo(nodo);
    }
  });

  console.log("Red creada");
  console.log(nodes.get());
  console.log(edges.get());
}

function mostrarInfoNodo(nodo) {
  const panelInfo = document.getElementById("info");

  panelInfo.innerHTML = `
    ${nodo.favicon ? `<img class="project-favicon" src="${nodo.favicon}" alt="Ícono de ${nodo.label}">` : ""}

    <h2>${nodo.label}</h2>

    <p><strong>Categoría:</strong> ${nodo.group}</p>
    <p><strong>Nivel:</strong> ${nodo.nivel}</p>
    <p><strong>Energía:</strong> ${nodo.value}%</p>

    <p>${nodo.descripcion || ""}</p>

    ${nodo.link ? `<a href="${nodo.link}" target="_blank">Ver proyecto</a>` : ""}
  `;
}