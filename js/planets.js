import { showGlobalLoading, hideGlobalLoading } from './app.js';

let currentPage = 1;
const pagination = {
  prev: document.getElementById("prev"),
  next: document.getElementById("next"),
  span: document.getElementById("page"),
}

function nextPage() {
  currentPage++;
  fetchPlanets(currentPage);
  pagination.span.textContent = currentPage;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    pagination.span.textContent = currentPage;
    fetchPlanets(currentPage);
  }
}

pagination.prev.addEventListener("click", prevPage);
pagination.next.addEventListener("click", nextPage);

function fetchPlanets(page) {
  const elements = {
    planetsList: document.getElementById("planetsList"),
    modal : document.getElementById("myModal"),
    closeButton : document.getElementById("close"),
    apiUrl : `https://swapi.dev/api/planets/?page=${page}`,

    headerModal : document.getElementById("header"),

    climate : document.getElementById("climate"),
    created : document.getElementById("created"),
    diameter : document.getElementById("diameter"),
    edited : document.getElementById("edited"),
    films : document.getElementById("films"),
    gravity : document.getElementById("gravity"),
    orbital : document.getElementById("orbital"),
    population : document.getElementById("population"),
    residents : document.getElementById("residents"),
    rotation : document.getElementById("rotation"),
    surfaceWater : document.getElementById("surfaceWater"),
    terrain : document.getElementById("terrain"),
  }
  
  elements.closeButton.addEventListener("click", () => {
    elements.modal.style.display = "none";
  });
  
  elements.modal.addEventListener("click", (e) => {// cierre de modal al dar click fuerA DE EL
    if (e.target === elements.modal) {
      elements.modal.style.display = "none";
    }
  });
  
  // Intenta obtener los datos de la caché local
  const cacheKey = `swapi_planets_page_${page}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
  // Si los datos están en caché, utiliza los datos en caché en lugar de hacer una solicitud a la API
    const data = JSON.parse(cachedData);
    console.log(`Datos obtenidos desde la caché local para la página ${page}`);
    renderData(data);
  } else {
  // Si los datos no están en caché, realiza una solicitud a la API

    showGlobalLoading();

  fetch(elements.apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Almacena los datos en caché local para su uso posterior
      localStorage.setItem(cacheKey, JSON.stringify(data));
      renderData(data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
  }
  function renderData(data){
          
    console.log(data);
    pagination.span.textContent = currentPage;
    elements.planetsList.innerHTML = "";
    
    data.results.forEach((planet) => {
      const row = document.createElement("li");
      row.classList.add("planets__item");
      
      const button = document.createElement("button");
      button.textContent = planet.name;
      button.classList.add("planets__btn");
      button.addEventListener("click", () => {
        
      elements.modal.style.display = "flex";
      elements.headerModal.textContent = planet.name;
      elements.climate.textContent = planet.climate;

      const createdIndex = planet.created.indexOf("T");
      const createdResult = planet.created.substring(0, createdIndex);
      elements.created.textContent = createdResult;

      elements.diameter.textContent = planet.diameter;
      const editedIndex = planet.edited.indexOf("T");
      const editedResult = planet.edited.substring(0, editedIndex);
      elements.edited.textContent = editedResult;

      elements.gravity.textContent = planet.gravity;
      elements.orbital.textContent = planet.orbital_period;
      elements.population.textContent = planet.population;
      elements.rotation.textContent = planet.rotation_period;
      elements.surfaceWater.textContent = planet.surface_water;
      elements.terrain.textContent = planet.terrain;

      if (!planet.residents || planet.residents.length === 0) {
        console.log("Sin residents");
      }else{
        residents.innerHTML = "";
        
        planet.residents.map((resident) => {
          fetch(resident)
            .then(response => response.json())
            .then(residentsData => {
              const option = document.createElement("option");
              option.classList.add("modal__option");
              option.value = residentsData.name; 
              option.text = residentsData.name; 

              residents.appendChild(option);
            })
            .catch(error => {
              console.error("Error al obtener datos de la especie:", error);
            });
          });
        }
      if (!planet.films || planet.films.length === 0) {
        console.log("Sin films");
      }else{
        films.innerHTML = "";
        
        planet.films.map((film) => {
          fetch(film)
            .then(response => response.json())
            .then(filmsData => {
              const option = document.createElement("option");
              option.classList.add("modal__option");
              option.value = filmsData.title; 
              option.text = filmsData.title; 

              films.appendChild(option);
            })
            .catch(error => {
              console.error("Error al obtener datos de la especie:", error);
            });
          });
        }

      });
      row.appendChild(button);
      elements.planetsList.appendChild(row);
    });
    hideGlobalLoading();
  }
}

fetchPlanets(currentPage);
