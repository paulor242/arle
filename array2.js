// Array de objetos: cada elemento tiene { nombre, horaLlegada }
let cola = [];
const capacidadMaxima = 7;

function agregarCliente() {
  const nombre = prompt("Nombre del cliente:");
  if (!nombre) {
    alert("Nombre no válido.");
    return;
  }
  if (cola.length >= capacidadMaxima) {
    alert("La cola está llena.");
  } else {
    const cliente = {
      nombre: nombre,
      horaLlegada: new Date().toLocaleTimeString()
    };
    cola.push(cliente); // Agregar nuevo objeto cliente
    alert(`Cliente ${nombre} agregado a la cola.`);
  }
}

function atenderCliente() {
  if (cola.length === 0) {
    alert("La cola está vacía.");
  } else {
    const cliente = cola.shift(); // Atender (eliminar) el primer objeto cliente
    alert(`Cliente ${cliente.nombre} atendido. Llegó a las ${cliente.horaLlegada}.`);
  }
}

function mostrarCola() {
  if (cola.length === 0) {
    alert("No hay clientes en la cola.");
  } else {
    const lista = cola
      .map((c, i) => `${i + 1}. ${c.nombre} (Llegó a las ${c.horaLlegada})`)
      .join('\n');
    alert("Clientes en la cola:\n" + lista);
  }
}