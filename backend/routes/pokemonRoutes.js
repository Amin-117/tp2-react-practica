import express from "express";
import {
  getPokemons,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
} from "../controllers/pokemonController.js";

const router = express.Router();

router.get("/", getPokemons);
router.get("/:id", getPokemonById);
router.post("/", createPokemon);
router.put("/:id", updatePokemon);
router.delete("/:id", deletePokemon);

export default router;
