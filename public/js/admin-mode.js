/* =========================
   MODO ADMIN
========================= */

const modoAdmin =
  localStorage.getItem("modoAdmin") === "true";

let nodoSeleccionadoAdmin = null;
let conexionSeleccionadaAdmin = null;
let eventosAdminRegistrados = false;

/* =========================
   INICIO
========================= */

document.addEventListener("DOMContentLoaded", function () {
  if (!modoAdmin) {
    return;
  }

  esperarNetwork();
});

/* =========================
   ESPERAR RED
========================= */

function esperarNetwork() {
  let intentos = 0;

  const timer = setInterval(function () {
    const redDisponible =
      typeof network !== "undefined" && network;

    const nodosDisponibles =
      typeof nodes !== "undefined" && nodes;

    const conexionesDisponibles =
      typeof edges !== "undefined" && edges;

    if (
      redDisponible &&
      nodosDisponibles &&
      conexionesDisponibles
    ) {
      clearInterval(timer);
      console.log("Modo admin iniciado");
      activarModoAdmin();
    }

    intentos++;

    if (intentos > 100) {
      clearInterval(timer);
      console.error("No se pudo iniciar modo admin");
    }
  }, 200);
}

/* =========================
   ACTIVAR ADMIN
========================= */

function activarModoAdmin() {
  const btnAdmin =
    document.getElementById("btnAdmin");

  if (btnAdmin) {
    btnAdmin.style.display = "block";
    btnAdmin.addEventListener("click", nuevoNodo);
  }

  const btnConexion =
    document.getElementById("btnConexion");

  if (btnConexion) {
    btnConexion.style.display = "block";
    btnConexion.addEventListener("click", nuevaConexion);
  }

  activarEventosAdmin();
}

/* =========================
   EVENTOS
========================= */

function activarEventosAdmin() {
  if (eventosAdminRegistrados) {
    return;
  }

  eventosAdminRegistrados = true;

  network.on("click", function (params) {
    if (params.nodes.length > 0) {
      const idNodo = params.nodes[0];
      const nodo = nodes.get(idNodo);

      if (!nodo) {
        return;
      }

      nodoSeleccionadoAdmin = idNodo;
      conexionSeleccionadaAdmin = null;

      cargarNodoModal(nodo);
      mostrarPanelNodo();
      abrirModalAdmin();

      return;
    }

    if (params.edges.length > 0) {
      const idConexion = params.edges[0];
      const conexion = edges.get(idConexion);

      if (!conexion) {
        return;
      }

      conexionSeleccionadaAdmin = idConexion;
      nodoSeleccionadoAdmin = null;

      cargarConexionModal(conexion);
      mostrarPanelConexion();
      abrirModalAdmin();

      return;
    }
  });

  const cerrarModal =
    document.getElementById("cerrarModalAdmin");

  if (cerrarModal) {
    cerrarModal.addEventListener("click", cerrarModalAdmin);
  }

  const modalAdmin =
    document.getElementById("modalAdmin");

  if (modalAdmin) {
    modalAdmin.addEventListener("click", function (e) {
      if (e.target === modalAdmin) {
        cerrarModalAdmin();
      }
    });
  }

  const tabNodo =
    document.getElementById("tabNodo");

  if (tabNodo) {
    tabNodo.addEventListener("click", mostrarPanelNodo);
  }

  const tabConexion =
    document.getElementById("tabConexion");

  if (tabConexion) {
    tabConexion.addEventListener("click", function () {
      cargarSelectsConexion();
      mostrarPanelConexion();
    });
  }

  const formNodo =
    document.getElementById("formNodo");

  if (formNodo) {
    formNodo.addEventListener("submit", guardarNodo);
  }

  const formConexion =
    document.getElementById("formConexion");

  if (formConexion) {
    formConexion.addEventListener("submit", guardarConexion);
  }

  const btnEliminarNodo =
    document.getElementById("btnEliminarNodo");

  if (btnEliminarNodo) {
    btnEliminarNodo.addEventListener("click", eliminarNodo);
  }

  const btnEliminarConexion =
    document.getElementById("btnEliminarConexion");

  if (btnEliminarConexion) {
    btnEliminarConexion.addEventListener("click", eliminarConexion);
  }

  console.log("Eventos admin registrados");
}

/* =========================
   MODAL ÚNICO
========================= */

function abrirModalAdmin() {
  document
    .getElementById("modalAdmin")
    .classList.add("abierto");
}

function cerrarModalAdmin() {
  document
    .getElementById("modalAdmin")
    .classList.remove("abierto");
}

function mostrarPanelNodo() {
  const panelNodo = document.getElementById("panelNodo");
  const panelConexion = document.getElementById("panelConexion");
  const formNodo = document.getElementById("formNodo");

  panelNodo.style.display = "block";
  panelConexion.style.display = "none";

  formNodo.style.display = "flex";
  formNodo.style.flexDirection = "column";
  formNodo.style.height = "auto";
  formNodo.style.maxHeight = "none";
  formNodo.style.overflow = "visible";

  document.getElementById("tabNodo").classList.add("activo");
  document.getElementById("tabConexion").classList.remove("activo");
}

function mostrarPanelConexion() {
  document.getElementById("panelNodo").style.display = "none";
  document.getElementById("panelConexion").style.display = "block";
}

function mostrarPanelConexion() {
  document
    .getElementById("panelNodo")
    .style.display = "none";

  document
    .getElementById("panelConexion")
    .style.display = "block";
}

/* =========================
   NUEVO NODO
========================= */

function nuevoNodo() {
  nodoSeleccionadoAdmin = null;
  conexionSeleccionadaAdmin = null;

  document.getElementById("tituloFormulario").textContent =
    "Crear Nodo";

  document.getElementById("idNodo").value = "";
  document.getElementById("nombreNodo").value = "";
  document.getElementById("categoriaNodo").value = "web";
  document.getElementById("descripcionNodo").value = "";
  document.getElementById("linkNodo").value = "";
  document.getElementById("energiaNodo").value = 50;
  document.getElementById("nivelNodo").value = 1;

  mostrarCamposConexionNuevoNodo(true);
  cargarNodosDisponibles();

  mostrarPanelNodo();
  abrirModalAdmin();
}

/* =========================
   CARGAR NODO EXISTENTE
========================= */

function cargarNodoModal(nodo) {
  document.getElementById("tituloFormulario").textContent =
    "Editar Nodo";

  document.getElementById("idNodo").value =
    nodo.id;

  document.getElementById("nombreNodo").value =
    nodo.label || "";

  document.getElementById("categoriaNodo").value =
    nodo.group || "web";

  document.getElementById("descripcionNodo").value =
    nodo.descripcion || "";

  document.getElementById("linkNodo").value =
    nodo.link || "";

  document.getElementById("energiaNodo").value =
    nodo.value || 50;

  document.getElementById("nivelNodo").value =
    nodo.nivel || 1;

  mostrarCamposConexionNuevoNodo(false);

  renderizarConexionesDelNodo(nodo.id);
}

function mostrarCamposConexionNuevoNodo(mostrar) {
  const conexion =
    document.getElementById("conexionNodoNuevo");

  const relacion =
    document.getElementById("relacionNodoNuevo");

  if (conexion) {
    conexion.parentElement.style.display =
      mostrar ? "block" : "none";
  }

  if (relacion) {
    relacion.parentElement.style.display =
      mostrar ? "block" : "none";
  }
}

/* =========================
   GUARDAR NODO
========================= */

async function guardarNodo(evento) {
  evento.preventDefault();

  const id =
    document.getElementById("idNodo").value;

  const link =
    document.getElementById("linkNodo").value;

  const datos = {
    label: document.getElementById("nombreNodo").value,
    group: document.getElementById("categoriaNodo").value,
    descripcion: document.getElementById("descripcionNodo").value,
    link: link,
    value: Number(document.getElementById("energiaNodo").value),
    nivel: Number(document.getElementById("nivelNodo").value),
    favicon: obtenerFavicon(link),
    image: ""
  };

  const url =
    id ? `/api/nodos/${id}` : "/api/nodos";

  const method =
    id ? "PUT" : "POST";

  const respuesta =
    await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });

  if (!respuesta.ok) {
    alert("Error guardando nodo");
    return;
  }

  const nodoGuardado =
    await respuesta.json();

  if (!id) {
    await crearConexionesParaNodoNuevo(nodoGuardado.id);
  }

  location.reload();
}

async function crearConexionesParaNodoNuevo(idNodoNuevo) {
  const selectConexion =
    document.getElementById("conexionNodoNuevo");

  if (!selectConexion) {
    return;
  }

  const nodosSeleccionados =
    Array.from(selectConexion.selectedOptions)
      .map(function (option) {
        return Number(option.value);
      });

  const relacion =
    document.getElementById("relacionNodoNuevo").value;

  for (const idOrigen of nodosSeleccionados) {
    if (idOrigen === Number(idNodoNuevo)) {
      continue;
    }

    await fetch("/api/conexiones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: idOrigen,
        to: idNodoNuevo,
        label: relacion
      })
    });
  }
}

/* =========================
   ELIMINAR NODO
========================= */

async function eliminarNodo() {
  const id =
    document.getElementById("idNodo").value;

  if (!id) {
    return;
  }

  const confirmar =
    confirm("¿Eliminar este nodo? También se eliminarán sus conexiones.");

  if (!confirmar) {
    return;
  }

  const respuesta =
    await fetch(`/api/nodos/${id}`, {
      method: "DELETE"
    });

  if (!respuesta.ok) {
    alert("Error eliminando nodo");
    return;
  }

  location.reload();
}

/* =========================
   NUEVA CONEXIÓN
========================= */

function nuevaConexion() {
  nodoSeleccionadoAdmin = null;
  conexionSeleccionadaAdmin = null;

  document.getElementById("tituloConexion").textContent =
    "Crear conexión";

  const idConexion =
    document.getElementById("idConexion");

  if (idConexion) {
    idConexion.value = "";
  }

  cargarSelectsConexion();

  document.getElementById("conexionOrigen").selectedIndex = 0;
  document.getElementById("conexionDestino").selectedIndex = 1;
  document.getElementById("direccionConexion").value = "normal";
  document.getElementById("tipoRelacion").value = "desarrolla";

  mostrarPanelConexion();
  abrirModalAdmin();
}

/* =========================
   CARGAR CONEXIÓN EXISTENTE
========================= */

function cargarConexionModal(conexion) {
  document.getElementById("tituloConexion").textContent =
    "Editar conexión";

  cargarSelectsConexion();

  document.getElementById("idConexion").value =
    conexion.id;

  document.getElementById("conexionOrigen").value =
    conexion.from;

  document.getElementById("conexionDestino").value =
    conexion.to;

  document.getElementById("direccionConexion").value =
    "normal";

  document.getElementById("tipoRelacion").value =
    conexion.label || "desarrolla";
}

/* =========================
   SELECTS DE CONEXIÓN
========================= */

function cargarSelectsConexion() {
  const origen =
    document.getElementById("conexionOrigen");

  const destino =
    document.getElementById("conexionDestino");

  if (!origen || !destino) {
    return;
  }

  origen.innerHTML = "";
  destino.innerHTML = "";

  nodes.forEach(function (nodo) {
    const optionOrigen =
      document.createElement("option");

    optionOrigen.value = nodo.id;
    optionOrigen.textContent = nodo.label;

    const optionDestino =
      document.createElement("option");

    optionDestino.value = nodo.id;
    optionDestino.textContent = nodo.label;

    origen.appendChild(optionOrigen);
    destino.appendChild(optionDestino);
  });
}

function cargarNodosDisponibles() {
  const select =
    document.getElementById("conexionNodoNuevo");

  if (!select) {
    return;
  }

  select.innerHTML = "";

  nodes.forEach(function (nodo) {
    const option =
      document.createElement("option");

    option.value = nodo.id;
    option.textContent = nodo.label;

    select.appendChild(option);
  });
}

/* =========================
   GUARDAR CONEXIÓN
========================= */

async function guardarConexion(evento) {
  evento.preventDefault();

  const idConexion =
    document.getElementById("idConexion").value;

  const origen =
    Number(document.getElementById("conexionOrigen").value);

  const destino =
    Number(document.getElementById("conexionDestino").value);

  const direccion =
    document.getElementById("direccionConexion").value;

  const datos = {
    from: direccion === "normal" ? origen : destino,
    to: direccion === "normal" ? destino : origen,
    label: document.getElementById("tipoRelacion").value
  };

  if (datos.from === datos.to) {
    alert("Un nodo no puede conectarse consigo mismo.");
    return;
  }

  const url =
    idConexion
      ? `/api/conexiones/${idConexion}`
      : "/api/conexiones";

  const method =
    idConexion ? "PUT" : "POST";

  const respuesta =
    await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });

  if (!respuesta.ok) {
    alert("Error guardando conexión");
    return;
  }

  location.reload();
}

/* =========================
   ELIMINAR CONEXIÓN
========================= */

async function eliminarConexion() {
  const idConexion =
    document.getElementById("idConexion").value;

  if (!idConexion) {
    alert("Primero selecciona una conexión.");
    return;
  }

  const confirmar =
    confirm("¿Eliminar esta conexión?");

  if (!confirmar) {
    return;
  }

  const respuesta =
    await fetch(`/api/conexiones/${idConexion}`, {
      method: "DELETE"
    });

  if (!respuesta.ok) {
    alert("Error eliminando conexión");
    return;
  }

  location.reload();
}

/* =========================
   UTILIDADES
========================= */

function obtenerFavicon(link) {
  if (!link) {
    return "";
  }

  try {
    const url =
      new URL(link);

    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
  } catch {
    return "";
  }
}

/* =========================
  renderizar conexiones en el nodo
========================= */

function renderizarConexionesDelNodo(nodoId) {
  const contenedor = document.getElementById("listaConexionesNodo");

  const conexionesDelNodo = edges.get().filter(function (conexion) {
    return conexion.from === nodoId || conexion.to === nodoId;
  });

  if (conexionesDelNodo.length === 0) {
    contenedor.innerHTML = "<p>Este nodo no tiene conexiones.</p>";
    return;
  }

contenedor.innerHTML = conexionesDelNodo.map(function (conexion) {
  const nombreOrigen = nodes.get(conexion.from)?.label || conexion.from;
  const nombreDestino = nodes.get(conexion.to)?.label || conexion.to;

  return `
    <div class="item-conexion">
      <span>
        ${nombreOrigen} → ${nombreDestino}
        <small>${conexion.label || ""}</small>
      </span>

      <button type="button" onclick="eliminarConexionDirecta(${conexion.id})">
        Eliminar
      </button>
    </div>
  `;
}).join("");
}

async function eliminarConexionDirecta(idConexion) {

  const confirmar =
    confirm("¿Eliminar esta conexión?");

  if (!confirmar) {
    return;
  }

  const respuesta =
    await fetch(`/api/conexiones/${idConexion}`, {
      method: "DELETE"
    });

  if (!respuesta.ok) {
    alert("Error eliminando conexión");
    return;
  }

  location.reload();
}