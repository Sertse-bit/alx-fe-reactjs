import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import { useRecipeStore } from './store/recipeStore';
import RecipeDetails from './components/RecipeDetails';

function App() {
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );

  return (
    <BrowserRouter>
      <h1>Recipe Sharing App</h1>
      <Routes>
        {}
        <Route
          path="/"
          element={
            <div>
              <SearchBar />
              <AddRecipeForm />
              <RecipeList />
              <FavoritesList />
              <button onClick={generateRecommendations}>
                Get Recommendations
              </button>
              <RecommendationsList />
            </div>
          }
        />

        {/* ✅ details page */}
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
