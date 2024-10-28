// Obtiene los parámetros de la URL, específicamente el ID de la imagen
const params = new URLSearchParams(window.location.search);
const imageId = params.get('id');

// Función para obtener y mostrar los detalles de la imagen
function fetchImageDetails(imageId) {
    const apiKey = 'rqWvzAnvIp2iVXUOc9WyiXwOfO7OvhNMpCKSZGySCQ7K2kW2tB9HkSLM'; 
    const url = `https://api.pexels.com/v1/photos/${imageId}`;

    fetch(url, {
        headers: {
            Authorization: apiKey
        }
    })
    .then(response => response.json())
    .then(photo => {
        displayImageDetails(photo);
    })
    .catch(error => {
        console.error('Error al obtener los detalles de la imagen:', error);
    });
}

// Función para mostrar los detalles de la imagen en la página
function displayImageDetails(photo) {
    const imageDetailsDiv = document.getElementById('image-details');

    // Crear el contenedor de detalles
    const imageElement = document.createElement('img');
    imageElement.src = photo.src.large;
    imageElement.alt = photo.alt;
    imageElement.style.maxWidth = '100%';
    imageElement.style.borderRadius = '8px';

    const imageInfo = document.createElement('div');
    imageInfo.style.marginTop = '20px';

    // Título de la imagen
    const title = document.createElement('h2');
    title.innerText = 'Título: ' + (photo.alt || 'Sin título');
    
    // Fotógrafo
    const photographer = document.createElement('p');
    photographer.innerHTML = `<strong>Fotógrafo:</strong> ${photo.photographer}`;

    // URL del fotógrafo
    const photographerUrl = document.createElement('p');
    photographerUrl.innerHTML = `<strong>Enlace al fotógrafo:</strong> <a href="${photo.photographer_url}" target="_blank">${photo.photographer_url}</a>`;
    
    // Tamaño de la imagen
    const imageSize = document.createElement('p');
    imageSize.innerHTML = `<strong>Dimensiones:</strong> ${photo.width} x ${photo.height}`;

    // Fuente de la imagen
    const imageSource = document.createElement('p');
    imageSource.innerHTML = `<strong>Fuente:</strong> <a href="${photo.url}" target="_blank">Ver en Pexels</a>`;

    // Agregar todos los elementos al div
    imageInfo.appendChild(title);
    imageInfo.appendChild(photographer);
    imageInfo.appendChild(photographerUrl);
    imageInfo.appendChild(imageSize);
    imageInfo.appendChild(imageSource);

    // Insertar en el contenedor principal
    imageDetailsDiv.appendChild(imageElement);
    imageDetailsDiv.appendChild(imageInfo);
}

// Llamar a la función con el ID de la imagen
fetchImageDetails(imageId);
