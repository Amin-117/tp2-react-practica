import { useState } from "react";
import { PokemonForm } from "./PokemonForm";

export const PokemonItem = ({ pokemon, onDelete, onUpdate, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este pokemon?")) {
      onDelete(pokemon._id);
    }
  };

  const handleUpdate = async (updatedData) => {
    const result = await onUpdate(pokemon._id, updatedData);
    if (result?.success) {
      setIsEditing(false);
    }
    return result;
  };

  if (isEditing) {
    return (
      <div className="pokemon-card editing">
        <PokemonForm
          onSubmit={handleUpdate}
          initialData={pokemon}
          isLoading={isLoading}
        />
        <button
          onClick={() => setIsEditing(false)}
          className="btn btn-secondary"
          style={{ marginTop: "10px" }}
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className="pokemon-card">
      <h3>{pokemon.nombre}</h3>
      <p>
        <strong>Tipo:</strong> {pokemon.tipo}
      </p>
      <p>
        <strong>Generación:</strong> {pokemon.generacion}
      </p>
      <div className="pokemon-actions">
        <button onClick={() => setIsEditing(true)} className="btn btn-warning">
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          disabled={isLoading}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
