// PATRON MODULO
const miModulo = (() => {

    'use strict' // (consultar más), permite tener un código más limpio  

    // CREAR EL ARREGLO DE CARTAS
    let baraja = [];
    const tiposCartas = ['C', 'D', 'H', 'S'], cartasEspeciales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador = 0, puntosComputador = 0;
    let puntosJugadores = [];

    // Referencias del HTML
    const btnPedirCarta = document.querySelector('#btnPedirCarta');
    const puntajePantalla = document.querySelectorAll('small');
    // const divCartasJugador = document.querySelector('#jugador-cartas'); 
    // const divCartasComputador = document.querySelector('#computadora-cartas'); 
    const divCartasJugadores = document.querySelectorAll('.divCartas');
    const btnDetener = document.querySelector("#btnDetener");
    const btnNuevoJuego = document.querySelector("#btnNuevoJuego");

    const iniciarJuego = (numJugadores = 2) => {
        baraja = crearBaraja();
        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);            
        }

        puntajePantalla.forEach(element => element.innerText = 0);
        divCartasJugadores.forEach(element => element.innerText = '');

        btnPedirCarta.disabled = false;
        btnDetener.disabled = false;
   
        // let imgCarta = document.querySelectorAll('img');
        // for (const carta of imgCarta) {
        //     carta.remove();
        // }
    }

    const crearBaraja = () => {

        baraja = [];
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
        // baraja = _.shuffle(baraja);
        
        return _.shuffle(baraja);
    }

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
        } 

        // console.log(miCarta);
        // console.warn('Nueva baraja:', baraja);
        return baraja.pop();
    }

    const valorCarta = (carta) => {
        
        // const valor = carta.substring(0, carta.length - 1);  // 'substring' retorna un string cortado en base a una posicion inicial y final
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

        // console.log({puntos});
        return (isNaN(valor)) ? 
                    (valor === 'A') ? 11 : 10 
                    : valor * 1;
    }

    // Turno: 0 = primer jugador, último = computadora
    const acumularPuntos = (turno, carta) => {
        
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntajePantalla[turno].innerText = puntosJugadores[turno];  
        return puntosJugadores[turno];
    }

    const crearCarta = (turno, carta) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;  
        imgCarta.className = 'carta';
        divCartasJugadores[turno].append(imgCarta);
    }

    // Turno de la Computadora
    const turnoComputador = (puntajeJugador) => {
            
        let puntosComputador = 0;

        do {
            const carta = perdirCarta();    
            puntosComputador = acumularPuntos(puntosJugadores.length - 1, carta);
            crearCarta(puntosJugadores.length - 1, carta);
        
        } while ((puntajeJugador > puntosComputador) && (puntajeJugador <= 21));

        determinarGanador();

    }

    const determinarGanador = () => {

        const [puntajeJugador, puntosComputador] = puntosJugadores;
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
        }, 100);
    }

    // valorCarta(perdirCarta());

    // Eventos

    btnPedirCarta.addEventListener('click', () => {

        const carta = perdirCarta();   

        const puntosJugador = acumularPuntos(0, carta);
        crearCarta(0, carta);

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
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugadores[0]);
    });

    // btnNuevoJuego.addEventListener('click', () => {
    //     iniciarJuego(); 
    // });

    return {
        nuevoJuego: iniciarJuego
    };

})();


