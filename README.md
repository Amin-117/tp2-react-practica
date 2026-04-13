# TP2 React Practica

Proyecto dividido en dos partes: `backend` y `frontend`.

## Estructura general

- `backend/`: servidor y API REST.
- `frontend/`: aplicación React que consume la API.

---

## backend/

Esta carpeta contiene el código del servidor Node.js con Express y Mongoose.

- `package.json`: configura dependencias (`express`, `mongoose`, `cors`, `dotenv`) y scripts para iniciar el servidor.
- `server.js`: punto de entrada del servidor. Configura Express, middleware, la conexión a la base de datos y la ruta principal de la API.

### backend/config/

- `db.js`: configuración de conexión a MongoDB con Mongoose. Usualmente carga variables de entorno y conecta la base de datos.

### backend/controllers/

- `pokemonController.js`: define la lógica de negocio para las operaciones sobre los pokemones. Aquí se manejan las funciones que responden a las rutas, como obtener, crear, actualizar o eliminar pokemones.

### backend/models/

- `Pokemon.js`: modelo de datos de Mongoose para la colección de pokemones. Define el esquema y los campos que debe tener cada documento.

### backend/routes/

- `pokemonRoutes.js`: define las rutas de la API para los pokemones y las asocia con los controladores correspondientes.

---

## frontend/

Aplicación React creada con Vite. Consume los endpoints del backend para mostrar y gestionar pokemones.

- `package.json`: configura dependencias de React, React Router y scripts de desarrollo, build y lint.
- `vite.config.js`: configuración de Vite para el proyecto.
- `index.html`: plantilla HTML principal donde se monta la app React.

### frontend/src/

- `main.jsx`: archivo de arranque de React. Monta la aplicación en el DOM.
- `App.jsx`: componente raíz de la aplicación.
- `index.css`: estilos globales.

### frontend/src/components/

Contiene los componentes reutilizables de la UI:

- `PokemonForm.jsx`: formulario para crear o editar un pokemon.
- `PokemonItem.jsx`: componente que representa un pokemon individual en la lista.
- `PokemonList.jsx`: muestra la lista completa de pokemones.
- `SearchBar.jsx`: barra de búsqueda para filtrar pokemones.

### frontend/src/hooks/

Contiene hooks personalizados para separar lógica reutilizable:

- `useFetch.js`: hook para realizar peticiones HTTP y manejar estado de carga/errores.
- `useForm.js`: hook para manejar formularios y estado de inputs.
- `usePokemons.js`: hook específico para obtener y gestionar la lista de pokemones desde el backend.

### frontend/src/pages/

- `Home.jsx`: página principal de la aplicación donde se muestra la lista y el formulario.

### frontend/src/router/

- `AppRouter.jsx`: define las rutas de la aplicación React con `react-router-dom`.

---

## Cómo usar

1. Iniciar el backend:
   - `cd backend`
   - `npm install`
   - `npm run dev`

2. Iniciar el frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

---

## Notas

- El `backend` expone una API REST para gestionar pokemones.
- El `frontend` es la interfaz React que consume esa API.
- La separación en carpetas permite mantener la lógica de servidor y cliente aisladas y fáciles de mantener.
