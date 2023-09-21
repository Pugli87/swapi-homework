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
    peopleList: document.getElementById("peopleList"),
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
  
  showGlobalLoading();

  fetch(elements.apiUrl)
    .then((response) => response.json())
    .then((data) => {
      
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
        elements.climate.textContent = people.climate;
        elements.created.textContent = people.created;
        elements.diameter.textContent = people.diameter;
        elements.edited.textContent = people.edited;

        elements.gravity.textContent = people.gravity;
        elements.orbital.textContent = people.orbital_period;
        elements.population.textContent = people.population;
        elements.rotation.textContent = people.rotation_period;
        elements.surfaceWater.textContent = people.surface_water;
        elements.terrain.textContent = people.terrain;

        if (!people.residents || people.residents.length === 0) {
          console.log("Sin residents");
        }else{
          residents.innerHTML = "";
          
          people.residents.map((resident) => {
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
        if (!people.films || people.films.length === 0) {
          console.log("Sin films");
        }else{
          films.innerHTML = "";
          
          people.films.map((film) => {
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
        elements.peopleList.appendChild(row);
      });
      hideGlobalLoading();
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}


fetchPlanets(currentPage);
