// Función para hacer una solicitud a la API de Star Wars
function fetchData() {
  const apiUrl = 'https://swapi.dev/api/';
  
  // Realiza la solicitud a la API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Maneja los datos obtenidos
      const dataContainer = document.getElementById('dataContainer');
      dataContainer.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Asocia la función fetchData al botón Obtener Datos
const fetchDataBtn = document.getElementById('fetchDataBtn');
fetchDataBtn.addEventListener('click', fetchData);