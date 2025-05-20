let productos = ["Gaseosa", "Chicle", "Chocolate", "Papas", "Caramelo"];
let stock = [0, 4, 5, 9, 10]; // Cantidades iniciales
const precio = 1;

// funcion para mostar el inventario de la maquina 

function mostrarInventario() {
  let mensaje = " Inventario actual:\n";
  for (let i = 0; i < productos.length; i++) {
    mensaje += `${i}. ${productos[i]} - ${stock[i]} disponibles\n`; //muestra la cantiddad de productos disponibles 
  }
  alert(mensaje);
}

//funcion que busca las diferentes alternativas para sugerir las alternativas 

function sugerirAlternativa() { 
  for (let i = 0; i < stock.length; i++) {  
    if (stock[i] >= 0) {
      return productos[i];
    }
  }
  return null;
}


// funcion para comprar un produrcto didponible 
  //si el cliente ingresa un dato que no es correcto 
function comprarProducto() {
  mostrarInventario();
  let codigo = parseInt(prompt("Ingresa el código del producto (0-4):"));
  if (codigo < 0 || codigo >= productos.length || isNaN(codigo)) { //el cliente ingresa un codigo que no es correcto 
    alert(" Código inválido.");
    return;
  }

  let pago = parseFloat(prompt(`Cada producto cuesta $${precio}. Inserta una moneda:`));
  if (pago != precio) {
    alert(" Pago incorrecto. Solo se aceptan monedas de $1.");
    return;
  }
// el usuario ingresa un dato correcto
  if (stock[codigo] > 0) {
    stock[codigo]--;
    alert(` Gracias por tu compra. Te llevas: ${productos[codigo]}`);
  } else {
    let sugerencia = sugerirAlternativa();
    if (sugerencia) {
      alert(`Producto agotado. Te sugerimos: ${sugerencia}`);
    } else {
      alert("Todos los productos están agotados.");
    }
  }
}



function iniciarExpendedora() {
  let opcion;
  do {
    opcion = prompt(" MÁQUINA EXPENDEDORA \n1. Comprar producto\n2. Ver inventario\n3. Salir");
    if (opcion === "1") {
      comprarProducto();
    } else if (opcion === "2") {
      mostrarInventario();
    } else if (opcion !== "3") {
      alert("Opción inválida.");
    }
  } while (opcion !== "3");

  alert("Gracias por usar la máquina expendedora. ");
}
