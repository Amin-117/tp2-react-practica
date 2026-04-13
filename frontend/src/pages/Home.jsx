import { useState, useEffect } from "react";
import { usePokemons } from "../hooks/usePokemons";
import { useFetch } from "../hooks/useFetch";
import { SearchBar } from "../components/SearchBar";
import { PokemonForm } from "../components/PokemonForm";
import { PokemonList } from "../components/PokemonList";

const API_URL = "http://localhost:5000/pokemons";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { createPokemon, updatePokemon, deletePokemon } = usePokemons();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const url = debouncedSearchTerm ? `${API_URL}?nombre=${debouncedSearchTerm}` : API_URL;
  const { data: pokemons, loading: fetchLoading, error: fetchError, refetch } = useFetch(url);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCreatePokemon = async (pokemonData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createPokemon(pokemonData);
      if (result.success) {
        refetch();
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
    setError(null);
    try {
      const result = await updatePokemon(id, pokemonData);
      if (result.success) {
        refetch();
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
    setError(null);
    try {
      const result = await deletePokemon(id);
      if (result.success) {
        refetch();
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

      {(error || fetchError) && <div className="error-message">{error || fetchError}</div>}

      <div className="container">
        <div className="left-section">
          <h2>Crear Nuevo Pokémon</h2>
          <PokemonForm onSubmit={handleCreatePokemon} isLoading={loading} />
        </div>

        <div className="right-section">
          <h2>Mis Pokemons</h2>
          <SearchBar onSearch={handleSearch} />
          {fetchLoading && <div className="loading">Cargando...</div>}
          <PokemonList
            pokemons={pokemons}
            onDelete={handleDeletePokemon}
            onUpdate={handleUpdatePokemon}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};
