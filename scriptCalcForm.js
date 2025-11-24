//Obtiene los datos del formulario de calorias
document.getElementById("form-calorias").addEventListener("submit", function(e){
    e.preventDefault();

    //Asignamos los valores
    let sexo = document.getElementById("sexo").value;
    let edad = parseInt(document.getElementById("edad").value);
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);
    let actividad = parseFloat(document.getElementById("actividad").value);

    let BMR;
    //Calculo de variables, distinciones entre hombre o mujer
    if (sexo === "hombre") {
        BMR = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
    } else {
        BMR = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
    }

    //Calculo final
    let total = BMR * actividad;

    document.getElementById("total-kcal").textContent = total.toFixed(0);
});
