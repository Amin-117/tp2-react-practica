import { PokemonItem } from "./PokemonItem";

export const PokemonList = ({ pokemons, onDelete, onUpdate, isLoading }) => {
  if (pokemons.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay pokemons disponibles</p>
      </div>
    );
  }

  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonItem
          key={pokemon._id}
          pokemon={pokemon}
          onDelete={onDelete}
          onUpdate={onUpdate}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
