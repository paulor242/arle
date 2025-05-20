/*let productos = ["Chicle", "Galleta", "Soda", "Chocolate", "Agua"]; let cantidades = [2, 3, 1, 0, 4];

function mostrarInventario() {
     productos.forEach((producto, i) => { 
    console.log(`${i}: ${producto} - Cantidad: ${cantidades[i]}`); }); }

function comprarProducto(codigo) { 
  if (codigo < 0 || codigo >= productos.length) {
    console.log("Código inválido."); 
  return; } 
  if (cantidades[codigo] === 0) {
    console.log("Producto agotado. Sugerencia:");
    let sugerido = cantidades.findIndex(c => c > 0); 
    if (sugerido !== -1) {
    console.log("Puedes intentar con: ${productos[sugerido]}"); } else { 
    console.log("No hay productos disponibles."); } 
  
  return; } cantidades[codigo]--;
  console.log("Producto entregado: ${productos[codigo]}"); }

  */




  capacidadCola = 7;

function agregarCliente(nombre) { if (colaClientes.length >= capacidadCola) {
     console.log("Cola llena. No se puede agregar más clientes."); return; } colaClientes.push(nombre); 
     console.log(`Cliente ${nombre} agregado a la cola.`); }

function atenderCliente() { if (colaClientes.length === 0) { 
    console.log("No hay clientes en la cola."); return; } let cliente = colaClientes.shift(); 
    console.log(`Cliente atendido: ${cliente}`); }