// Cola de atención (arreglo)
let cola = [];
const capacidadMaxima = 7;

// Función para agregar un cliente a la cola
function agregarCliente(nombre) {
  if (cola.length >= capacidadMaxima) {
    console.log(`La cola está llena. No se puede agregar a ${nombre}.`);
  } else {
    cola.push(nombre);
    console.log(`Cliente ${nombre} agregado a la cola.`);
  }
}

// Función para atender al siguiente cliente en la cola
function atenderCliente() {
  if (cola.length === 0) {
    console.log("La cola está vacía. No hay clientes para atender.");
  } else {
    const clienteAtendido = cola.shift(); // Atiende al primero en la cola
    console.log(`Cliente ${clienteAtendido} ha sido atendido.`);
  }
}

// Función para mostrar los clientes en la cola
function mostrarCola() {
  if (cola.length === 0) {
    console.log("No hay clientes en la cola.");
  } else {
    console.log("Clientes en la cola:");
    cola.map((cliente, index) => {
      console.log(`${index + 1}. ${cliente}`);
    });
  }
}

// Ejemplo de uso
agregarCliente("Ana");
agregarCliente("Luis");
agregarCliente("Carlos");
agregarCliente("Sofía");
agregarCliente("María");
agregarCliente("Pedro");
agregarCliente("Lucía");
agregarCliente("Jorge"); // No se debe agregar

mostrarCola();

atenderCliente();
atenderCliente();

mostrarCola();

agregarCliente("Jorge"); // Ahora sí puede entrar
mostrarCola();
