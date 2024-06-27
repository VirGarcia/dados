// Número de Partidas Totales
var numeroPartidasTotales = 4;

// Variable para almacenar la partida actual
var partidaActual;

// Valores de los dados de Quimby
var dadoRojo = [3, 4, 5, 20, 21, 22];
var dadoAzul = [1, 2, 16, 17, 18, 19];
var dadoVerde = [10, 11, 12, 13, 14, 15];
var dadoNaranja = [6, 7, 8, 9, 23, 24];

// Los dados de los jugadores
var dadoOrdenador;
var dadoJugador;

// Los colores de los dados de los jugadores
var colorDadoOrdenador;
var colorDadoJugador;

// Ocultamos los botones lanzar dado y reiniciar partida
document.getElementById("btnReiniciarPartida").style.visibility = "hidden";
document.getElementById("btnLanzarDado").style.visibility = "hidden";

// Ocultamos la tabla de los dados
document.getElementById("tablaDados").style.visibility = "hidden";

// Clase Dado para obtener los valores de las tiradas
class Dado {
    // Le pasamos el array con los número de su dado
    constructor(listaNumerosDado) {
        this.numeroCaras = 6; //Los dados tienen 6 caras
        this.listaNumerosDado = listaNumerosDado;
    }

    tirarDado() {
        let caraDelDado = Math.floor(Math.random() * this.numeroCaras);
        let valorDado = this.listaNumerosDado[caraDelDado];
        return valorDado;
    }
}

// Clase Partida donde tenemos la información para poder jugarla
class Partida {

    constructor(arrayDadoJugador, arrayDadoOrdenador) {
        this.dadoJugador = new Dado(arrayDadoJugador);
        this.dadoOrdenador = new Dado(arrayDadoOrdenador);
        this.puntuacionOrdenador = 0;
        this.puntuacionJugador = 0;
        this.numeroPartidasJugadas = 0;
        this.partidaEmpezada = false;
        this.tiradaActualOrdenador = 0;
        this.tiradaActualJugador = 0;
    }

    jugarPartida() {
        // Si no estaba empezada la partida => se empieza
        if (!this.partidaEmpezada)
            this.partidaEmpezada = true;
        // Sumamos las puntuaciones e incrementamos el número de partidas jugadas
        this.tiradaActualOrdenador = this.dadoOrdenador.tirarDado();
        this.tiradaActualJugador = this.dadoJugador.tirarDado();
        this.puntuacionOrdenador += this.tiradaActualOrdenador;
        this.puntuacionJugador += this.tiradaActualJugador;
        this.numeroPartidasJugadas++;
    }

    esFinDePartida() {
        return this.numeroPartidasJugadas == numeroPartidasTotales;
    }

    getResultadoPartidaActual() {
        return "La suma de las tiradas del Ordenador es " + this.puntuacionOrdenador +
            " y la suma de las tiradas del Jugador es " + this.puntuacionJugador;
    }

    getGanador() {
        if (this.puntuacionJugador > this.puntuacionOrdenador)
            return "Ganador Jugador con " + this.puntuacionJugador + " puntos sobre los " + this.puntuacionOrdenador + " del Ordenador";
        else if (this.puntuacionJugador < this.puntuacionOrdenador)
            return "Ganador Ordenador con " + this.puntuacionJugador + " puntos sobre los " + this.puntuacionOrdenador + " del Jugador";
        else
            return "Empate entre Jugador con " + this.puntuacionJugador + " puntos y los " + this.puntuacionOrdenador + " del Ordenador";
    }
}

// Nos quedamos con el elemento donde escribir los mensajes de la partida
var mensajesPartida = document.getElementById("mensajesDelJuego");

// Asignamos el listener al botón empezar partida
document.getElementById("btnEmpezarPartida").addEventListener("click", function () {
    // Dado que escoge el ordenador
    var dado = Math.floor(Math.random() * 4);

    if (dado == 0) {
        colorDadoOrdenador = "ROJO";
        dadoOrdenador = dadoRojo;
    } else if (dado == 1) {
        colorDadoOrdenador = "AZUL";
        dadoOrdenador = dadoAzul;
    } else if (dado == 2) {
        colorDadoOrdenador = "VERDE";
        dadoOrdenador = dadoVerde;
    } else if (dado == 3) {
        colorDadoOrdenador = "NARANJA";
        dadoOrdenador = dadoNaranja;
    }

    mensajesPartida.textContent = "El ordenador elige el dado " + colorDadoOrdenador;
    // Ocultamos el botón tras iniciar la partida
    document.getElementById("btnEmpezarPartida").style.visibility = "hidden";
});

// Listener para el botón LanzarDado
document.getElementById("btnReiniciarPartida").addEventListener("click", function () {
    location.reload();
})

// Función que nos convierte a un color de CSS el texto del color
function getCSSColor(textoColor) {
    if (textoColor == "ROJO")
        return "red";
    else if (textoColor == "AZUL")
        return "blue";
    else if (textoColor == "VERDE")
        return "green";
    else if (textoColor == "NARANJA")
        return "orange";
    else
        return "black";
}

function escogerDadoJugador(color) {
    // Si no se empezó la partida => alert
    if (dadoOrdenador == null)
        alert("Debes empezar la partida antes de escoger el dado");
    else {
        colorDadoJugador = color
        // Asignamos el dado por su color
        if (color == "ROJO")
            dadoJugador = dadoRojo;
        else if (color == "AZUL")
            dadoJugador = dadoAzul;
        else if (color == "VERDE")
            dadoJugador = dadoVerde;
        else if (color == "NARANJA")
            dadoJugador = dadoNaranja;

        // Ocultamos la tabla de los dados
        document.getElementById("tablaBotonesDados").style.display = "none";
        mensajesPartida.textContent = mensajesPartida.textContent + " y jugador dado " + color;
        // Mostramos botón lanzar dado
        document.getElementById("btnLanzarDado").style.visibility = "visible";
        // Ocultamos el tapete para poder ver los dados en acción
        document.getElementById("tapete").style.display = "none";
        // Mostramos la tabla de los dados y los colores de los dados
        document.getElementById("tablaDados").style.visibility = "visible";
        document.getElementById("resultadoTiradaJugador").style.backgroundColor = getCSSColor(colorDadoJugador);
        document.getElementById("resultadoTiradaOrdenador").style.backgroundColor = getCSSColor(colorDadoOrdenador);
        // Creamos la partida en este momento
        partidaActual = new Partida(dadoJugador, dadoOrdenador);
    }
}

// Listener para el botón del dadoRojo
document.getElementsByTagName("button")[1].addEventListener("click", function () {
    escogerDadoJugador("ROJO");
})

// Listener para el botón del dadoAzul
document.getElementsByTagName("button")[2].addEventListener("click", function () {
    escogerDadoJugador("AZUL");
})

// Listener para el botón del dadoVerde
document.getElementsByTagName("button")[3].addEventListener("click", function () {
    escogerDadoJugador("VERDE");
})

// Listener para el botón del dadoNaranja
document.getElementsByTagName("button")[4].addEventListener("click", function () {
    escogerDadoJugador("NARANJA");
})

// Listener para el botón LanzarDado
document.getElementById("btnLanzarDado").addEventListener("click", function () {
    // Si no es fin de partida => jugamos la siguiente
    if (!partidaActual.esFinDePartida()) {
        partidaActual.jugarPartida();
        // Mostramos el resultado de la tirada actual
        document.getElementById("resultadoTiradaOrdenador").textContent = partidaActual.tiradaActualOrdenador;
        document.getElementById("resultadoTiradaJugador").textContent = partidaActual.tiradaActualJugador;
        // Mostramos cómo va la partida
        document.getElementById("mensajesPartida").textContent = partidaActual.getResultadoPartidaActual();
        // Cambiamos el texto de "Lanzar Dado" por "Terminar Partida" cuando cambia de estado
        if(partidaActual.esFinDePartida())
            document.getElementById("btnLanzarDado").textContent = "Terminar Partida";
    }
    // Si entramos aquí es fin de partida y hay que mostrar el resultado final
    else{
        document.getElementById("mensajesPartida").textContent = partidaActual.getGanador();
        document.getElementById("btnLanzarDado").style.visibility = "hidden";
        document.getElementById("btnReiniciarPartida").style.visibility = "visible";
    }
})