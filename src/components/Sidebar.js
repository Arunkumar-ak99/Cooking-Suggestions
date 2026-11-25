import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Overview", icon: "⌂", end: true },
  { to: "/fridge", label: "My Fridge", icon: "▣" },
  { to: "/recipes", label: "Find Recipes", icon: "♨" },
  { to: "/favourites", label: "Favourites", icon: "♡" },
  { to: "/shopping", label: "Shopping List", icon: "☷" }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">🥑</div>
        <div>
          <strong>Room<span>mate</span></strong>
          <small>AK'S KITCHEN</small>
        </div>
      </div>
      <p className="nav-caption">WORKSPACE</p>
      <nav>
        {links.map(link => (
          <NavLink key={link.to} to={link.to} end={link.end} 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <span className="nav-icon">
              {link.icon}
            </span>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-tip">
        <span>🌱</span>
        <strong>Waste less, eat better.</strong>
        <p>Make the most of what you already have.</p>
      </div>
      <div className="sidebar-footer">Made for your kitchen <span>♥</span></div>
    </aside>
  );
}
