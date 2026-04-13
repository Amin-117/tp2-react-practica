import { useState, useEffect } from "react";
import { usePokemons } from "../hooks/usePokemons";
import { SearchBar } from "../components/SearchBar";
import { PokemonForm } from "../components/PokemonForm";
import { PokemonList } from "../components/PokemonList";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { getPokemons, createPokemon, updatePokemon, deletePokemon } =
    usePokemons();

  const fetchPokemons = async (term = "") => {
    setLoading(true);
    setError(null);
    try {
      const result = await getPokemons(term);
      if (result.success) {
        setPokemons(result.data);
      } else {
        setError(result.message || "Error obteniendo pokemons");
      }
    } catch (err) {
      setError("Error conectando con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchPokemons(term);
  };

  const handleCreatePokemon = async (pokemonData) => {
    setLoading(true);
    try {
      const result = await createPokemon(pokemonData);
      if (result.success) {
        setPokemons((prev) => [...prev, result.data]);
      } else {
        setError(result.message || "Error creando pokemon");
      }
      return result;
    } catch (err) {
      setError("Error creando pokemon");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePokemon = async (id, pokemonData) => {
    setLoading(true);
    try {
      const result = await updatePokemon(id, pokemonData);
      if (result.success) {
        setPokemons((prev) =>
          prev.map((p) => (p._id === id ? result.data : p)),
        );
      } else {
        setError(result.message || "Error actualizando pokemon");
      }
      return result;
    } catch (err) {
      setError("Error actualizando pokemon");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePokemon = async (id) => {
    setLoading(true);
    try {
      const result = await deletePokemon(id);
      if (result.success) {
        setPokemons((prev) => prev.filter((p) => p._id !== id));
      } else {
        setError(result.message || "Error eliminando pokemon");
      }
      return result;
    } catch (err) {
      setError("Error eliminando pokemon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <header className="header">
        <h1>Pokémon Manager</h1>
        <p>Gestiona tu colección de pokemons</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="container">
        <div className="left-section">
          <h2>Crear Nuevo Pokémon</h2>
          <PokemonForm onSubmit={handleCreatePokemon} isLoading={loading} />
        </div>

        <div className="right-section">
          <h2>Mis Pokemons</h2>
          <SearchBar onSearch={handleSearch} />
          {loading && pokemons.length === 0 ? (
            <div className="loading">Cargando...</div>
          ) : (
            <PokemonList
              pokemons={pokemons}
              onDelete={handleDeletePokemon}
              onUpdate={handleUpdatePokemon}
              isLoading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};
