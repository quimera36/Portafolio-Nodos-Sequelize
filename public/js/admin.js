let nodoSeleccionado = null;
let conexionSeleccionada = null;

const API_URL = "";

document.addEventListener("DOMContentLoaded", async function () {
  await crearRed();
  inicializarAdmin();
});

function inicializarAdmin() {
  activarClickAdmin();
  activarFormularioNodo();
  activarBotonNuevoNodo();
  activarCerrarModalNodo();
  activarEliminarNodo();
}

/* =========================
   CLICK EN NODO
========================= */

function activarClickAdmin() {
  network.on("click", function (params) {
  if (params.nodes.length > 0) {
    const idNodo = params.nodes[0];
    const nodo = nodes.get(idNodo);

    if (!nodo) {
      return;
    }

    nodoSeleccionadoAdmin = idNodo;

    cargarNodoModal(nodo);
    abrirModalNodo();

    return;
  }

  if (params.edges.length > 0) {
    const idConexion = params.edges[0];

    abrirModalConexion(idConexion);

    return;
  }
});
}

/* =========================
   MODAL NODO
========================= */

function abrirModalNodo() {
  document.getElementById("modalNodo").classList.add("abierto");
}

function cerrarModalNodo() {
  document.getElementById("modalNodo").classList.remove("abierto");
}

function activarCerrarModalNodo() {
  document
    .getElementById("cerrarModalNodo")
    .addEventListener("click", cerrarModalNodo);

  document
    .getElementById("modalNodo")
    .addEventListener("click", function (evento) {
      if (evento.target.id === "modalNodo") {
        cerrarModalNodo();
      }
    });
}

/* =========================
   NUEVO NODO
========================= */

function activarBotonNuevoNodo() {
  const btnNuevoNodo = document.getElementById("btnNuevoNodo");

  if (!btnNuevoNodo) return;

  btnNuevoNodo.addEventListener("click", function () {
    nodoSeleccionado = null;
    conexionSeleccionada = null;

    limpiarFormularioNodo();
    document.getElementById("tituloFormulario").textContent = "Crear nodo";

    abrirModalNodo();
  });
}

/* =========================
   INFO
========================= */

function mostrarInfoAdmin(nodo) {
  document.getElementById("info").innerHTML = `
    ${nodo.favicon ? `<img class="project-favicon" src="${nodo.favicon}" alt="Ícono de ${nodo.label}">` : ""}

    <h2>${nodo.label}</h2>

    <p><strong>ID:</strong> ${nodo.id}</p>
    <p><strong>Categoría:</strong> ${nodo.group}</p>
    <p><strong>Nivel:</strong> ${nodo.nivel}</p>
    <p><strong>Energía:</strong> ${nodo.value}%</p>

    <p>${nodo.descripcion || ""}</p>

    ${nodo.link ? `<a href="${nodo.link}" target="_blank">Ver proyecto</a>` : ""}
  `;
}

/* =========================
   FORMULARIO NODO
========================= */

function activarFormularioNodo() {
  const formNodo = document.getElementById("formNodo");

  formNodo.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const idNodo = document.getElementById("idNodo").value;

    if (idNodo) {
      await editarNodo(Number(idNodo));
    } else {
      await crearNodo();
    }

    cerrarModalNodo();
  });
}

function obtenerDatosFormularioNodo() {
  const link = document.getElementById("linkNodo").value;

  return {
    label: document.getElementById("nombreNodo").value,
    group: document.getElementById("categoriaNodo").value,
    descripcion: document.getElementById("descripcionNodo").value,
    link: link,
    value: Number(document.getElementById("energiaNodo").value),
    nivel: Number(document.getElementById("nivelNodo").value),
    favicon: obtenerFavicon(link)
  };
}

async function crearNodo() {
  const nuevoNodo = obtenerDatosFormularioNodo();

  const respuesta = await fetch(`${API_URL}/api/nodos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevoNodo)
  });

  if (!respuesta.ok) {
    alert("No se pudo crear el nodo.");
    return;
  }

  const nodoCreado = await respuesta.json();

  await recargarRedAdmin();

  nodoSeleccionado = nodoCreado.id;
  conexionSeleccionada = null;

  const nodo = nodes.get(nodoCreado.id);
  mostrarInfoAdmin(nodo);
}

async function editarNodo(id) {
  const nodoEditado = obtenerDatosFormularioNodo();

  const respuesta = await fetch(`${API_URL}/api/nodos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nodoEditado)
  });

  if (!respuesta.ok) {
    alert("No se pudo editar el nodo.");
    return;
  }

  const nodoActualizado = await respuesta.json();

  await recargarRedAdmin();

  nodoSeleccionado = id;
  conexionSeleccionada = null;

  const nodo = nodes.get(id) || nodoActualizado;
  mostrarInfoAdmin(nodo);
}

async function recargarRedAdmin() {
  const dataBackend = await cargarDatosDesdeBackend();

  nodes.clear();
  edges.clear();

  nodes.add(prepararNodosParaRed(dataBackend.nodos));
  edges.add(dataBackend.conexiones);

  setTimeout(function () {
    network.fit({
      animation: true
    });
  }, 300);
}

function cargarNodoEnFormulario(nodo) {
  document.getElementById("tituloFormulario").textContent = "Editar nodo";

  document.getElementById("idNodo").value = nodo.id;
  document.getElementById("nombreNodo").value = nodo.label || "";
  document.getElementById("categoriaNodo").value = nodo.group || "web";
  document.getElementById("descripcionNodo").value = nodo.descripcion || "";
  document.getElementById("linkNodo").value = nodo.link || "";
  document.getElementById("energiaNodo").value = nodo.value || 50;
  document.getElementById("nivelNodo").value = nodo.nivel || 1;
}

function limpiarFormularioNodo() {
  document.getElementById("idNodo").value = "";
  document.getElementById("formNodo").reset();

  document.getElementById("energiaNodo").value = 50;
  document.getElementById("nivelNodo").value = 1;
}

/* =========================
   ELIMINAR NODO
========================= */

function activarEliminarNodo() {
  const btnEliminarNodo = document.getElementById("btnEliminarNodo");

  if (!btnEliminarNodo) return;

  btnEliminarNodo.addEventListener("click", async function () {
    const idNodo = document.getElementById("idNodo").value;

    if (!idNodo) {
      alert("Primero selecciona un nodo.");
      return;
    }

    const confirmar = confirm(
      "¿Seguro que quieres eliminar este nodo? También se eliminarán sus conexiones."
    );

    if (!confirmar) return;

    const respuesta = await fetch(`${API_URL}/api/nodos/${idNodo}`, {
      method: "DELETE"
    });

    if (!respuesta.ok) {
      alert("No se pudo eliminar el nodo.");
      return;
    }

    await recargarRedAdmin();

    nodoSeleccionado = null;
    conexionSeleccionada = null;

    cerrarModalNodo();
    limpiarFormularioNodo();

    document.getElementById("info").innerHTML = `
      <h2>Nodo eliminado</h2>
      <p>El nodo y sus conexiones fueron eliminados.</p>
    `;
  });
}

/* =========================
   UTILIDAD FAVICON
========================= */

function obtenerFavicon(link) {
  if (!link) return "";

  try {
    const url = new URL(link);
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
  } catch (error) {
    return "";
  }
}