//Tomamos los datos del calendario
const mesSelect = document.getElementById("mes");
const anioSelect = document.getElementById("anio");
const cuerpoCalendario = document.querySelector("#calendario tbody");

const panelComidas = document.getElementById("panelComidas");
const tituloDia = document.getElementById("tituloDia");

const desayunoLista = document.getElementById("desayunoLista");
const almuerzoLista = document.getElementById("almuerzoLista");
const meriendaLista = document.getElementById("meriendaLista");
const cenaLista = document.getElementById("cenaLista");

const tooltip = document.getElementById("tooltip");

//Carga los datos de todas las comidas desde un espacio local,
//si no existe lo genera esperando actualizaciones
let comidas = JSON.parse(localStorage.getItem("comidas")) || {};
let diaSeleccionado = null;
let mesSeleccionado = null;
let anioSeleccionado = null;

//Carga los meses en los select
const meses = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

//Carga cada mes por años
meses.forEach((m, i) => {
    let op = document.createElement("option");
    op.value = i;
    op.textContent = m;
    mesSelect.appendChild(op);
});
//Crea todos los años desde 2025 a 2030
for (let a = 2025; a <= 2030; a++) {
    let op = document.createElement("option");
    op.value = a;
    op.textContent = a;
    anioSelect.appendChild(op);
}

// Generar calendarios con dias correctos
function generarCalendario(mes, anio) {
    cuerpoCalendario.innerHTML = "";
    const primerDia = new Date(anio, mes, 1).getDay();
    const ultimoDia = new Date(anio, mes + 1, 0).getDate();
    const ajuste = (primerDia === 0) ? 6 : primerDia - 1;

    let fila = document.createElement("tr");

    for (let i = 0; i < ajuste; i++) fila.appendChild(document.createElement("td"));

    for (let dia = 1; dia <= ultimoDia; dia++) {
        const celda = document.createElement("td");
        celda.textContent = dia;

        //Eventos que ocurren al pulsar un dia o pasar por encima del dia para previsualizar
        celda.addEventListener("click", () => seleccionarDia(dia, mes, anio));
        celda.addEventListener("mousemove", (e) => mostrarTooltip(e, dia, mes, anio));
        celda.addEventListener("mouseleave", ocultarTooltip);

        fila.appendChild(celda);

        if ((ajuste + dia) % 7 === 0) {
            cuerpoCalendario.appendChild(fila);
            fila = document.createElement("tr");
        }
    }
    if (fila.children.length > 0) cuerpoCalendario.appendChild(fila);
}

// Seleccionar un día despliega el menu del dia
function seleccionarDia(dia, mes, anio) {
    diaSeleccionado = dia;
    mesSeleccionado = mes;
    anioSeleccionado = anio;

    tituloDia.textContent = `Comidas del ${dia} de ${meses[mes]} ${anio}`;
    panelComidas.style.display = "block";

    // toma todos los elementos con la clase
    document.querySelectorAll("td").forEach(td => td.classList.remove("seleccionado"));
    event.target.classList.add("seleccionado");

    cargarComidas();
}

// Cargar comidas del dia seleccionado
function cargarComidas() {
    const clave = `${anioSeleccionado}-${mesSeleccionado + 1}-${diaSeleccionado}`;
    const datos = comidas[clave] || { desayuno: [], almuerzo: [], merienda: [], cena: [] };

    desayunoLista.innerHTML = renderItems(datos.desayuno, "desayuno");
    almuerzoLista.innerHTML = renderItems(datos.almuerzo, "almuerzo");
    meriendaLista.innerHTML = renderItems(datos.merienda, "merienda");
    cenaLista.innerHTML = renderItems(datos.cena, "cena");
}

// Vuelve a cargar las comidas con un boton para poder borrar 
function renderItems(array, tipo) {
    return array.map((item, index) => 
        //Creamos el bloque para que solo se cree el boton eliminar cuando hayan elementos
        `<div class='item-container'>
            <div class='item' contenteditable='true' onblur="editarItem('${tipo}', ${index}, this.innerText)">
                ${item}
            </div>
            <button class='borrar-btn' onclick="borrarItem('${tipo}', ${index})">❌</button>
        </div>`
    ).join("");
}

// Borrar comida exacta
function borrarItem(tipo, index) {
    const clave = `${anioSeleccionado}-${mesSeleccionado + 1}-${diaSeleccionado}`;
    if (!comidas[clave]) return;
    comidas[clave][tipo].splice(index, 1);
    guardarLocal();
    cargarComidas();
}


// Agregar comida nueva con menu
function agregar(tipo) {
    const comida = prompt("Ingresa la comida:");
    if (!comida) return;

    const clave = `${anioSeleccionado}-${mesSeleccionado + 1}-${diaSeleccionado}`;
    if (!comidas[clave]) comidas[clave] = { desayuno: [], almuerzo: [], merienda: [], cena: [] };

    comidas[clave][tipo].push(comida);
    guardarLocal();
    cargarComidas();
}

// Editar comida existente sin necesidad de un menu
function editarItem(tipo, index, valor) {
    const clave = `${anioSeleccionado}-${mesSeleccionado + 1}-${diaSeleccionado}`;
    if (!comidas[clave]) return;
    comidas[clave][tipo][index] = valor.trim();
    guardarLocal();
}

// Guardar en localStorage para que al no cerrar el buscador la pagina pueda mantener los datos
function guardarLocal() {
    localStorage.setItem("comidas", JSON.stringify(comidas));
}

// Tooltip para previsualizar comidas
function mostrarTooltip(e, dia, mes, anio) {
    const clave = `${anio}-${mes + 1}-${dia}`;
    const datos = comidas[clave];

    if (!datos) {
        tooltip.style.display = "none";
        return;
    }

    let texto = "";
    if (datos.desayuno?.length) texto += "Desayuno:\n" + datos.desayuno.join("\n") + "\n\n";
    if (datos.almuerzo?.length) texto += "Almuerzo:\n" + datos.almuerzo.join("\n") + "\n\n";
    if (datos.merienda?.length) texto += "Merienda:\n" + datos.merienda.join("\n") + "\n\n";
    if (datos.cena?.length) texto += "Cena:\n" + datos.cena.join("\n");

    if (texto.trim() === "") {
        tooltip.style.display = "none";
        return;
    }

    tooltip.textContent = texto.trim();
    tooltip.style.display = "block";
    tooltip.style.left = e.pageX + 15 + "px";
    tooltip.style.top = e.pageY + 15 + "px";
}
//ocultar el previsualizar 
function ocultarTooltip() {
    tooltip.style.display = "none";
}

// Inicializar los calculos de los años segun dia actual
const hoy = new Date();
mesSelect.value = hoy.getMonth();
anioSelect.value = hoy.getFullYear();
generarCalendario(hoy.getMonth(), hoy.getFullYear());

mesSelect.addEventListener("change", () => generarCalendario(+mesSelect.value, +anioSelect.value));
anioSelect.addEventListener("change", () => generarCalendario(+mesSelect.value, +anioSelect.value));
