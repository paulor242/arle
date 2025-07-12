const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Base de datos en memoria (para simplicidad)
let users = [];
let products = [
  { id: 1, name: 'Apex Legends', price: 29.99, image: 'imagenes/apex.jpg', description: 'Battle Royale gratuito' },
  { id: 2, name: 'Call of Duty', price: 59.99, image: 'imagenes/call of duty.jpg', description: 'Shooter de acción' },
  { id: 3, name: 'Fortnite', price: 0, image: 'imagenes/fornite.jpg', description: 'Battle Royale gratuito' },
  { id: 4, name: 'God of War', price: 49.99, image: 'imagenes/god of war.jpeg', description: 'Aventura épica' },
  { id: 5, name: 'Mortal Kombat', price: 39.99, image: 'imagenes/mortal kombat.jpeg', description: 'Juego de lucha' },
  { id: 6, name: 'Super Mario', price: 54.99, image: 'imagenes/super mario.jpeg', description: 'Plataformas clásico' }
];
let carts = {};

// Rutas de autenticación
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Usuario ya existe' });
  }
  
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password // En producción, hashear la contraseña
  };
  
  users.push(newUser);
  carts[newUser.id] = [];
  
  res.json({ message: 'Usuario registrado exitosamente', user: { id: newUser.id, username, email } });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  
  res.json({ 
    message: 'Login exitoso', 
    user: { id: user.id, username: user.username, email: user.email }
  });
});

// Rutas de productos
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(product);
});

// Rutas del carrito
app.get('/api/cart/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userCart = carts[userId] || [];
  
  const cartWithDetails = userCart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product: product
    };
  });
  
  res.json(cartWithDetails);
});

app.post('/api/cart/:userId/add', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { productId, quantity = 1 } = req.body;
  
  if (!carts[userId]) {
    carts[userId] = [];
  }
  
  const existingItem = carts[userId].find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[userId].push({ productId, quantity });
  }
  
  res.json({ message: 'Producto agregado al carrito' });
});

app.delete('/api/cart/:userId/remove/:productId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.params.productId);
  
  if (carts[userId]) {
    carts[userId] = carts[userId].filter(item => item.productId !== productId);
  }
  
  res.json({ message: 'Producto eliminado del carrito' });
});

app.put('/api/cart/:userId/update/:productId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;
  
  if (carts[userId]) {
    const item = carts[userId].find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
  }
  
  res.json({ message: 'Cantidad actualizada' });
});

// Ruta para obtener todos los usuarios (para testing)
app.get('/api/users', (req, res) => {
  res.json(users.map(u => ({ id: u.id, username: u.username, email: u.email })));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});