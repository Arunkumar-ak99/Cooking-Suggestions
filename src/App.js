import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Fridge from "./pages/Fridge";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import Favourites from "./pages/Favourites";
import Shopping from "./pages/Shopping";

export default function App() {
  return <div className="app-shell">
    <Sidebar />
    <main className="main-area">
      <Topbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fridge" element={<Fridge />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/shopping" element={<Shopping />} />
      </Routes>
      <footer className="app-footer">Roommate <span>·</span> Make every ingredient count.</footer>
    </main>
  </div>;
}
