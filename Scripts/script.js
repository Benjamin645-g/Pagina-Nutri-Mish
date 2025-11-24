//Comando simple que vuelve visible la pagina, para crear efecto desvanecido
window.addEventListener('load', () => {
    document.body.classList.add('visible');
});
//Toma toda la clase de .pulsa y la asigna a botones
const botones = document.querySelectorAll('.pulsa');

// para cada elemento de la clase aplica, asi redirigimos al pulsar
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        // Tomamos la URL del atributo data-link
        const link = boton.getAttribute('data-link');
        if (link) {
            window.location.href = link; // Nos dirigimos a la ubicacion
        }
    });
});