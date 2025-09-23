import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    // navigate back to home after deletion
    navigate('/');
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
