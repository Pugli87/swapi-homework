
import { showGlobalLoading, hideGlobalLoading } from './app.js';

async function fetchFilms() {
  const filmsList = document.getElementById("filmsList");
  const modal = document.getElementById("myModal");
  const closeButton = document.getElementById("close");
  const apiUrl = "https://swapi.dev/api/films/";
  
  const headerModal = document.getElementById("header");
  const filmsDescription = document.getElementById("filmsDescription");
  const episode = document.getElementById("episode");
  const director = document.getElementById("director");
  const producer = document.getElementById("producer");
  const release = document.getElementById("release");
  //const characters = document.getElementById("characters");
  // const planets = document.getElementById("planets");
  // const starships = document.getElementById("starShips");
  // const vehicles = document.getElementById("vehicles");
  // const species = document.getElementById("species");
  const created = document.getElementById("created");
  const edited= document.getElementById("edited");

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
      filmsList.innerHTML = "";
      data.results.forEach((film) => {
        const row = document.createElement("li");
        row.classList.add("films__item");

        const button = document.createElement("button");
        button.textContent = film.title;
        button.classList.add("films__btn");
        button.addEventListener("click", () => {

        modal.style.display = "flex";

        headerModal.textContent = film.title;
        filmsDescription.textContent = film.opening_crawl;
        episode.textContent = film.episode_id;
        director.textContent = film.director;
        producer.textContent = film.producer;
        release.textContent = film.release_date;
        
        /*------------------- input de charaters -------------------*/
        if (!film.characters || film.characters.length === 0) {
          console.log("Sin character");
        }else{
          const characters = document.getElementById("characters");
          characters.innerHTML = "";
          
          film.characters.map((character) => {
            fetch(character)
              .then(response => response.json())
              .then(charactersData => {
                const option = document.createElement("option");
                option.classList.add("modal__option");
                option.value = charactersData.name; 
                option.text = charactersData.name; 

                characters.appendChild(option);
              })
              .catch(error => {
                console.error("Error al obtener datos de lo characters:", error);
              });
            });
          }

        /*------------------- input de planets -------------------*/
        if (!film.planets || film.planets.length === 0) {
          console.log("Sin planets");
        }else{
          const planets = document.getElementById("planets");
          planets.innerHTML = "";
          
          film.planets.map((planet) => {
            fetch(planet)
            .then(response => response.json())
            .then(planetsData => {
                console.log(planet);
                const option = document.createElement("option");
                option.classList.add("modal__option");
                option.value = planetsData.name; 
                option.text = planetsData.name; 

                planets.appendChild(option);
              })
              .catch(error => {
                console.error("Error al obtener datos de los planets:", error);
              });
            });
          }

        /*------------------- input de starships -------------------*/
        if (!film.starships || film.starships.length === 0) {
          console.log("Sin starship");
        }else{
          const starships = document.getElementById("starships");
          starships.innerHTML = "";
          
          film.starships.map((starship) => {
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
                console.error("Error al obtener datos de los starships:", error);
              });
            });
          }

        /*------------------- input de vehicles -------------------*/
        if (!film.vehicles || film.vehicles.length === 0) {
          console.log("Sin character");
        }else{
          const vehicles = document.getElementById("vehicles");
          vehicles.innerHTML = "";
          
          film.vehicles.map((vehicle) => {
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
                console.error("Error al obtener datos de los characters:", error);
              });
            });
          }

        /*------------------- input de species -------------------*/
        if (!film.species || film.species.length === 0) {
          console.log("Sin specie");
        }else{
          const species = document.getElementById("species");
          species.innerHTML = "";
          
          film.species.map((specie) => {
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
                console.error("Error al obtener datos de las species:", error);
              });
            });
          }
        created.textContent = film.created;
        edited.textContent = film.edited;
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

fetchFilms();

