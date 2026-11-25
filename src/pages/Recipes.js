import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { recipes } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
  const items = useSelector(state => state.fridge.items);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filter, setFilter] = useState("All");
  const available = items.map(item => item.name.trim().toLowerCase());

  const list = useMemo(() => recipes.map(recipe => {
    const matched = recipe.ingredients.filter(name => available.includes(name.toLowerCase())).length;
    const missing = recipe.ingredients.length - matched;
    return { ...recipe, 
            matchCount: matched, 
            missingCount: missing, 
            matchPercent: Math.round(matched / recipe.ingredients.length * 100) };
  }).filter(recipe =>
    recipe.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || recipe.category === category) &&
    (filter === "All" || (filter === "Can make" ? recipe.missingCount === 0 : recipe.matchCount > 0))
  ).sort((a,b) => b.matchCount - a.matchCount), [available.join("|"), search, category, filter]);

  return   <div className="page-content">
    <div className="page-toolbar">
      <div>
        <h2>What can you cook today?</h2>
        <p>Recipes ranked by how many ingredients you already have.</p>
      </div>
      <div className="recipe-count">{list.length} recipes</div>
    </div>
    <div className="recipe-controls">
      <input className="search-input" placeholder="⌕  Search recipes..."
        value={search}
        onChange={e => setSearch(e.target.value)}/>
      <select value={category} 
        onChange={e => setCategory(e.target.value)}>
          {["All","Breakfast","Lunch","Dinner","Snack","Drinks"]
          .map(x => <option key={x}>{x}</option>)}
      </select>
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option>All</option><option>Can make</option>
        <option>Has matches</option>
      </select>
    </div>
    {list.length ? 
      <div className="recipe-grid">
        {list.map(recipe =>
           <RecipeCard key={recipe.id} 
                       recipe={recipe}
                      matchCount={recipe.matchCount} 
                      missingCount={recipe.missingCount}
          />
          )
          }
          </div> : <div className="empty-state">
            No recipes match these filters. Try changing your search.
          </div>
          }
  </div>;
}
