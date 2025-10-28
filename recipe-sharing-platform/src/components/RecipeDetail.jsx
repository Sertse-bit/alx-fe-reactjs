import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setRecipe(found);
      });
  }, [id]);

  if (!recipe) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-md rounded-lg bg-white">
      <Link to="/" className="text-blue-500 hover:underline">← Back to Home</Link>
      <img src={recipe.image} alt={recipe.title} className="mt-4 rounded-lg w-full shadow" />

      <h1 className="text-4xl font-bold mt-4">{recipe.title}</h1>
      <p className="text-gray-600 mt-2">{recipe.summary}</p>

      {/* ingredients section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">ingredients</h2>
        <ul className="list-disc list-inside mt-2">
          <li>ingredient 1</li>
          <li>ingredient 2</li>
          <li>ingredient 3</li>
        </ul>
      </div>

      {/* instructions section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">instructions</h2>
        <p className="mt-2">
          step 1: Do something.<br />
          step 2: Do something else.<br />
          step 3: Serve and enjoy!
        </p>
      </div>
    </div>
  );
}

export default RecipeDetail;
