//Funcion de calcular de la calculadora
function calcularIMC() {
    //tomamos el peso y la altura y guardamos
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value) / 100;

    //Mensaje en caso de no ingresar valores
    if (!peso || !altura) {
        alert("Por favor ingresa un peso y estatura válida");
    return;
    }
    // Mensaje en caso de que los valores sean desvordados
    const imc = (peso / (altura * altura)).toFixed(2);
    if (imc>60){
        alert("Los datos entregados no son realistas, escribe un valor correcto")
    return;

    }
    //Calculo estado
    let estado = "";
    if (imc < 18.5) estado = "Bajo peso";
    else if (imc < 25) estado = "Normal";
    else if (imc < 30) estado = "Sobrepeso";
    else if (imc < 60) estado = "Obesidad";
    

    document.getElementById("resultado").innerText =
        `Tu IMC es ${imc} (${estado}).`;
}