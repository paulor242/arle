// Array de objetos: cada elemento tiene { tipo, monto }
let transacciones = [];

function agregarTransaccion(tipo, monto) {
  if (transacciones.length >= 5) {
    transacciones.shift(); // Eliminar la transacción más antigua
  }
  transacciones.push({ tipo, monto }); // Agregar nuevo objeto de transacción
}

function consultarSaldo() {
  return transacciones
    .map(t => t.tipo === "depósito" ? t.monto : -t.monto)
    .reduce((acc, curr) => acc + curr, 0);
}

function depositar() {
  const entrada = prompt("¿Cuánto deseas depositar?");
  const monto = parseFloat(entrada);
  if (monto > 0) {
    agregarTransaccion("depósito", monto);
    alert(`Depósito exitoso de $${monto}`);
  } else {
    alert("Monto inválido.");
  }
}

function retirar() {
  const entrada = prompt("¿Cuánto deseas retirar?");
  const monto = parseFloat(entrada);
  const saldo = consultarSaldo();
  if (monto <= 0) {
    alert("Monto inválido.");
  } else if (monto > 500) {
    alert("No puedes retirar más de $500.");
  } else if (monto > saldo) {
    alert("Saldo insuficiente.");
  } else {
    agregarTransaccion("retiro", monto);
    alert(`Retiro exitoso de $${monto}`);
  }
}

function mostrarSaldo() {
  alert(`Saldo actual: $${consultarSaldo()}`);
}

function mostrarTransacciones() {
  if (transacciones.length === 0) {
    alert("No hay transacciones aún.");
  } else {
    const lista = transacciones
      .map((t, i) => `${i + 1}. ${t.tipo} de $${t.monto}`)
      .join('\n');
    alert("Transacciones:\n" + lista);
  }
}