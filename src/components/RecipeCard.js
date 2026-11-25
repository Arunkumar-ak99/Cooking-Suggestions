import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite } from "../features/favourites/favouriteSlice";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe, matchCount, missingCount }) {
  const dispatch = useDispatch();
  const favouriteIds = useSelector(state => state.favourites.ids);
  const favourite = favouriteIds.includes(recipe.id);

  return (
    <article className="recipe-card">
      <div className="recipe-image-wrap">
        <img src={recipe.image} alt={recipe.name} />
        <button className={favourite ? "heart-button selected" : "heart-button"} 
                onClick={() => dispatch(toggleFavourite(recipe.id))}
                 aria-label="Toggle favourite">
                {favourite ? "♥" : "♡"}
        </button>
        {typeof matchCount === "number" && <span className="match-badge">{matchCount} ingredients match</span>}
      </div>
      <div className="recipe-card-body">
        <div className="recipe-meta">
          <span>{recipe.category}</span>
          <span>◷ {recipe.time} min</span>
        </div>
        <h3>{recipe.name}</h3>
        <p>{recipe.difficulty} · {recipe.servings} servings</p>
        {typeof missingCount === "number" && 
        <div className={missingCount === 0 ? "missing-line ready" : "missing-line"}>
                       {missingCount === 0 ? "You have everything!" : `${missingCount} ingredient${missingCount > 1 ? "s" : ""} missing`}
        </div>}
        <Link className="text-link" to={`/recipe/${recipe.id}`}>
            View recipe <span>→</span>
        </Link>
      </div>
    </article>
  );
}
