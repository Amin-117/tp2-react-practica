import Pokemon from "../models/Pokemon.js";

// Obtener todos los pokemons, con búsqueda opcional por nombre
const getPokemons = async (req, res) => {
  try {
    const { nombre } = req.query;
    let query = {};
    if (nombre) {
      query.nombre = { $regex: nombre, $options: "i" }; // Búsqueda insensible a mayúsculas
    }
    const pokemons = await Pokemon.find(query);
    res.json({ success: true, data: pokemons });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error obteniendo pokemons" });
  }
};

// Obtener un pokemon por ID
const getPokemonById = async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) {
      return res
        .status(404)
        .json({ success: false, message: "Pokemon no encontrado" });
    }
    res.json({ success: true, data: pokemon });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error obteniendo pokemon" });
  }
};

// Crear un nuevo pokemon
const createPokemon = async (req, res) => {
  try {
    const { nombre, tipo, generacion } = req.body;
    if (!nombre || !tipo || !generacion) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const newPokemon = new Pokemon({ nombre, tipo, generacion });
    await newPokemon.save();
    res.status(201).json({
      success: true,
      message: "Pokemon creado correctamente",
      data: newPokemon,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creando pokemon" });
  }
};

// Actualizar un pokemon
const updatePokemon = async (req, res) => {
  try {
    const { nombre, tipo, generacion } = req.body;
    if (!nombre || !tipo || !generacion) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const updatedPokemon = await Pokemon.findByIdAndUpdate(
      req.params.id,
      { nombre, tipo, generacion },
      { new: true },
    );
    if (!updatedPokemon) {
      return res
        .status(404)
        .json({ success: false, message: "Pokemon no encontrado" });
    }
    res.json({
      success: true,
      message: "Pokemon actualizado correctamente",
      data: updatedPokemon,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error actualizando pokemon" });
  }
};

// Eliminar un pokemon
const deletePokemon = async (req, res) => {
  try {
    const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!deletedPokemon) {
      return res
        .status(404)
        .json({ success: false, message: "Pokemon no encontrado" });
    }
    res.json({ success: true, message: "Pokemon eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error eliminando pokemon" });
  }
};

export {
  getPokemons,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
};
