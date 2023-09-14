/// URL de la API de Star Wars
const apiUrl = 'https://swapi.dev/api/';

// Función para obtener detalles de una película por su ID
async function fetchFilmDetails(filmId) {
  try {
    const response = await fetch(`${apiUrl}films/${filmId}/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching film details:', error);
    throw error;
  }
}

// ID de la película que deseas obtener (por ejemplo, el episodio IV)
const filmId = 1;

// Obtener el elemento HTML donde mostrar los detalles de la película
const filmTitleElement = document.getElementById('film-title');
const filmDirectorElement = document.getElementById('film-director');
const filmEpisodeElement = document.getElementById('film-episode');
const filmDescriptionElement = document.getElementById('film-description');

// Cargar los detalles de la película y actualizar el HTML
fetchFilmDetails(filmId)
  .then((data) => {
    filmTitleElement.textContent = data.title;
    filmDirectorElement.textContent = data.director;
    filmEpisodeElement.textContent = data.episode_id;
    filmDescriptionElement.textContent = data.opening_crawl;
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Obtener el elemento HTML <ul> donde mostrar la lista de personajes
const charactersListElement = document.getElementById('characters');

// Función para obtener la lista de personajes de una película
async function fetchCharactersList(filmId) {
  try {
    const filmDetails = await fetchFilmDetails(filmId); // Utiliza la función fetchFilmDetails que definiste anteriormente
    const charactersUrls = filmDetails.characters;

    // Mapear las URL de personajes a una lista de promesas para obtener los detalles de cada personaje
    const charactersPromises = charactersUrls.map((characterUrl) =>
      fetch(characterUrl).then((response) => response.json())
    );

    // Esperar a que se completen todas las promesas y obtener los detalles de los personajes
    const charactersData = await Promise.all(charactersPromises);

    return charactersData;
  } catch (error) {
    console.error('Error fetching characters list:', error);
    throw error;
  }
}

// Cargar la lista de personajes y agregarla al HTML
fetchCharactersList(filmId)
  .then((characters) => {
    charactersListElement.innerHTML = ''; // Limpia la lista existente, si la hubiera

    characters.forEach((character) => {
      const listItem = document.createElement('li');
      listItem.textContent = character.name;
      charactersListElement.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });


