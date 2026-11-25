import { createSlice, nanoid } from "@reduxjs/toolkit";

const shoppingSlice = createSlice({
  name: "shopping",
  initialState: { items: [] },
  reducers: {
    addShoppingItem: {
      reducer(state, action) {
        const exists = state.items.some(
          item => item.name.toLowerCase() === action.payload.name.toLowerCase()
        );
        if (!exists) state.items.push(action.payload);
      },
      prepare(name) {
        return { payload: { id: nanoid(), name, purchased: false } };
      }
    },
    togglePurchased(state, action) {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.purchased = !item.purchased;
    },
    deleteShoppingItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearPurchased(state) {
      state.items = state.items.filter(item => !item.purchased);
    }
  }
});

export const {
  addShoppingItem, togglePurchased, deleteShoppingItem, clearPurchased
} = shoppingSlice.actions;
export default shoppingSlice.reducer;
