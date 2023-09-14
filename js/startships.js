// function fetchFilm() {
//   const apiUrl = 'https://swapi.dev/api/films';
  
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
function fetchAllFilms() {
  const apiUrl = "https://swapi.dev/api/films/";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const filmsList = document.getElementById("filmsList");

      // Itera a través de las películas y agrega solo el título y el director a la tabla
      data.results.forEach((film) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${film.title}</td>
                <td>${film.director}</td>
                <td>
                  <button type="button">...</button>
              </td>
            `;
        filmsList.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Llama a la función para obtener todas las películas
fetchAllFilms();