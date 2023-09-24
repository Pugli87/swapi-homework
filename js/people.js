
import { showGlobalLoading, hideGlobalLoading } from './app.js';

let currentPage = 1;
const pagination = {
  prev: document.getElementById("prev"),
  next: document.getElementById("next"),
  span: document.getElementById("page"),
}

function nextPage() {
  currentPage += 1;
  fetchPeople(currentPage);
  pagination.span.textContent = currentPage;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage -= 1;
    pagination.span.textContent = currentPage;
    fetchPeople(currentPage);
  }
}

pagination.prev.addEventListener("click", prevPage);
pagination.next.addEventListener("click", nextPage);

function fetchPeople(page) {

  function renderData(data) {
    // Renderiza los datos en la interfaz
    console.log(data);
    pagination.span.textContent = currentPage;
    elements.peopleList.innerHTML = "";
    
    data.results.forEach((people) => {
      const row = document.createElement("li");
      row.classList.add("people__item");
      
      const button = document.createElement("button");
      button.textContent = people.name;
      button.classList.add("people__btn");
      button.addEventListener("click", () => {
        
      elements.modal.style.display = "flex";
      elements.headerModal.textContent = people.name;
      elements.birth_year.textContent = people.birth_year;
      elements.eye_color.textContent = people.eye_color;
      elements.gender.textContent = people.gender;
      elements.hair_color.textContent = people.hair_color;
      elements.height.textContent = people.height + " Cm";
      const startIndex = people.homeworld.indexOf("planets/");
      const result = people.homeworld.substring(startIndex);
      elements.homeworld.textContent = result;
      elements.mass.textContent = people.mass;
      elements.skin.textContent = people.skin_color;

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
      elements.peopleList.appendChild(row);
    });
    
    hideGlobalLoading();
  }

  const elements = {
    peopleList: document.getElementById("peopleList"),
    modal : document.getElementById("myModal"),
    closeButton : document.getElementById("close"),
    apiUrl : `https://swapi/people/?page=${page}`,

/*---------------------------------------------------------------------------*/
/*---------------------------- DOM para el modal ----------------------------*/
/*---------------------------------------------------------------------------*/

    headerModal : document.getElementById("header"),
    birth_year : document.getElementById("birth_year"),
    eye_color : document.getElementById("eye_color"),
    gender : document.getElementById("gender"),
    hair_color : document.getElementById("hair_color"),
    height : document.getElementById("height"),
    homeworld : document.getElementById("homeworld"),
    mass : document.getElementById("mass"),
    skin : document.getElementById("skin"),
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
  const cacheKey = `swapi_people_page_${page}`;
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
        console.log(`Datos almacenados en caché local para la página ${page}`);
        renderData(data);
      })
      .catch((error) => {
          console.error("Error:", error);
      });
  }
}

fetchPeople(currentPage);
