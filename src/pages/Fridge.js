import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addIngredient,
  deleteIngredient,
  setFridgeCategory,
  setFridgeSearch,
  updateIngredient
} from "../features/fridge/fridgeSlice";

const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Dairy & Eggs",
  "Meat",
  "Grains",
  "Other"
];

const blank = {
  name: "",
  category: "Vegetables",
  quantity: "1",
  expiry: "",
  image: ""
};

async function getIngredientImage(name) {
  try {
    const params = new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: `${name} food`,
      gsrnamespace: "6",
      gsrlimit: "5",
      prop: "imageinfo",
      iiprop: "url",
      iiurlwidth: "300",
      format: "json",
      origin: "*"
    });

    const response = await fetch(
      `https://commons.wikimedia.org/w/api.php?${params}`
    );

    if (!response.ok) {
      throw new Error("Image search failed");
    }

    const data = await response.json();

    const pages = Object.values(data.query?.pages || {});

    return pages[0]?.imageinfo?.[0]?.thumburl || "";

  } catch (error) {
    console.log("Image Error:", error);
    return "";
  }
}

export default function Fridge() {

  const dispatch = useDispatch();
  const { items, search, category } = useSelector(
    state => state.fridge
  );
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const filtered = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category)
    );
  }, [items, search, category]);

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    try {
      let image = form.image.trim();
      if (!image) {
        image = await getIngredientImage(form.name.trim());
      }
      const ingredient = {
        ...form,
        name: form.name.trim(),
        image
      };
      if (editingId) {
        dispatch(updateIngredient({
          ...ingredient,
          id: editingId
        }));
      }
      else {
        dispatch(addIngredient(ingredient));
      }

      setForm(blank);
      setEditingId(null);
      setShowForm(false);
    } finally {
      setLoading(false);
    }
  }
  function edit(item) {
    setForm({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      expiry: item.expiry || "",
      image: item.image || ""
    });
    setEditingId(item.id);
    setShowForm(true);
  }
  const categoryEmoji = {
    Vegetables: "🥦",
    Fruits: "🍎",
    "Dairy & Eggs": "🥚",
    Meat: "🍗",
    Grains: "🌾",
    Other: "🥫"
  };
  return (
    <div className="page-content">
      <div className="page-toolbar">
        <div>
          <h2>Your ingredients</h2>
          <p>{items.length} items stored in your fridge</p>
        </div>
        <button
          className="button button-primary"
          onClick={() => {
            setForm(blank);
            setEditingId(null);
            setShowForm(!showForm);
          }}
       >
          {showForm ? "Close form" : "+ Add ingredient"}
        </button>
      </div>
      {showForm && (
        <form
          className="ingredient-form"
          onSubmit={submit}
        >
          <div className="form-title">
            <div>
              <h3>
                {editingId ? "Edit ingredient" : "Add to your fridge"}
              </h3>
              <p>Enter a few details about your ingredient.</p>
            </div>
            <span>🥑</span>
          </div>
          <div className="form-grid">
            <label>
              Ingredient name
              <input
                value={form.name}
                onChange={e =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
                placeholder="e.g. Tomato"
                required
              />
            </label>
            <label>
              Category
              <select
                value={form.category}
                onChange={e =>
                  setForm({
                    ...form,
                    category: e.target.value
                  })
                }
              >
                {categories.slice(1).map(c => (

                  <option key={c}>{c}</option>

                ))}
              </select>
            </label>
            <label>
              Quantity
              <input
                value={form.quantity}
                onChange={e =>
                  setForm({
                    ...form,
                    quantity: e.target.value
                  })
                }
                placeholder="e.g. 4 pcs"
              />
            </label>
            <label>
              Expiry date
              <input
                type="date"
                value={form.expiry}
                onChange={e =>
                  setForm({
                    ...form,
                    expiry: e.target.value
                  })
                }
              />
            </label>
            <label className="full-field">
              Image URL (optional)
              <input
                value={form.image}
                onChange={e =>
                  setForm({
                    ...form,
                    image: e.target.value
                  })
                }
                placeholder="Paste an image URL or leave empty for automatic search"
              />
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="button button-outline"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setForm(blank);
              }}
            >
              Cancel
            </button>
            <button
              className="button button-primary"
              disabled={loading}
            >
              {loading
                ? "Searching image..."
                : editingId
                 ? "Save changes"
                  : "Add ingredient"
              }
            </button>
          </div>
        </form>
      )}

      <div className="filter-row">
        <input
          className="search-input"
          placeholder="⌕  Search ingredients..."
          value={search}
          onChange={e =>
            dispatch(setFridgeSearch(e.target.value))
          }
        />
        <select
          value={category}
          onChange={e =>
            dispatch(setFridgeCategory(e.target.value))
          }
        >
          {categories.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>


      {filtered.length ? (
        <div className="ingredient-grid">
          {filtered.map(item => {
            const days = item.expiry
              ? Math.ceil(
                  (new Date(item.expiry) - new Date()) / 86400000
                )
              : null;
            return (
              <article
                className="ingredient-card"
                key={item.id}
              >

                <div className="ingredient-visual">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={e => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span>
                      {categoryEmoji[item.category] || "🥫"}
                    </span>
                  )}
                </div>


                <div className="ingredient-info">
                  <span className="category-label">
                    {item.category}
                  </span>
                  <h3>{item.name}</h3>
                  <p>
                    {item.quantity || "Quantity not set"}
                  </p>
                  {item.expiry && (
                    <small
                      className={
                        days <= 3
                          ? "expiry soon"
                          : "expiry"
                      }
                    >
                      {days < 0
                        ? "Expired"
                        : days === 0
                          ? "Expires today"
                          : `Expires in ${days} day(s)`
                      }
                    </small>
                  )}
                </div>
               <div className="ingredient-actions">
                  <button onClick={() => edit(item)}>
                    Edit
                  </button>
                  <button className="delete-action" onClick={() => dispatch(deleteIngredient(item.id))}>
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          No ingredients found. Try another search or add an ingredient.
        </div>
      )}
    </div>
  );
}