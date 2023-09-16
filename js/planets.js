function fetchAllPlanets() {
  const apiUrl = "https://swapi.dev/api/planets/";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const planetsList = document.getElementById("planetsList");

      // Itera a través de las películas y agrega solo el título y el director a la tabla
      data.results.forEach((planet) => {
        const row = document.createElement("li");
        row.innerHTML = `
          <button type="button">${planet.name}</button>
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