import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  generacion: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Pokemon", pokemonSchema);
