// Arreglo para almacenar las últimas 5 transacciones
let transacciones = [];

// Función para agregar una transacción (depósito o retiro)
function agregarTransaccion(monto) {
  if (transacciones.length >= 5) {
    transacciones.shift(); // Elimina la transacción más antigua
  }
  transacciones.push(monto);
}

// Función para calcular el saldo actual usando map
function consultarSaldo() {
  return transacciones.map((t) => t).reduce((acc, curr) => acc + curr, 0);
}

// Función para depositar dinero
function depositar(monto) {
  if (monto > 0) {
    agregarTransaccion(monto);
    console.log(`Depósito exitoso de $${monto}`);
  } else {
    console.log("El monto a depositar debe ser positivo.");
  }
}

// Función para retirar dinero
function retirar(monto) {
  const saldoActual = consultarSaldo();
  if (monto <= 0) {
    console.log("El monto a retirar debe ser positivo.");
  } else if (monto > 500) {
    console.log("No se pueden retirar más de $500 en una sola transacción.");
  } else if (monto > saldoActual) {
    console.log("Saldo insuficiente.");
  } else {
    agregarTransaccion(-monto);
    console.log(`Retiro exitoso de $${monto}`);
  }
}

// Función para mostrar transacciones
function mostrarTransacciones() {
  console.log("Últimas transacciones:");
  transacciones.map((t, i) => {
    const tipo = t > 0 ? "Depósito" : "Retiro";
    console.log(`${i + 1}. ${tipo} de $${Math.abs(t)}`);
  });
}

// Ejemplo de uso
depositar(300);
depositar(200);
retirar(100);
depositar(400);
retirar(50);
retirar(600); // invalido
retirar(800); // invalido
retirar(200); // válido

console.log(`Saldo actual: $${consultarSaldo()}`);
mostrarTransacciones();
