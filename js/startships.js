
import { showGlobalLoading, hideGlobalLoading } from './app.js';
let currentPage = 1;
const pagination = {
  prev: document.getElementById("prev"),
  next: document.getElementById("next"),
  span: document.getElementById("page"),
}

function nextPage() {
  currentPage += 1;
  fetchstarships(currentPage);
  pagination.span.textContent = currentPage;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage -= 1;
    pagination.span.textContent = currentPage;
    fetchstarships(currentPage);
  }
}

pagination.prev.addEventListener("click", prevPage);

pagination.next.addEventListener("click", nextPage);

function fetchstarships(page) {
  const elements = {
    starshipsList: document.getElementById("starshipsList"),
    modal : document.getElementById("myModal"),
    closeButton : document.getElementById("close"),
    apiUrl : `https://swapi.dev/api/starships/?page=${page}`,

/*---------------------------------------------------------------------------*/
/*---------------------------- DOM para el modal ----------------------------*/
/*---------------------------------------------------------------------------*/

    headerModal : document.getElementById("header"),
    MGLT : document.getElementById("MGLT"),
    cargo_capacity : document.getElementById("cargo_capacity"),
    consumables : document.getElementById("consumables"),
    cost_in_credits : document.getElementById("cost_in_credits"),
    created : document.getElementById("created"),
    crew : document.getElementById("crew"),
    edited : document.getElementById("edited"),
    films : document.getElementById("films"),
    hyperdrive_rating : document.getElementById("hyperdrive_rating"),
    length : document.getElementById("length"),
    manufacturer : document.getElementById("manufacturer"),
    max_atmosphering_speed : document.getElementById("max_atmosphering_speed"),
    model : document.getElementById("model"),
    passengers : document.getElementById("passengers"),
    pilots : document.getElementById("pilots"),
    starship_class : document.getElementById("starship_class"),
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
      
      console.log(data, currentPage);
      pagination.span.textContent = currentPage;
      elements.starshipsList.innerHTML = "";
      
      data.results.forEach((starship) => {
        const row = document.createElement("li");
        row.classList.add("starships__item");
        
        const button = document.createElement("button");
        button.textContent = starship.name;
        button.classList.add("starships__btn");
        button.addEventListener("click", () => {
          
        elements.modal.style.display = "flex";
        elements.headerModal.textContent = starship.name;

        elements.MGLT.textContent = starship.MGLT;
        elements.cargo_capacity.textContent = starship.cargo_capacity;
        elements.consumables.textContent = starship.consumables;
        elements.cost_in_credits.textContent = starship.cost_in_credits;
        const createdIndex = starship.created.indexOf("T");
        const createdresult = starship.created.substring(0, createdIndex);
        elements.created.textContent = createdresult;
        elements.crew.textContent = starship.crew;
        const editedIndex = starship.edited.indexOf("T");
        const editedresult = starship.edited.substring(0, editedIndex);
        elements.edited.textContent = editedresult;
        elements.length.textContent = starship.length;
        elements.manufacturer.textContent = starship.manufacturer;
        elements.hyperdrive_rating.textContent = starship.hyperdrive_rating;
        elements.max_atmosphering_speed.textContent = starship.max_atmosphering_speed;
        elements.model.textContent = starship.model;
        elements.passengers.textContent = starship.passengers;
        elements.starship_class.textContent = starship.starship_class;

        if (!starship.films || starship.films.length === 0) {
          console.log("Sin films");
        }else{
          films.innerHTML = "";
          
          starship.films.map((film) => {
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

        if (!starship.pilots || starship.pilots.length === 0) {
          console.log("Sin pilots");
        }else{
          pilots.innerHTML = "";
          
          starship.pilots.map((pilot) => {
            fetch(pilot)
              .then(response => response.json())
              .then(pilotsData => {
                const option = document.createElement("option");
                option.classList.add("modal__option");
                option.value = pilotsData.name; 
                option.text = pilotsData.name; 

                pilots.appendChild(option);
              })
              .catch(error => {
                console.error("Error al obtener datos de la especie:", error);
              });
            });
        }

        });
        row.appendChild(button);
        elements.starshipsList.appendChild(row);
      });
      hideGlobalLoading();
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}


fetchstarships(currentPage);

