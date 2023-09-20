//import { showGlobalLoading, hideGlobalLoading } from './app.js';
/*let currentPage = 1;
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
*/
function fetchPlanets() {
  const planetsList = document.getElementById("planetsList");
  const modal = document.getElementById("myModal");
  const closeButton = document.getElementById("close");
  const apiUrl = "https://swapi.dev/api/planets/";

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  //showGlobalLoading();

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
      //hideGlobalLoading();                                           
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Llama a la función para obtener todas las películas
fetchPlanets();

/*
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

  const headerModal = document.getElementById("header");
  const birth_year = document.getElementById("birth_year");
  const eye_color = document.getElementById("eye_color");
  const gender = document.getElementById("gender");
  const hair_color = document.getElementById("hair_color");
  const height = document.getElementById("height");
  const homeworld = document.getElementById("homeworld");
  const mass = document.getElementById("mass");
  const skin = document.getElementById("skin");
  
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
      span.textContent = currentPage;
      planetsList.innerHTML = "";
      data.results.forEach((people) => {
        const row = document.createElement("li");
        row.classList.add("people__item");
        
        const button = document.createElement("button");
        button.textContent = people.name;
        button.classList.add("people__btn");
        button.addEventListener("click", () => {
          
        modal.style.display = "flex";
        
        headerModal.textContent = people.name;
        birth_year.textContent = people.birth_year;
        eye_color.textContent = people.eye_color;
        gender.textContent = people.gender;
        hair_color.textContent = people.hair_color;
        height.textContent = people.height + " Cm";
        const startIndex = people.homeworld.indexOf("planets/");
        const result = people.homeworld.substring(startIndex);
        homeworld.textContent = result;
        mass.textContent = people.mass;
        skin.textContent = people.skin_color;

        if (!people.species || people.species.length === 0) {
          console.log("Sin species");
        }else{
          const species = document.getElementById("species");
          species.innerHTML = "";
          
          people.species.map((specie) => {
            fetch(specie)
              .then(response => response.json())
              .then(speciesData => {
                const option = document.createElement("option");
                option.classList.add("modal__option");
                option.value = speciesData.name; 
                option.text = speciesData.name; 

                species.appendChild(option);
              })
              .catch(error => {
                console.error("Error al obtener datos de la especie:", error);
              });
            });
          }

          if (!people.starships || people.starships.length === 0) {
            console.log("Sin species");
          } else {
            const starships = document.getElementById("starships");
            starships.innerHTML = "";
            people.starships.map((starship) => {
              fetch(starship)
                .then(response => response.json())
                .then(starshipsData => {
                  const option = document.createElement("option");
                  option.classList.add("modal__option");
                  option.value = starshipsData.name; 
                  option.text = starshipsData.name; 
                  starships.appendChild(option);
                })
                .catch(error => {
                  console.error("Error al obtener datos de la vehicles:", error);
                });
            });
          }

          if (!people.vehicles || people.vehicles.length === 0) {
            console.log("Sin species");
          } else {
            const vehicles = document.getElementById("vehicles");
            vehicles.innerHTML = "";
            people.vehicles.map((vehicle) => {
              fetch(vehicle)
                .then(response => response.json())
                .then(vehiclesData => {
                  const option = document.createElement("option");
                  option.classList.add("modal__option");
                  option.value = vehiclesData.name; 
                  option.text = vehiclesData.name; 
                  vehicles.appendChild(option);
                })
                .catch(error => {
                  console.error("Error al obtener datos de la vehicles:", error);
                });
            });
          }

        });
        row.appendChild(button);
        peopleList.appendChild(row);
      });
      hideGlobalLoading();
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}


fetchPlanets(currentPage);
*/