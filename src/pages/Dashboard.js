import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { recipes } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";

export default function Dashboard() {
  const items = useSelector(state => state.fridge.items);
  const shopping = useSelector(state => state.shopping.items);
  const favourites = useSelector(state => state.favourites.ids);
  const names = items.map(item => item.name.toLowerCase());
  const matching = recipes.map(recipe => ({
    ...recipe,
    matchCount: recipe.ingredients.filter(i => names.includes(i)).length,
    missingCount: recipe.ingredients.filter(i => !names.includes(i)).length
  })).filter(recipe => recipe.matchCount > 0).sort((a,b) => b.matchCount-a.matchCount).slice(0,3);
  const expiring = items.filter(item => {
    if (!item.expiry) return false;
    const days = (new Date(item.expiry) - new Date()) / 86400000;
    return days >= 0 && days <= 3;
  });

  return (
    <div className="page-content">
      <section className="welcome-banner">
        <div>
          <span className="banner-tag">YOUR SMART KITCHEN</span>
          <h2>Good ingredients.<br/><em>Great possibilities.</em></h2>
          <p>See what you can make with what's already in your fridge.</p>
          <Link to="/recipes" className="button button-light">
            Explore recipes <span>→</span>
          </Link>
        </div>
        <div className="banner-art">
          🥬<span>🍅</span><i>🥑</i>
        </div>
      </section>
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon green">▣</div>
          <div>
            <p>Fridge items</p>
            <strong>{items.length}</strong>
            <small>Ingredients saved</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">♨</div>
          <div>
            <p>Recipes to try</p>
            <strong>{matching.length}</strong>
            <small>Based on your fridge</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pink">♡</div>
          <div>
            <p>Favourites</p>
            <strong>{favourites.length}</strong>
            <small>Saved recipes</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">☷</div>
          <div>
            <p>Shopping items</p>
            <strong>{shopping.filter(x => !x.purchased).length}</strong>
            <small>Still to buy</small>
          </div>
        </div>
      </section>
      <section className="section-heading">
        <div>
          <span className="eyebrow">MADE FOR YOUR FRIDGE</span>
          <h2>Recipes you can make</h2>
          <p>Suggestions based on ingredients you have.</p>
        </div>
        <Link to="/recipes" className="view-all">View all recipes →</Link>
      </section>
      {matching.length ? 
        <div className="recipe-grid">
          {matching.map(recipe => <RecipeCard key={recipe.id} 
                                              recipe={recipe} 
                                              matchCount={recipe.matchCount} 
                                              missingCount={recipe.missingCount}/>)}
        </div> : 
          <div className="empty-state">Add ingredients to your fridge to see recipe ideas.</div>}
      {expiring.length > 0 && <div className="notice">
        <span>⏰</span>
        <div>
          <strong>Use these ingredients soon</strong>
          <p>{expiring.map(x => x.name).join(", ")} {expiring.length === 1 ? "is" : "are"} expiring within 3 days.</p>
        </div>
        <Link to="/fridge">Check fridge →</Link>
      </div>}
    </div>
  );
}
