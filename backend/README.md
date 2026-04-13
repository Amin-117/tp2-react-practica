# Backend Pokemon API

API REST simple para gestionar Pokemons usando Node.js, Express y MongoDB con ES Modules.

## Instalación

1. Instalar dependencias: `npm install`
2. Configurar MongoDB y actualizar .env si es necesario.
3. Ejecutar: `npm start` o `npm run dev`

## Endpoints

- GET /pokemons - Listar todos (opcional: ?nombre=busqueda)
- GET /pokemons/:id - Obtener por ID
- POST /pokemons - Crear nuevo
- PUT /pokemons/:id - Actualizar
- DELETE /pokemons/:id - Eliminar
