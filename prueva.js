const muñeco = document.getElementById("muñeco");
const nube = document.getElementById("nube");

let x = 0;
let direccion = 1;
let pensando = false;

const pensamientos = [
  "¿Y si...?",
  "Esto es complejo...",
  "Hmm...",
  "Estoy cerca...",
  "Tal vez eso funcione...",
  "Sigo pensando..."
];

// Movimiento continuo
function animar() {
  if (!pensando) {
    x += direccion * 1.5;
    muñeco.style.left = x + "px";
  }

  if (x >= window.innerWidth - 100 || x <= 0) {
    direccion *= -1;
    muñeco.style.transform = direccion === -1 ? "scaleX(-1)" : "scaleX(1)";
  }

  requestAnimationFrame(animar);
}

// Pensamiento simulado
function iniciarPensamiento() {
  pensando = true;
  nube.style.display = "block";
  nube.textContent = pensamientos[Math.floor(Math.random() * pensamientos.length)];

  setTimeout(() => {
    pensando = false;
    nube.style.display = "none";
    setTimeout(iniciarPensamiento, Math.random() * 5000 + 3000); // pensar de nuevo luego
  }, Math.random() * 3000 + 2000); // pensar entre 2 y 5s
}

// Iniciar animación
animar();
setTimeout(iniciarPensamiento, 3000); // primer pensamiento tras 3s
