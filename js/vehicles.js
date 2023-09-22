
import { showGlobalLoading, hideGlobalLoading } from './app.js';
let currentPage = 1;
const pagination = {
  prev: document.getElementById("prev"),
  next: document.getElementById("next"),
  span: document.getElementById("page"),
}

function nextPage() {
  currentPage += 1;
  fetchvehicles(currentPage);
  pagination.span.textContent = currentPage;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage -= 1;
    pagination.span.textContent = currentPage;
    fetchvehicles(currentPage);
  }
}

pagination.prev.addEventListener("click", prevPage);

pagination.next.addEventListener("click", nextPage);

function fetchvehicles(page) {
  const elements = {
    vehiclesList: document.getElementById("vehiclesList"),
    modal : document.getElementById("myModal"),
    closeButton : document.getElementById("close"),
    apiUrl : `https://swapi.dev/api/vehicles/?page=${page}`,

/*---------------------------------------------------------------------------*/
/*---------------------------- DOM para el modal ----------------------------*/
/*---------------------------------------------------------------------------*/


headerModal : document.getElementById("header"),
cargo_capacity : document.getElementById("cargo_capacity"),
consumables : document.getElementById("consumables"),
cost_in_credits : document.getElementById("cost_in_credits"),
created : document.getElementById("created"),
crew : document.getElementById("crew"),
edited : document.getElementById("edited"),
films : document.getElementById("films"),
length : document.getElementById("length"),
manufacturer : document.getElementById("manufacturer"),
max_atmosphering_speed : document.getElementById("max_atmosphering_speed"),
model : document.getElementById("model"),
passengers : document.getElementById("passengers"),
pilots : document.getElementById("pilots"),
vehicle_class : document.getElementById("vehicle_class"),
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
  elements.vehiclesList.innerHTML = "";
  
  data.results.forEach((vehicle) => {
    const row = document.createElement("li");
    row.classList.add("vehicles__item");
    
    const button = document.createElement("button");
    button.textContent = vehicle.name;
    button.classList.add("vehicles__btn");
    button.addEventListener("click", () => {
      
    elements.modal.style.display = "flex";
    elements.headerModal.textContent = vehicle.name;

    elements.cargo_capacity.textContent = vehicle.cargo_capacity;
    elements.consumables.textContent = vehicle.consumables;
    elements.cost_in_credits.textContent = vehicle.cost_in_credits;
    const createdIndex = vehicle.created.indexOf("T");
    const createdresult = vehicle.created.substring(0, createdIndex);
    elements.created.textContent = createdresult;
    elements.crew.textContent = vehicle.crew;
    const editedIndex = vehicle.edited.indexOf("T");
    const editedresult = vehicle.edited.substring(0, editedIndex);
    elements.edited.textContent = editedresult;
    elements.length.textContent = vehicle.length;
    elements.manufacturer.textContent = vehicle.manufacturer;
    elements.max_atmosphering_speed.textContent = vehicle.max_atmosphering_speed;
    elements.model.textContent = vehicle.model;
    elements.passengers.textContent = vehicle.passengers;
    elements.vehicle_class.textContent = vehicle.vehicle_class;

    if (!vehicle.films || vehicle.films.length === 0) {
      console.log("Sin films");
    }else{
      films.innerHTML = "";
      
      vehicle.films.map((film) => {
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

    if (!vehicle.pilots || vehicle.pilots.length === 0) {
      console.log("Sin pilots");
    }else{
      pilots.innerHTML = "";
      
      vehicle.pilots.map((pilot) => {
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
        }
      );
    }
  });
    row.appendChild(button);
    elements.vehiclesList.appendChild(row);
      });
      hideGlobalLoading();
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

fetchvehicles(currentPage);

