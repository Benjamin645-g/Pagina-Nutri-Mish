//obtiene los datos de las calorias de las comidas
const botonAgregar = document.getElementById('agregar');
const inputComida = document.getElementById('comida');
const inputCalorias = document.getElementById('calorias');
const listaComidas = document.getElementById('lista-comidas');
const totalCalorias = document.getElementById('total');

let total = 0;

//Evento para que las comidas se vayan agrupando
botonAgregar.addEventListener('click', () => {
  const comida = inputComida.value.trim();
  const calorias = parseInt(inputCalorias.value);

  
  if(comida === "" || isNaN(calorias) || calorias <= 0) {
    alert("Por favor ingresa un alimento y una cantidad de calorías válida");
    return;
  }

  // Crear un elemento en la lista
  const li = document.createElement('li');
  li.textContent = `${comida}: ${calorias} kcal`;
  listaComidas.appendChild(li);

  // Sumar al total
  total += calorias;
  totalCalorias.textContent = total;

  // Limpiar inputs
  inputComida.value = '';
  inputCalorias.value = '';
});
const botones = document.querySelectorAll('.pulsa');

//Redireccionador a formulario
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        // Tomamos la URL del atributo data-link
        const link = boton.getAttribute('data-link');
        if (link) {
            window.location.href = link; // Navegamos a la URL
        }
    });
});

