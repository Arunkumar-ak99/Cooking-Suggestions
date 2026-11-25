import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShoppingItem, clearPurchased, deleteShoppingItem, togglePurchased } from "../features/shopping/shoppingSlice";

export default function Shopping() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.shopping.items);
  const [name, setName] = useState("");
  const pending = items.filter(item => !item.purchased);
  const purchased = items.filter(item => item.purchased);
  function submit(e) { e.preventDefault(); if (name.trim()) { dispatch(addShoppingItem(name.trim())); setName(""); } }

  return <div className="page-content">
    <div className="page-toolbar">
      <div>
        <h2>Your shopping list</h2>
        <p>Keep track of the ingredients you need.</p>
      </div>
      <span className="recipe-count">{pending.length} to buy</span>
    </div>
    <form className="shopping-add" onSubmit={submit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Add an item, e.g. Milk..." />
      <button className="button button-primary">
        + Add item
      </button>
    </form>
    <div className="shopping-panel">
      <div className="shopping-panel-title">
        <div>
          <h3>To buy</h3>
          <p>{pending.length} items remaining</p>
        </div>
        <span>🛒</span>
      </div>
      {pending.length ? pending.map(item => 
      <div className="shopping-row" key={item.id}>
        <button className="round-check" 
          onClick={() => dispatch(togglePurchased(item.id))}>
        </button>
        <span>{item.name}</span>
        <button className="remove-item"
         onClick={() => dispatch(deleteShoppingItem(item.id))}>
          ×
        </button>
      </div>)
       :
      <div className="small-empty">
        Your shopping list is clear. Nice work!
      </div>}
    </div>
    {purchased.length > 0 && 
      <div className="shopping-panel purchased-panel"> 
        <div className="shopping-panel-title">
          <div>
            <h3>Purchased</h3>
            <p>{purchased.length} completed</p>
          </div>
          <button className="clear-button"
           onClick={() => dispatch(clearPurchased())}>
            Clear purchased
          </button>
        </div>
      {purchased.map(item => 
        <div className="shopping-row done" key={item.id}>
          <button className="round-check checked"
             onClick={() => dispatch(togglePurchased(item.id))}>
              ✓
          </button>
          <span>{item.name}</span>
          <button className="remove-item"
           onClick={() => dispatch(deleteShoppingItem(item.id))}>
            ×
          </button>
        </div>
      )
    }
    </div>}
  </div>;
}
