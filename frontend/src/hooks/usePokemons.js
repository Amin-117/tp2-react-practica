const API_URL = "http://localhost:5000/pokemons";

export const usePokemons = () => {
  const getPokemons = async (nombre = "") => {
    const url = nombre ? `${API_URL}?nombre=${nombre}` : API_URL;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  };

  const createPokemon = async (pokemon) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    });
    const json = await response.json();
    return json;
  };

  const updatePokemon = async (id, pokemon) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    });
    const json = await response.json();
    return json;
  };

  const deletePokemon = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    return json;
  };

  return {
    getPokemons,
    createPokemon,
    updatePokemon,
    deletePokemon,
  };
};
