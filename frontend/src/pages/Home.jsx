import { useEffect } from "react";
import { usePokemons } from "../hooks/usePokemons";
import { SearchBar } from "../components/SearchBar";
import { PokemonForm } from "../components/PokemonForm";
import { PokemonList } from "../components/PokemonList";

export const Home = () => {
  const {
    pokemons,
    loading,
    error,
    getPokemons,
    createPokemon,
    updatePokemon,
    deletePokemon,
  } = usePokemons();

  useEffect(() => {
    getPokemons();
  }, []);

  const handleSearch = (searchTerm) => {
    getPokemons(searchTerm);
  };

  const handleCreatePokemon = async (pokemonData) => {
    return await createPokemon(pokemonData);
  };

  const handleUpdatePokemon = async (id, pokemonData) => {
    return await updatePokemon(id, pokemonData);
  };

  const handleDeletePokemon = async (id) => {
    return await deletePokemon(id);
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
