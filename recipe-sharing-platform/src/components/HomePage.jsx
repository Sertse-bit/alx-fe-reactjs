import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ Required import added

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error loading recipes:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🍽️ Recipe Sharing Platform</h1>

      {}
      <Link
        to="/add-recipe"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block"
      >
        ➕ Add Recipe
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-40 w-full object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p className="text-gray-600 mt-2">{recipe.summary}</p>

              {/* ✅ Replace <a href> with Link */}
              <Link
                to={`/recipe/${recipe.id}`}
                className="text-blue-500 mt-4 inline-block hover:underline"
              >
                View Recipe →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
