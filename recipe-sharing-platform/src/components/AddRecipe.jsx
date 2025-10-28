import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    image: "",
    ingredients: "",
    instructions: ""
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // For now, just log and redirect
    console.log("New recipe submitted:", formData);
    alert("Recipe submitted! (But not saved — no backend yet)");

    navigate("/"); // Go back home after submission
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add a New Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          className="w-full border p-2 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="summary"
          placeholder="Short Summary"
          className="w-full border p-2 rounded"
          value={formData.summary}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <textarea
          name="ingredients"
          placeholder="ingredients (comma separated)"
          className="w-full border p-2 rounded h-24"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />

        <textarea
          name="instructions"
          placeholder="instructions (step by step)"
          className="w-full border p-2 rounded h-32"
          value={formData.instructions}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
