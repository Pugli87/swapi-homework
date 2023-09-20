
export async function fetchData(query, page) {
  const apiUrl = `https://swapi.dev/api/${query}/?page=${page}`;
  

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
