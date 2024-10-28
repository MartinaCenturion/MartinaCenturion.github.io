document.getElementById('search-button').addEventListener('click', function () {
    const query = document.getElementById('search-input').value;
    fetchImages(query);
});

document.getElementById('clear-button').addEventListener('click', function () {
    clearGallery();
});

function fetchImages(query) {
    const apiKey = 'rqWvzAnvIp2iVXUOc9WyiXwOfO7OvhNMpCKSZGySCQ7K2kW2tB9HkSLM'; 
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=10`;

    fetch(url, {
        headers: {
            Authorization: apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        displayImages(data.photos);
    })
    .catch(error => {
        console.error('Error al obtener imágenes:', error);
    });
}

function displayImages(photos) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';  

    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.style.cursor = 'pointer';

        // Al hacer clic en la imagen, redirige a la página de detalles con el ID de la imagen
        imgElement.addEventListener('click', function() {
            window.location.href = `detalle.html?id=${photo.id}`;
        });

        gallery.appendChild(imgElement);
    });
}

function clearGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';  
}

// Chatbox functionality
const chatBubble = document.getElementById('chat-bubble');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');

chatBubble.addEventListener('click', function() {
    chatBox.style.display = 'block';
});

closeChat.addEventListener('click', function() {
    chatBox.style.display = 'none';
});