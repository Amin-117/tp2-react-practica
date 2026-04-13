# Frontend Pokémon Manager

Aplicación React para gestionar una colección de Pokémons consumiendo una API REST.

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Se abrirá en http://localhost:5173

## Características

- **Listar Pokémons**: Visualiza todos los Pokémons en cards modernas
- **Crear**: Formulario para agregar nuevos Pokémons
- **Editar**: Modifica la información de Pokémons existentes
- **Eliminar**: Borra Pokémons con confirmación
- **Buscar**: Busca por nombre con coincidencias parciales (case insensitive)

## Estructura del Proyecto

```
src/
├── components/
│   ├── PokemonForm.jsx
│   ├── PokemonItem.jsx
│   ├── PokemonList.jsx
│   └── SearchBar.jsx
├── hooks/
│   └── usePokemons.js
├── pages/
│   └── Home.jsx
├── router/
│   └── AppRouter.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Validaciones

- Campo obligatorio: nombre, tipo, generación
- Mensajes de error claros en validación
- Confirmación antes de eliminar

## API

Se conecta a `http://localhost:5000/pokemons`

Asegúrate de que el backend esté corriendo antes de iniciar la aplicación.
