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
    console.log({valor});

    puntos = (isNaN(valor)) ? puntos = (valor === 'A') ? 11 : 10 : puntos = valor * 1; 
    console.log({puntos});
    return puntos;


}

valorCarta(perdirCarta());

