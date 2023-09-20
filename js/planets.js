import { showGlobalLoading, hideGlobalLoading } from './app.js';
let currentPage = 1;
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const span = document.getElementById("page");

function nextPage() {
  currentPage++;
  fetchPlanets(currentPage);
  span.textContent = currentPage;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    span.textContent = currentPage;
    fetchPlanets(currentPage);
  }
}

prev.addEventListener("click", prevPage);

next.addEventListener("click", nextPage);

function fetchPlanets(page) {
  const planetsList = document.getElementById("planetsList");
  const modal = document.getElementById("myModal");
  const closeButton = document.getElementById("close");
  const apiUrl = `https://swapi.dev/api/planets/?page=${page}`;

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  showGlobalLoading();

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const planetsList = document.getElementById("planetsList");

      // Itera a través de las películas y agrega solo el título y el director a la tabla
      data.results.forEach((planet) => {
        const row = document.createElement("li");
        row.classList.add("planets__item");
        row.innerHTML = `
          <button type="button" class="planets__btn">${planet.name}</button>
        `;
        planetsList.appendChild(row);
      });
      hideGlobalLoading();                                           
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Llama a la función para obtener todas las películas
fetchPlanets( currentPage);