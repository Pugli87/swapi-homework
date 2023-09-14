// function fetchFilm() {
//   const apiUrl = 'https://swapi.dev/api/planets';
  
//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data)
//       const elements = [
//         { label: 'Título', value: data.title },
//         { label: 'Episodio', value: data.episode_id },
//         { label: 'Director', value: data.director },
//         { label: 'Productor', value: data.producer },
//         { label: 'Fecha de lanzamiento', value: data.release_date },
//       ];

//       const detailsContainer = document.getElementById('dataContainer');
//       detailsContainer.innerHTML = ''; // Limpiar el contenedor existente
//       detailsContainer.appendChild(listElement);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }

// const fetchFilmDetailsBtn = document.getElementById('fetchFilmDetailsBtn');
// fetchFilmDetailsBtn.addEventListener('click', () => {
//   const filmId = 1; // Cambia esto al ID de la película que desees obtener
//   fetchFilmDetails(filmId);
// });

// Función para obtener la lista de todas las películas
function fetchAllPlanets() {
  const apiUrl = "https://swapi.dev/api/planets/";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const planetsList = document.getElementById("planetsList");

      // Itera a través de las películas y agrega solo el título y el director a la tabla
      data.results.forEach((planet) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${planet.name}</td>
                <td>${planet.diameter}</td>
                <td>
                  <button type="button">...</button>
              </td>
            `;
        planetsList.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Llama a la función para obtener todas las películas
fetchAllPlanets();