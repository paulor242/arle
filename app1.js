// Estado inicial: 5 habitaciones libres
let habitaciones = [0, 0, 0, 0, 0];

// Función para mostrar el estado actual en una sola alerta
function mostrarEstado() {
  let mensaje = "Estado de habitaciones:\n";
  for (let i = 0; i < habitaciones.length; i++) {
    mensaje += `Habitación ${i + 1}: ${habitaciones[i] === 0 ? "Libre" : "Ocupada"}\n`; //imprime el estado de las habitaciones
  }
  alert(mensaje);
}

// Función para reservar una habitación
function reservarHabitacion() {
  let numero = parseInt(prompt("¿Qué habitación deseas reservar? (1-5)")); 
  if (numero >= 1 && numero <= 5) {
    if (habitaciones[numero - 1] === 0) {
      habitaciones[numero - 1] = 1;
      alert(`Habitación ${numero} reservada con éxito.`);
    } else {
      alert(`La habitación ${numero} ya está ocupada.`);
    }
  } else {
    alert("Número de habitación inválido.");
  }
}

// Función para liberar una habitación
function liberarHabitacion() {
  let numero = parseInt(prompt("¿Qué habitación deseas liberar? (1-5)"));
  if (numero >= 1 && numero <= 5) {
    if (habitaciones[numero - 1] === 1) {
      habitaciones[numero - 1] = 0;
      alert(`Habitación ${numero} liberada con éxito.`);
    } else {
      alert(`La habitación ${numero} ya está libre.`);
    }
  } else {
    alert("Número de habitación inválido.");
  }
}

// Función menu principal
function iniciarSistema() {
  let opcion;
  do {
    mostrarEstado();
    opcion = prompt("Elige una opción:\n1. Reservar habitación\n2. Liberar habitación\n3. Salir");
    if (opcion === "1") {
      reservarHabitacion();
    } else if (opcion === "2") {
      liberarHabitacion();
    } else if (opcion !== "3") {
      alert("Opción inválida.");
    }
  } while (opcion !== "3");

  alert("Gracias por usar el sistema de reservas.");
}
