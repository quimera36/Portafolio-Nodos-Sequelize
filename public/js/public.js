document.addEventListener("DOMContentLoaded", async function() {
  await crearRed();

  const panelInfo = document.getElementById("info");

  panelInfo.addEventListener("click", function(evento) {
    evento.stopPropagation();
    panelInfo.classList.toggle("expandida");
  });

  document.addEventListener("click", function(evento) {
    if (!panelInfo.contains(evento.target)) {
      panelInfo.classList.remove("expandida");
    }
  });
});