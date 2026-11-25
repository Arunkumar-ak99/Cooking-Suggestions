import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { recipes } from "../data/recipes";
import { addShoppingItem } from "../features/shopping/shoppingSlice";
import { toggleFavourite } from "../features/favourites/favouriteSlice";

export default function RecipeDetails() {
  const { id } = useParams();
  const recipe = recipes.find(item => item.id === Number(id));
  const dispatch = useDispatch();
  const items = useSelector(state => state.fridge.items);
  const favourites = useSelector(state => state.favourites.ids);
  if (!recipe) return <div className="page-content"><div className="empty-state">Recipe not found. <Link to="/recipes">Back to recipes</Link></div></div>;
  const available = items.map(item => item.name.toLowerCase());
  const missing = recipe.ingredients.filter(item => !available.includes(item.toLowerCase()));
  const favourite = favourites.includes(recipe.id);

  return <div className="page-content">
    <Link to="/recipes" className="back-link">← Back to recipes</Link>
    <div className="detail-layout">
      <div className="detail-main">
        <img className="detail-image" src={recipe.image} alt={recipe.name}/>
        <div className="detail-heading"><div>
          <span className="category-label">{recipe.category}</span>
          <h2>{recipe.name}</h2>
          <p>◷ {recipe.time} minutes　·　{recipe.difficulty}　·　{recipe.servings} servings</p>
        </div>
        <button className={favourite ? "button button-fav" : "button button-outline"} 
          onClick={() => dispatch(toggleFavourite(recipe.id))}>
            {favourite ? "♥ Saved" : "♡ Save recipe"}
        </button>
      </div>
      <section className="instructions">
        <h3>How to make it</h3>
        {recipe.instructions.map((step,index) => 
        <div className="step" key={index}>
          <span>{String(index+1).padStart(2,"0")}</span>
          <p>{step}</p>
          </div>)}
      </section>
      </div>
      <aside className="detail-side">
        <div className="side-panel">
          <h3>Ingredients</h3>
          <p className="muted">Check what you already have.</p>
          {recipe.ingredients.map(name => <div className="ingredient-check" key={name}>
            <span className={available.includes(name.toLowerCase()) ? "check yes" : "check"}>{available.includes(name.toLowerCase()) ? "✓" : "+"}</span>
            <span>{name}</span>
            <small>{available.includes(name.toLowerCase()) ? "In fridge" : "Need to buy"}</small>
            </div>)}
        {missing.length > 0 ?
         <button 
        className="button button-primary full-button" 
            onClick={() => missing.forEach(name => dispatch(addShoppingItem(name)))}>
              Add missing to shopping list
         </button>
               : <div className="all-ready">✓ You have everything!</div>}
        </div>
      </aside>
    </div>
  </div>;
}
