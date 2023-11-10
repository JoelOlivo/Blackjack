// CREAR EL ARREGLO DE CARTAS

let baraja = [];
const tiposCartas = ['C', 'D', 'H', 'S'];
const cartasEspeciales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0, puntosComputador = 0;

// Referencias del HTML
const btnPedirCarta = document.querySelector('#btnPedirCarta');
const puntajePantalla = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas'); 
const divCartasComputador = document.querySelector('#computadora-cartas'); 
const btnDetener = document.querySelector("#btnDetener");
const btnNuevoJuego = document.querySelector("#btnNuevoJuego");

const crearBaraja = () => {

    for (let i = 2; i <= 10; i++) {
        for (const tipo of tiposCartas) {
            baraja.push(i + tipo);        
        }
    }

    for (const especial of cartasEspeciales) {
        for (const tipo of tiposCartas) {
            baraja.push(especial + tipo);        
        }
    }

    // console.log(baraja);
    baraja = _.shuffle(baraja);
    console.log('mi baraja:', baraja);

    return baraja;
}

crearBaraja();

const perdirCarta = () => {
    
    // Lo que yo hice
    // let miCarta;
    // let totalBaraja = baraja.length;
    // miCarta = baraja[totalBaraja - 1];
    
    // baraja.pop();
    // console.log(miCarta);
    // console.warn('Nueva baraja:', baraja);

    // return miCarta;

    // Como hizo el profe xd
    if (baraja.length === 0) {
        throw 'Se acabaron las cartas'; // 'trow' permite mostrar un error en consola y detener el programa
        // alert('¡Se acabaron tus cartas! :(');
    } 

    let miCarta = baraja.pop();
    // console.log(miCarta);
    // console.warn('Nueva baraja:', baraja);
    return miCarta;
    
}

// perdirCarta();

const valorCarta = (carta) => {
    
    // const valor = carta.substring(0, carta.length - 1);  // 'substring' retorna un string cortado en base a una posicion inicial y final
    // let puntos = 0;
    // console.log({valor});

    // if (isNaN(valor)) {  // 'isNaN' is not a number, retorna un true si no es un numero
    //     console.log('no es numero');
    //     puntos = (valor === 'A') ? 11 : 10;
    //     console.log(puntos);
    // } else {
    //     console.log('numero xd');
    //     puntos = valor * 1; // se multiplica para obtener un numero (no un string)
    //     console.log(puntos);
    // }

    const valor = carta.substring(0, carta.length - 1);
    // console.log({valor});

    puntos = (isNaN(valor)) ? puntos = (valor === 'A') ? 11 : 10 : puntos = valor * 1; 
    // console.log({puntos});
    return puntos;
}

// Turno de la Computadora
const turnoComputador = (puntajeJugador) => {
        
        do {
            const carta = perdirCarta();    
            puntosComputador = puntosComputador + valorCarta(carta);
            
            puntajePantalla[1].innerText = puntosComputador;  
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;  
            imgCarta.className = 'carta';
            divCartasComputador.append(imgCarta);
        
        } while ((puntajeJugador > puntosComputador) && (puntajeJugador <= 21));

        setTimeout(() => {
            if (puntosComputador === puntajeJugador) {
                alert('Nadie Gana');
            } else if (puntajeJugador > 21) {
                alert('Computadora Gana');
            } else if (puntosComputador > 21) {
                alert('Jugador gana');
            } else if (puntajeJugador <= 21) {
                if (puntajeJugador === puntosComputador) {
                    alert('Nadie Gana');
                } else if (puntosComputador > puntajeJugador && puntosComputador <= 21) {
                    alert('Computadora Gana');
                } else {
                    alert('Jugador gana');
                }
            }
        }, 10);
    
}


// valorCarta(perdirCarta());

// Eventos

btnPedirCarta.addEventListener('click', () => {

    const carta = perdirCarta();    
    puntosJugador = puntosJugador + valorCarta(carta);
    
    puntajePantalla[0].innerText = puntosJugador;  
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;  
    imgCarta.className = 'carta';
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        // console.warn('Perdiste :(');
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugador);
        // console.log('Computadora gana');
    } else if (puntosJugador === 21) {
        // console.warn('Llegaste a 21 :D');
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugador);
        // if (puntosComputador > puntosJugador) {
        //     console.log('Ganaste :D');
        // } 
    }
});

btnDetener.addEventListener('click', () => {
    btnPedirCarta.disabled = true;
    btnDetener.disabled = true;
    turnoComputador(puntosJugador);
    // if (puntosJugador > 21) {
    //     console.warn('Perdiste :(');
    //     btnPedirCarta.disabled = true;
    //     btnDetener.disabled = true;
    //     console.log('Computadora gana');
    // } else if (puntosJugador === 21) {
    //     console.warn('Llegaste a 21 :D');
    //     btnPedirCarta.disabled = true;
    //     btnDetener.disabled = true;
    //     if (puntosComputador > puntosJugador) {
    //         console.log('Ganaste :D');
    //     } else {
    //         console.log('nadie gana');
    //     }
    // } else {
    //     btnPedirCarta.disabled = true;
    //     btnDetener.disabled = true;
    //     if (puntosComputador < puntosJugador || puntosComputador > 21) {
    //         console.log('Ganaste :D');
    //     } else if (puntosComputador > puntosJugador && puntosComputador <= 21) {
    //         console.log('Computador gana');            
    //     } 
    //     else {
    //         console.log('nadie gana');
    //     }
    // }
});

btnNuevoJuego.addEventListener('click', () => {
    baraja = [];
    crearBaraja();
    puntosJugador = 0, puntosComputador = 0;
    btnPedirCarta.disabled = false;
    btnDetener.disabled = false;
    puntajePantalla[0].innerText = 0;  
    puntajePantalla[1].innerText = 0;  
    divCartasComputador.innerHTML = '';
    divCartasJugador.innerHTML = '';

    // let imgCarta = document.querySelectorAll('img');
    // for (const carta of imgCarta) {
    //     carta.remove();
    // }

    
});

