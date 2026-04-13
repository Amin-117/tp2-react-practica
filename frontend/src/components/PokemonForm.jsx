import { useState, useEffect } from "react";

export const PokemonForm = ({
  onSubmit,
  initialData = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    generacion: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || "",
        tipo: initialData.tipo || "",
        generacion: initialData.generacion || "",
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.tipo.trim()) newErrors.tipo = "El tipo es obligatorio";
    if (!formData.generacion)
      newErrors.generacion = "La generación es obligatoria";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const result = await onSubmit({
      ...formData,
      generacion: Number(formData.generacion),
    });
    if (result?.success) {
      setFormData({ nombre: "", tipo: "", generacion: "" });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pokemon-form">
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={errors.nombre ? "form-input error" : "form-input"}
        />
        {errors.nombre && <span className="error-text">{errors.nombre}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="tipo">Tipo:</label>
        <input
          type="text"
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className={errors.tipo ? "form-input error" : "form-input"}
        />
        {errors.tipo && <span className="error-text">{errors.tipo}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="generacion">Generación:</label>
        <input
          type="number"
          id="generacion"
          name="generacion"
          value={formData.generacion}
          onChange={handleChange}
          className={errors.generacion ? "form-input error" : "form-input"}
        />
        {errors.generacion && (
          <span className="error-text">{errors.generacion}</span>
        )}
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary">
        {isLoading
          ? "Cargando..."
          : initialData
            ? "Actualizar"
            : "Crear Pokemon"}
      </button>
    </form>
  );
};
