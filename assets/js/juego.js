// CREAR EL ARREGLO DE CARTAS

let baraja = [];
const tiposCartas = ['C', 'D', 'H', 'S'];
const cartasEspeciales = ['A', 'J', 'Q', 'K'];

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
    console.log(`mi baraja: ${baraja}`);

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
    console.log(miCarta);
    console.warn('Nueva baraja:', baraja);
    return miCarta;
    
}

// perdirCarta();
    

