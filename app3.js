let colaClientes = []; // Declara un array vacío llamado 'colaClientes' para simular la fila.
const capacidadMaxima = 7; // Declara una constante 'capacidadMaxima' con el valor 7, representando el límite de la cola.

function agregarCliente(nombre) { // Define una función llamada 'agregarCliente' que recibe el 'nombre' del cliente.
  if (colaClientes.length < capacidadMaxima) { // Verifica si la longitud actual de la 'colaClientes' es menor que la 'capacidadMaxima'.
    colaClientes.push(nombre); // Agrega el 'nombre' del cliente al final de la 'colaClientes'.
    console.log(`${nombre} se ha unido a la cola. Cola actual: ${colaClientes.join(', ')}`); // Muestra un mensaje indicando que el cliente se unió y la lista actual de la cola.
  } else { // Bloque 'else' que se ejecuta si la cola está llena.
    console.log(`La cola está llena. ${nombre} no puede unirse.`); // Muestra un mensaje indicando que la cola está llena.
  }
}

function atenderCliente() { // Define una función llamada 'atenderCliente' sin argumentos.
  if (colaClientes.length > 0) { // Verifica si la longitud de la 'colaClientes' es mayor que cero (si hay clientes en la cola).
    const clienteAtendido = colaClientes.shift(); // Elimina y devuelve el primer elemento del array 'colaClientes', simulando atender al cliente.
    console.log(`${clienteAtendido} ha sido atendido. Cola restante: ${colaClientes.join(', ')}`); // Muestra un mensaje indicando quién fue atendido y la cola restante.
  } else { // Bloque 'else' que se ejecuta si la cola está vacía.
    console.log("La cola está vacía."); // Muestra un mensaje indicando que no hay clientes en la cola.
  }
}

function mostrarCola() { // Define una función llamada 'mostrarCola' sin argumentos.
  if (colaClientes.length > 0) { // Verifica si hay clientes en la cola.
    console.log(`Clientes en la cola: ${colaClientes.join(', ')}`); // Muestra la lista de clientes en la cola.
  } else { // Bloque 'else' si la cola está vacía.
    console.log("La cola está vacía."); // Muestra un mensaje indicando que la cola está vacía.
  }
}

function verificarColaLlena() { // Define una función llamada 'verificarColaLlena' sin argumentos.
  if (colaClientes.length === capacidadMaxima) { // Verifica si la longitud de la cola es igual a la capacidad máxima.
    console.log("La cola está llena."); // Muestra un mensaje si la cola está llena.
  } else { // Bloque 'else' si la cola no está llena.
    console.log(`La cola tiene ${capacidadMaxima - colaClientes.length} espacios disponibles.`); // Muestra cuántos espacios quedan en la cola.
  }
}

function verificarColaVacia() { // Define una función llamada 'verificarColaVacia' sin argumentos.
  if (colaClientes.length === 0) { // Verifica si la longitud de la cola es cero.
    console.log("La cola está vacía."); // Muestra un mensaje si la cola está vacía.
  } else { // Bloque 'else' si la cola no está vacía.
    console.log("La cola no está vacía."); // Muestra un mensaje indicando que hay clientes en la cola.
  }
}

// Ejemplo de uso
agregarCliente("Ana"); // Llama a 'agregarCliente' para añadir a Ana a la cola.
agregarCliente("Carlos"); // Añade a Carlos.
agregarCliente("Sofía"); // Añade a Sofía.
mostrarCola(); // Muestra el estado actual de la cola.
atenderCliente(); // Simula la atención del primer cliente en la cola.
agregarCliente("Pedro"); // Añade a Pedro.
agregarCliente("Luisa"); // Añade a Luisa.
agregarCliente("Javier"); // Añade a Javier.
agregarCliente("Valentina"); // Añade a Valentina.
agregarCliente("Mateo"); // Intenta añadir a Mateo cuando la cola está llena.
verificarColaLlena(); // Verifica si la cola está llena.

console.log(`\nNúmero de clientes en la cola: ${colaClientes.length}`); // Muestra la cantidad de clientes en la cola usando 'length'.
if (colaClientes.length > 0) { // Verifica si hay al menos un cliente en la cola.
  console.log(`Primer cliente en la cola: ${colaClientes.at(0)}`); // Muestra el primer cliente en la cola usando 'at(0)'.
}
verificarColaVacia(); // Verifica si la cola está vacía.
while (colaClientes.length > 0) { // Inicia un bucle 'while' que se ejecuta mientras haya clientes en la cola.
  atenderCliente(); // Llama a 'atenderCliente' para simular la atención de cada cliente.
}
verificarColaVacia(); // Verifica si la cola está vacía después de atender a todos.