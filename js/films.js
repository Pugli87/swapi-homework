import { showGlobalLoading, hideGlobalLoading } from './app.js';

function fetchAllFilms() {
  const filmsList = document.getElementById("filmsList");
  const modal = document.getElementById("myModal");
  const movieDescription = document.getElementById("movieDescription");
  const closeButton = document.getElementById("close");
  const apiUrl = "https://swapi.dev/api/films/";

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  
  showGlobalLoading();

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((film) => {
        const row = document.createElement("li");
        row.classList.add("films__item");
        const button = document.createElement("button");
        
        button.textContent = film.title;
        button.classList.add("films__btn");
        button.addEventListener("click", () => {
            // Mostrar el modal
            modal.style.display = "block";

            // Mostrar la descripción de la película en el modal
            movieDescription.textContent = film.opening_crawl;
        });

        row.appendChild(button);
        filmsList.appendChild(row);
      });
      hideGlobalLoading();
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}


fetchAllFilms();
