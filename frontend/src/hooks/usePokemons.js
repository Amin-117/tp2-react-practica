import { useState, useCallback } from "react";

const API_URL = "http://localhost:5000/pokemons";

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPokemons = useCallback(async (nombre = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = nombre ? `${API_URL}?nombre=${nombre}` : API_URL;
      const response = await fetch(url);
      const json = await response.json();
      if (json.success) {
        setPokemons(json.data);
      } else {
        setError(json.message || "Error obteniendo pokemons");
      }
    } catch (err) {
      setError("Error conectando con el servidor");
    } finally {
      setLoading(false);
    }
  }, []);

  const createPokemon = useCallback(
    async (pokemon) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokemon),
        });
        const json = await response.json();
        if (json.success) {
          setPokemons([...pokemons, json.data]);
          return json;
        } else {
          setError(json.message || "Error creando pokemon");
          return { success: false, message: json.message };
        }
      } catch (err) {
        setError("Error creando pokemon");
        return { success: false, message: "Error creando pokemon" };
      } finally {
        setLoading(false);
      }
    },
    [pokemons],
  );

  const updatePokemon = useCallback(
    async (id, pokemon) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokemon),
        });
        const json = await response.json();
        if (json.success) {
          setPokemons(pokemons.map((p) => (p._id === id ? json.data : p)));
          return json;
        } else {
          setError(json.message || "Error actualizando pokemon");
          return { success: false, message: json.message };
        }
      } catch (err) {
        setError("Error actualizando pokemon");
        return { success: false, message: "Error actualizando pokemon" };
      } finally {
        setLoading(false);
      }
    },
    [pokemons],
  );

  const deletePokemon = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        const json = await response.json();
        if (json.success) {
          setPokemons(pokemons.filter((p) => p._id !== id));
          return json;
        } else {
          setError(json.message || "Error eliminando pokemon");
          return { success: false, message: json.message };
        }
      } catch (err) {
        setError("Error eliminando pokemon");
        return { success: false, message: "Error eliminando pokemon" };
      } finally {
        setLoading(false);
      }
    },
    [pokemons],
  );

  return {
    pokemons,
    loading,
    error,
    getPokemons,
    createPokemon,
    updatePokemon,
    deletePokemon,
  };
};
