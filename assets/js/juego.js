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
    
    console.log(baraja);
    console.log(_.shuffle(baraja));

    return _.shuffle(baraja);
}

crearBaraja();