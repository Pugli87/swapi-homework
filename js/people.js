
import { showGlobalLoading, hideGlobalLoading } from './app.js';
let currentPage = 1;
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const span = document.getElementById("page");

function nextPage() {
  currentPage++;
  fetchPeople(currentPage);
  span.textContent = currentPage;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    span.textContent = currentPage;
    fetchPeople(currentPage);
  }
}

prev.addEventListener("click", prevPage);

next.addEventListener("click", nextPage);


function fetchPeople(page) {
  const peopleList = document.getElementById("peopleList");
  const modal = document.getElementById("myModal");
  const closeButton = document.getElementById("close");
  const apiUrl = `https://swapi.dev/api/people/?page=${page}`;
  const peopleName = document.getElementById("name");
  const birth_year = document.getElementById("birth_year");
  const eye_color = document.getElementById("eye_color");
  const gender = document.getElementById("gender");
  const hair_color = document.getElementById("hair_color");
  const height = document.getElementById("height");
  
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
      span.textContent = currentPage;
      peopleList.innerHTML = "";
      data.results.forEach((people) => {
        const row = document.createElement("li");
        row.classList.add("people__item");

        const button = document.createElement("button");
        button.textContent = people.name;
        button.classList.add("people__btn");
        button.addEventListener("click", () => {
          // Mostrar el modal
          modal.style.display = "block";

          peopleName.textContent = people.name;
          birth_year.textContent = people.birth_year;
          eye_color.textContent = people.eye_color;
          gender.textContent = people.gender;
          hair_color.textContent = people.hair_color;
          height.textContent = people.height;
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


fetchPeople(currentPage);
