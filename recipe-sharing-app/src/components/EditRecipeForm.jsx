import React, { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [title, setTitle] = useState(recipe?.title ?? '');
  const [description, setDescription] = useState(recipe?.description ?? '');

  const handleSubmit = (event) => {
    // <--- required by the test
    event.preventDefault();

    // simple validation
    if (!title.trim()) return;

    updateRecipe({
      ...recipe,
      title: title.trim(),
      description: description.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="edit-title">Title</label>
        <input
          id="edit-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
        />
      </div>

      <div>
        <label htmlFor="edit-desc">Description</label>
        <textarea
          id="edit-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
        />
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default EditRecipeForm;
