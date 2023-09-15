// Función para mostrar el indicador de carga global
function showGlobalLoading() {
  const globalLoading = document.getElementById("globalLoading");
  globalLoading.style.display = "block";
}

// Función para ocultar el indicador de carga global
function hideGlobalLoading() {
  const globalLoading = document.getElementById("globalLoading");
  globalLoading.style.display = "none";
}

export { showGlobalLoading, hideGlobalLoading };