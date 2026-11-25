import { useLocation } from "react-router-dom";

const titles = {
  "/": ["Good food starts here", "Your kitchen at a glance."],
  "/fridge": ["My Fridge", "Keep track of what you have."],
  "/recipes": ["Find Recipes", "Discover meals from your ingredients."],
  "/favourites": ["Your Favourites", "Recipes you want to make again."],
  "/shopping": ["Shopping List", "Only buy what you really need."]
};

export default function Topbar() {
  const location = useLocation();
  const title = titles[location.pathname] || titles["/"];
  return (
    <header className="topbar">
      <div>
        <div className="eyebrow">MONDAY · YOUR KITCHEN COMPANION</div>
        <h1>{title[0]}</h1>
        <p>{title[1]}</p>
      </div>
      <div className="profile-chip">
        <div className="avatar">
          👨🏻‍🍳
        </div>
        <div>
          <strong>Chef Raji</strong>
          <small>My kitchen</small>
        </div>
      </div>
    </header>
  );
}
