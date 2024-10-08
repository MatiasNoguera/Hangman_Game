//Selectores
let canvas = document.getElementById('horca');
let pincel = canvas.getContext("2d");
let palabras = ["ORACLE", "ALURA", "PROYECTO", "CHALLENGE", "AHORCADO", "ONE", "LENGUAJES", "JAVASCRIPT", "HTML", "CSS", "MANZANA","GATO", "PROGRAMACIÓN", "PHYTON", "PERRO", "ANIMALES", "COLECTIVO", "MOTOCICLETA", "BICICLETA", "BANANA", "REACT", "ANGULAR", "TABLET", "WORDPRESS", "ELEFANTE", "COMPUTADORA", "MONTAÑA", "CHOCOLATE", "FRUTAS", "ESTRELLA", "MARIPOSAS", "GUITARRA", "BIBLIOTECA", "AVION", "DINOSAURIO", "SOMBRERO", "MARATON", "TORTUGA", "CABALLO", "PESCADO", "LUNA", "ARBOL", "TIGRE", "FANTASMA", "SOMBRA", "DRAGON", "TESORO", "UNIVERSO", "PLANETA", "JIRAFA", "CARACOL", "TELEFONO", "FUTBOL", "HELADO", "ROBOT", "KARATE", "HABITACION", "MONSTRUOS"];
let palabraAleatoria = "";
let cargareLetra;
let letras = [];
let errores = 8;
let aciertos = 0;
let letrasUsadas = [];
let estadoJuego = false;


function limpiarCanvas(){
    pincel.beginPath();
    pincel.clearRect(0,350,800,500);
    pincel.closePath();
}

function limpiarHorca(){
    pincel.beginPath();
    pincel.clearRect(262,70,200,240);
    pincel.closePath();
}

function iniciarJuego(){
    limpiarCanvas();
    limpiarHorca();
    estadoJuego = true;
    aciertos=0;
    errores=8;
    document.getElementById("horca").style.display = "flex";
    document.getElementById("teclado").style.display = "flex";
    document.getElementById("boton-desaparece").style.display = "none";
    document.getElementById("botones-iniciar-juego").style.display = "flex";
    document.getElementById("textoagregarpalabra").style.display = "none";
    document.getElementById("guardar").style.display = "none";
    document.getElementById("cancelar").style.display = "none";
    document.getElementById("signoexclamacion").style.display = "none";
    escogerPalabraSecreta();
    drawWordLines();
    dibujarAhorcado();
    letrasUsadas = [];

    document.onkeydown = (e) =>{         
        let letra = e.key.toUpperCase();
        
        if(aciertos < palabraAleatoria.length && errores != 0 && comprobarLetra(letra, e.keyCode) && estadoJuego == true){
            if(!letrasUsadas.includes(letra)){
                letrasUsadas.push(letra);

                if(palabraAleatoria.includes(letra)){
                    for(let i = 0; i < palabraAleatoria.length; i++){
                        if(palabraAleatoria[i] == letra){
                            dibujarLetraDeLaPalabra(i);
                            aciertos += 1;
                            if(aciertos == palabraAleatoria.length){
                                console.log("Ganaste!!");
                                Swal.fire("¡Felicitaciones, ganaste!");
                            }
                        }
                    }
                }else{
                    escribirLetraIncorrecta(letra);
                    dibujarLetrasIncorrectas(letra, errores); 
                    }     
                }    
        }    
    }
}

function agregarPalabra(){
    document.getElementById("cajaAgregaPalabra").style.display = "flex";
    document.getElementById("panelAgregaPalabra").style.display = "flex";
    document.getElementById("horca").style.display = "none";
    document.getElementById("boton-desaparece").style.display = "none";
    document.getElementById("textoagregarpalabra").style.display = "block";
    document.getElementById("guardar").style.display = "block";
    document.getElementById("cancelar").style.display = "block";
    document.getElementById("signoexclamacion").style.display = "none";
    document.getElementById("teclado").style.display = "none";
}

//Introduce dentro del arreglo la palabra escrita por el usuario
function guardarPalabra(){
    let palabrasAgregadas = document.getElementById("textoagregarpalabra").value.toUpperCase();
    palabras.push(palabrasAgregadas);
    document.getElementById("textoagregarpalabra").value = "";
    console.log(palabrasAgregadas);
    document.getElementById("cajaAgregaPalabra").style.display = "none";
    document.getElementById("panelAgregaPalabra").style.display = "none";
    document.getElementById("textoagregarpalabra").style.display = "flex";
    document.getElementById("horca").style.display = "flex";
    document.getElementById("botones-iniciar-juego").style.display = "flex";
    iniciarJuego();
}

function comprobarLetra(key,keyCode){
    let estado = false;
    if( keyCode >= 65 && keyCode <= 90){
        letras.push(key);
        console.log(key);
        estado = true;
        return estado;
    } else{
        console.log(key);
        return estado;
    }
} 

function cancelar(){
    document.getElementById("cajaAgregaPalabra").style.display = "none";
    document.getElementById("panelAgregaPalabra").style.display = "none";
    document.getElementById("horca").style.display = "none";
    document.getElementById("boton-desaparece").style.display = "flex";  
    document.getElementById("guardar").style.display = "none";
    document.getElementById("cancelar").style.display = "none";
    document.getElementById("signoexclamacion").style.display = "none";
}

function desistir(){
    document.getElementById("botones-iniciar-juego").style.display = "none"; 
    document.getElementById("boton-desaparece").style.display = "flex";
    document.getElementById("horca").style.display = "none";
    document.getElementById("teclado").style.display = "none";
    estadoJuego = false;
    limpiarCanvas();
    limpiarHorca();
}

function escogerPalabraSecreta(){
    let palabra = palabras[Math.floor(Math.random()*palabras.length)];
    palabraAleatoria = palabra;
    console.log(palabraAleatoria);
}

function drawWordLines(){
    pincel.beginPath();
    pincel.lineWidth   =   5;
    pincel.lineCap     =   "round";
    pincel.lineJoin    =   "round";
    pincel.fillStyle   =   "#0A3871";
    pincel.strokeStyle =   "#0A3871";
    
    let ancho = 600 / palabraAleatoria.length;
    for(let i = 0; i < palabraAleatoria.length; i++){
        pincel.moveTo(120 + (ancho*i), 450); 
        pincel.lineTo(180 + (ancho*i), 450); 
    }
    pincel.stroke();
    pincel.closePath();
}

function dibujarLetraDeLaPalabra(index){
    pincel.beginPath();
    pincel.font = 'bold 52px Arial';
    pincel.lineWidth = 6;
    pincel.lineCap   = "round";
    pincel.lineJoin  = "round";
    pincel.fillStyle = "#0A3871";

    let ancho = 600 / palabraAleatoria.length; 
    pincel.fillText(palabraAleatoria[index], 130 + (ancho*index), 430); 
    pincel.stroke();
}

function dibujarLetrasIncorrectas(letra, errorsLeft){
    pincel.beginPath();
    pincel.font = "bold 40px Arial";
    pincel.lineWidth = 6;
    pincel.lineCap   = "round";
    pincel.lineJoin  = "round";
    pincel.fillStyle = "#0A3871";
    pincel.fillText (letra, 10 +(40 *(8 - errorsLeft)), 500, 30);  
   
}
function escribirLetraIncorrecta(){
    errores -= 1;
    console.log (errores);
    dibujarAhorcado();
    if(errores==0){
        console.log("Perdiste!!");
        Swal.fire("Perdiste. La palabra era " + palabraAleatoria + " ¡Intentalo de nuevo!");
    }
}

if (canvas.getContext) {
    pincel.lineWidth = 4;

    //* linea baja horizontal
    pincel.beginPath();
    pincel.moveTo(130,350);
    pincel.lineTo(500,350);
    pincel.strokeStyle = "#0A3871";
    pincel.stroke();

    //* columna vertical
    pincel.beginPath();
    pincel.moveTo(260,350);
    pincel.lineTo(260,80);
    pincel.strokeStyle = "#0A3871";
    pincel.stroke();
}

//*Dibuja una parte del ahorcado segun los errores cometidos
function dibujarAhorcado(){
    if (canvas.getContext) {
        pincel.beginPath();
        pincel.lineWidth = 4;
        pincel.lineCap = "round";
        pincel.lineJoin = "round";
        pincel.fillStyle = "#0A3871";
        pincel.strokeStyle = "#0A3871";   
       
        if(errores == 7){
        pincel.moveTo(260,80);
        pincel.lineTo(360,80);
        
        }
        if(errores == 6){
        pincel.moveTo(360,80);
        pincel.lineTo(360,130);
        }
        if(errores == 5){
        pincel.arc(360, 155, 25, 0, 2 * Math.PI);
        }
        if(errores == 4){
        pincel.moveTo(360,180);
        pincel.lineTo(360,260);
        }
        if(errores == 3){
        pincel.moveTo(360,200);
        pincel.lineTo(390,230);
        }
        if(errores == 2){
        pincel.moveTo(360,200); 
        pincel.lineTo(330,230);
        }
        if(errores == 1){
        pincel.moveTo(360,260); 
        pincel.lineTo(390,300);
        }
        if(errores == 0){
        pincel.moveTo(360,260);
        pincel.lineTo(330,300);
        }
        pincel.stroke();
        pincel.closePath();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    crearTeclado();
});

function crearTeclado() {
    const letras1 = "ABCDEFGHIJKLM".split('');
    const letras2 = "NOPQRSTUVWXYZ".split('');

    const tecladoDiv = document.getElementById("teclado");

    // Crear la primera fila (A - M)
    let fila1 = document.createElement("div");
    fila1.classList.add("fila");
    letras1.forEach(letra => {
        let botonLetra = document.createElement("button");
        botonLetra.innerText = letra;
        botonLetra.classList.add("boton-letra");
        botonLetra.onclick = function() {
            manejarLetraClic(letra);
        };
        fila1.appendChild(botonLetra);
    });
    tecladoDiv.appendChild(fila1);

    // Crear la segunda fila (N - Z)
    let fila2 = document.createElement("div");
    fila2.classList.add("fila");
    letras2.forEach(letra => {
        let botonLetra = document.createElement("button");
        botonLetra.innerText = letra;
        botonLetra.classList.add("boton-letra");
        botonLetra.onclick = function() {
            manejarLetraClic(letra);
        };
        fila2.appendChild(botonLetra);
    });
    tecladoDiv.appendChild(fila2);
}

// Función que maneja la lógica de verificación de letras
function manejarEntradaLetra(letra) {
    if (aciertos < palabraAleatoria.length && errores != 0 && comprobarLetra(letra, letra.charCodeAt(0)) && estadoJuego == true) {
        if (!letrasUsadas.includes(letra)) {
            letrasUsadas.push(letra);

            if (palabraAleatoria.includes(letra)) {
                for (let i = 0; i < palabraAleatoria.length; i++) {
                    if (palabraAleatoria[i] == letra) {
                        dibujarLetraDeLaPalabra(i);
                        aciertos += 1;
                        if (aciertos == palabraAleatoria.length) {
                            console.log("¡Ganaste!");
                            Swal.fire("¡Felicitaciones, ganaste!");
                        }
                    }
                }
            } else {
                escribirLetraIncorrecta(letra);
                dibujarLetrasIncorrectas(letra, errores);
            }
        }
    }
}

// Evento para el teclado físico
document.onkeydown = (e) => {
    let letra = e.key.toUpperCase();
    manejarEntradaLetra(letra); // Usar la nueva función
};

// Función para el teclado virtual
function manejarLetraClic(letra) {
    manejarEntradaLetra(letra); // Usar la misma función que el teclado físico
}