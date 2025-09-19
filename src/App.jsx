import useRecipeStore from './store/recipeStore'

function App() {
  const { recipes, addRecipe } = useRecipeStore()

  const handleAddRecipe = () => {
    addRecipe({
      id: Date.now(),
      title: "Spaghetti Bolognese",
      ingredients: ["Spaghetti", "Beef", "Tomato Sauce"],
    })
  }

  return (
    <div>
      <h1>🍳 Recipe App</h1>
      <button onClick={handleAddRecipe}>Add Recipe</button>

      <ul>
        {recipes.map((r) => (
          <li key={r.id}>
            <strong>{r.title}</strong> - {r.ingredients.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
