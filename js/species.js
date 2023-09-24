
import { showGlobalLoading, hideGlobalLoading } from './app.js';

let currentPage = 1;
const pagination = {
  prev: document.getElementById("prev"),
  next: document.getElementById("next"),
  span: document.getElementById("page"),
}

function nextPage() {
  currentPage += 1;
  fetchspecies(currentPage);
  pagination.span.textContent = currentPage;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage -= 1;
    pagination.span.textContent = currentPage;
    fetchspecies(currentPage);
  }
}

pagination.prev.addEventListener("click", prevPage);

pagination.next.addEventListener("click", nextPage);

function fetchspecies(page) {
  const elements = {
    speciesList: document.getElementById("speciesList"),
    modal : document.getElementById("myModal"),
    closeButton : document.getElementById("close"),
    apiUrl : `https://swapi.dev/api/species/?page=${page}`,
/*---------------------------------------------------------------------------*/
/*---------------------------- DOM para el modal ----------------------------*/
/*---------------------------------------------------------------------------*/
    headerModal : document.getElementById("header"),
    average_height : document.getElementById("average_height"),
    average_lifespan : document.getElementById("average_lifespan"),
    classification : document.getElementById("classification"),
    created : document.getElementById("created"),
    designation : document.getElementById("designation"),
    edited : document.getElementById("edited"),
    eye_colors : document.getElementById("eye_colors"),
    films : document.getElementById("films"),
    hair_colors : document.getElementById("hair_colors"),
    homeworld : document.getElementById("homeworld"),
    language : document.getElementById("language"),
    skin_colors : document.getElementById("skin_colors"),
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
      
      console.log(data,);
      pagination.span.textContent = currentPage;
      elements.speciesList.innerHTML = "";
      
      data.results.forEach((specie) => {
        const row = document.createElement("li");
        row.classList.add("species__item");
        
        const button = document.createElement("button");
        button.textContent = specie.name;
        button.classList.add("species__btn");
        button.addEventListener("click", () => {
          
        elements.modal.style.display = "flex";
        elements.headerModal.textContent = specie.name;
        elements.average_height.textContent = specie.average_height+ " Cm";
        elements.average_lifespan.textContent = specie.average_lifespan;
        elements.classification.textContent = specie.classification;
        elements.hair_colors.textContent = specie.hair_colors;
        
        const createdIndex = specie.created.indexOf("T");
        const createdResult = specie.created.substring(0, createdIndex);
        elements.created.textContent = createdResult;
        
        elements.designation.textContent = specie.designation;
        const editedIndex = specie.edited.indexOf("T");
        const editedResult = specie.edited.substring(0, editedIndex);
        elements.edited.textContent = editedResult;
        
        elements.eye_colors.textContent = specie.eye_colors;
        const homeworldIndex = specie.homeworld.indexOf("planets/");
        const homeworldResult = specie.homeworld.substring(homeworldIndex);
        elements.homeworld.textContent = homeworldResult;
        elements.language.textContent = specie.language;
        elements.skin_colors.textContent = specie.skin_colors;

        if (!specie.films || specie.films.length === 0) {
          console.log("Sin films");
        }else{
          films.innerHTML = "";
          
          specie.films.map((film) => {
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

        if (!specie.people || specie.people.length === 0) {
          console.log("Sin species");
        }else{
          const people = document.getElementById("people");
          people.innerHTML = "";
          
          specie.people.map((item) => {
            fetch(item)
              .then(response => response.json())
              .then(peopleData => {
                const option = document.createElement("option");
                option.classList.add("modal__option");
                option.value = peopleData.name; 
                option.text = peopleData.name; 

                people.appendChild(option);
              })
              .catch(error => {
                console.error("Error al obtener datos de la especie:", error);
              });
            });
          }

        });
        row.appendChild(button);
        elements.speciesList.appendChild(row);
      });
      hideGlobalLoading();
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

fetchspecies(currentPage);
