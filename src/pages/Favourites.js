import { useSelector } from "react-redux";
import { recipes } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";

export default function Favourites() {
  const ids = useSelector(state => state.favourites.ids);
  const saved = recipes.filter(recipe => ids.includes(recipe.id));
  return <div className="page-content">
    <div className="page-toolbar">
      <div>
        <h2>Recipes you love</h2>
        <p>Your saved recipes, all in one place.</p>
      </div>
      <span className="recipe-count">{saved.length} saved</span>
    </div>
    {saved.length ? 
      <div className="recipe-grid">{saved.map(recipe => 
        <RecipeCard key={recipe.id}
                    recipe={recipe}
        />)}
      </div> : 
      <div className="empty-state">
        <span>♡</span>
        <h3>No favourites yet</h3>
        <p>Tap the heart on any recipe to save it here.</p>
      </div>
      }
  </div>;
}
