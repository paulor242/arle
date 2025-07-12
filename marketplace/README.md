# GameStore Marketplace

Un marketplace completo de videojuegos con API REST para gestión de usuarios, productos y carrito de compras.

## Características

- ✅ Registro e inicio de sesión de usuarios
- ✅ Catálogo de productos dinámico
- ✅ Carrito de compras persistente
- ✅ API REST completa para testing en Postman
- ✅ Interfaz responsive y moderna
- ✅ Gestión de sesiones

## Instalación

### 1. Instalar Node.js
Descarga e instala Node.js desde: https://nodejs.org/

### 2. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 3. Ejecutar el servidor
```bash
npm start
```
El servidor estará disponible en: http://localhost:3000

### 4. Abrir el frontend
Abre el archivo `index.html` en tu navegador o usa un servidor local como Live Server.

## API Endpoints para Postman

### Autenticación

**POST** `/api/register`
```json
{
  "username": "usuario_ejemplo",
  "email": "usuario@email.com",
  "password": "contraseña123"
}
```

**POST** `/api/login`
```json
{
  "email": "usuario@email.com",
  "password": "contraseña123"
}
```

### Productos

**GET** `/api/products` - Obtener todos los productos

**GET** `/api/products/:id` - Obtener producto específico

### Carrito de Compras

**GET** `/api/cart/:userId` - Ver carrito del usuario

**POST** `/api/cart/:userId/add` - Agregar producto al carrito
```json
{
  "productId": 1,
  "quantity": 2
}
```

**PUT** `/api/cart/:userId/update/:productId` - Actualizar cantidad
```json
{
  "quantity": 3
}
```

**DELETE** `/api/cart/:userId/remove/:productId` - Eliminar producto del carrito

### Usuarios (para testing)

**GET** `/api/users` - Ver todos los usuarios registrados

## Uso del Frontend

1. **Registro**: Crea una cuenta nueva con username, email y contraseña
2. **Login**: Inicia sesión con tu email y contraseña
3. **Explorar productos**: Navega por el catálogo de videojuegos
4. **Agregar al carrito**: Haz clic en "Agregar al Carrito" (requiere login)
5. **Ver carrito**: Haz clic en el ícono del carrito para ver tus productos
6. **Gestionar carrito**: Aumenta/disminuye cantidades o elimina productos

## Testing en Postman

1. Importa la colección de endpoints listados arriba
2. Registra un usuario usando `/api/register`
3. Inicia sesión con `/api/login` para obtener el ID del usuario
4. Usa el ID del usuario para probar los endpoints del carrito
5. Verifica que los productos se almacenan correctamente con `/api/cart/:userId`

## Estructura del Proyecto

```
marketplace/
├── backend/
│   ├── server.js          # Servidor principal de la API
│   └── package.json       # Dependencias del backend
├── imagenes/              # Imágenes de productos
├── index.html             # Página principal
├── index.css              # Estilos principales
├── index.js               # JavaScript del frontend
└── README.md              # Este archivo
```

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Base de datos**: En memoria (para simplicidad)
- **API**: REST con JSON

## Próximas Mejoras

- Integración con base de datos real (MongoDB/PostgreSQL)
- Sistema de pagos
- Autenticación con JWT
- Subida de imágenes
- Panel de administración