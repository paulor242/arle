// Base de conocimientos del astronauta
//array de cadena de texto de las preguntas que se pueden realizar con sus respuesta
const spaceKnowledge = {
    // ... respuestas predefinidas
    // Base de conocimientos del astronauta
    "¿cuál es el sentido de la vida?": "Según 'La Guía del Autoestopista Galáctico', la respuesta es 42. Pero desde mi perspectiva espacial, creo que es explorar, aprender y conectar con otros seres en este vasto universo. 🌌",
    "¿cuántos planetas hay en el sistema solar?": "En nuestro sistema solar hay 8 planetas oficiales: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno. Plutón ahora es considerado un planeta enano. 🪐",
    "¿qué es un agujero negro?": "Es una región del espacio donde la gravedad es tan fuerte que nada, ni siquiera la luz, puede escapar. Se forman cuando estrellas masivas colapsan. ¡Son como aspiradoras cósmicas! 🕳️",
    "¿cómo funciona la gravedad?": "La gravedad es la curvatura del espacio-tiempo causada por la masa y energía. Imagina una pelota pesada en una cama elástica: esa curvatura es similar a cómo funciona la gravedad. 🌍",
    "¿qué es la velocidad de la luz?": "Es aproximadamente 299,792,458 metros por segundo en el vacío. Es la velocidad máxima a la que puede viajar cualquier cosa en el universo. ¡Es mi límite de velocidad favorito! ⚡",
    "¿hay vida en otros planetas?": "Estadísticamente es muy probable. Con billones de galaxias y planetas, sería extraño que fuéramos los únicos. Quizás algún día nos visitemos mutuamente. 👽",
    "hola": "¡Hola, terrícola! 👋 ¿Cómo estás navegando por el cosmos hoy?",
    "¿cómo estás?": "¡Flotando felizmente en el espacio! Las vistas desde aquí son espectaculares. ¿Y tú cómo andas por la Tierra? 🌍",
    "¿quien eres?": "Soy tu asistente astronauta personal, explorando el universo desde mi nave espacial. Me encanta compartir conocimientos sobre el cosmos. 🚀",
    "gracias": "¡De nada, explorador espacial! Siempre es un placer ayudar a un amigo viajero del cosmos. 🌟"
};

//array de cadena de texto pensamientos del chat antes de mostrar las respuestas
const thoughts = [ 
    // ... pensamientos aleatorios
    "Dame un segundo...",
    "Hmm... eso me recuerda a algo...",
    "Estoy procesando datos desde el espacio...",
    "Consultando mi base de datos galáctica...",
    "Analizando patrones cósmicos...",
    "Conectando con satélites...",
    "Recibiendo señales del universo..."
];



let isTyping = false; //si se envian dos preguntas a la vez respodne solo la ultima 

// Crear estrellas de fondo
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numStars = 150;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}


// Mostrar pensamientos del astronauta
function showThought(text) {
    const thoughtBubble = document.getElementById('thoughtBubble'); // el thoughtBubble representa el globo de pensamiento
    const thoughtText = document.getElementById('thoughtText'); //es el texto dentro del thoughtBubble
    
    thoughtBubble.classList.remove('show');

    // Aquí se usa un *callback* de tipo temporizador con `setTimeout`
    // para mostrar el pensamiento después de 300ms.
    setTimeout(() => { //se utilizo setTime para darle un tiempo de respuesta de 300s para realizar el envio de los mensajes 
        thoughtText.textContent = text;
        thoughtBubble.classList.add('show');
    }, 1000);
}

// Función con *Promise* para simular delay de respuesta del astronauta
function getAstronautResponse(question) {
    return new Promise((resolve) => { //utilizamos promesas para simular un  retraso al contestar las preguntas 
        const cleanQuestion = question.toLowerCase().trim();

        // Busca coincidencias exactas en la base de conocimientos
        for (let key in spaceKnowledge) {
            if (cleanQuestion.includes(key.toLowerCase())) {
                resolve(spaceKnowledge[key]); // Devuelve la respuesta
                return;
            }
        }

        // Devuelve respuestas por palabras clave
        if (cleanQuestion.includes('amor') || cleanQuestion.includes('corazón')) {
            resolve("El amor es la fuerza más poderosa del universo, más fuerte que la gravedad de cualquier agujero negro. ❤️");
        } else if (cleanQuestion.includes('tiempo') || cleanQuestion.includes('edad')) {
            resolve("El tiempo es relativo, como decía Einstein. Desde el espacio, veo que cada momento es precioso en esta danza cósmica. ⏰");
        } else if (cleanQuestion.includes('tierra') || cleanQuestion.includes('planeta')) {
            resolve("La Tierra es un punto azul pálido en la inmensidad del cosmos, pero es nuestro hogar y debemos cuidarla. 🌍");
        } else if (cleanQuestion.includes('estrella') || cleanQuestion.includes('sol')) {
            resolve("Las estrellas son faros cósmicos, reactores de fusión natural que iluminan la oscuridad del espacio. ⭐");
        }  else if (cleanQuestion.includes('hacer')||cleanQuestion.includes('gustos')){
            resolve("me gusta viajar por la galaxia, conociendo diferentes lugares, constelaciones y planetas ")
        } else if(cleanQuestion.includes('luz')) {
            resolve("gran pregunta... Es aproximadamente 299,792,458 metros por segundo en el vacío. Es la velocidad máxima a la que puede viajar cualquier cosa en el universo. ¡Es mi límite de velocidad favorito! ⚡");
        } else{ 
            resolve("Interesante pregunta... Desde mi perspectiva espacial, todo en el universo está conectado de maneras misteriosas. ¿Qué más te gustaría explorar? 🌌");
        }
    });
    // Esta *promesa* permite que la respuesta del astronauta
    // se maneje de forma asíncrona más adelante con `await`.
}

// Función que usa un *callback* para agregar mensajes al chat
function addMessage(content, isUser, callback) { //
    const chatMessages = document.getElementById('chatMessages');
    const message = document.createElement('div');
    message.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    message.textContent = content;

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Si se pasa un *callback*, se ejecuta después de 500ms
    if (callback) {
        setTimeout(callback, 500);
    }
}

// Muestra mensaje de carga animado
function showLoadingMessage() {
    const chatMessages = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message loading-message';
    loadingDiv.id = 'loadingMessage';
    loadingDiv.innerHTML = `
        <span>El astronauta está pensando </span>
        <div class="loading-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;

    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Elimina el mensaje de carga
function removeLoadingMessage() {
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

// ✨ Función principal que usa `async/await` para gestionar el flujo asíncrono
async function sendMessage() {
    const input = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const message = input.value.trim();

    if (!message || isTyping) return;

    isTyping = true;
    sendBtn.disabled = true;
    input.value = '';

    // Agrega el mensaje del usuario y luego ejecuta un *callback*
    addMessage(message, true, () => {
        const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
        showThought(randomThought); // muestra un pensamiento antes de responder

        showLoadingMessage(); // muestra animación de carga
    });

    try {
        // Aquí se usa `await` para esperar de forma asíncrona un retraso artificial
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

        // `await` también se usa para esperar la respuesta del astronauta (Promise)
        const response = await getAstronautResponse(message);

        removeLoadingMessage(); // quita el mensaje de carga
        addMessage(response, false, () => {
            showThought("¿En qué más puedo ayudarte?");
            showThought("que mas te gustaria saber")
        });

    } catch (error) {
        removeLoadingMessage();
        addMessage("¡Ups! Perdí la señal con la estación espacial. Inténtalo de nuevo. 📡", false);
    } finally {
        isTyping = false;
        sendBtn.disabled = false;
    }
}

// Lanza una pregunta rápida directamente
function askQuickQuestion(question) {
    const input = document.getElementById('messageInput');
    input.value = question;
    sendMessage(); // usa la función `async` para procesarla
}

// Escucha el evento "Enter" para enviar el mensaje
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage(); // usa `async/await`
    }
});

// Al cargar la página, se crean las estrellas y muestra un pensamiento inicial
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    showThought("¡Listo para explorar el universo juntos!");
});
