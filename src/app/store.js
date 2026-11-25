import { configureStore } from "@reduxjs/toolkit";
import fridgeReducer from "../features/fridge/fridgeSlice";
import favouriteReducer from "../features/favourites/favouriteSlice";
import shoppingReducer from "../features/shopping/shoppingSlice";

const STORAGE_KEY = "whatsInMyFridgeState";

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    fridge: fridgeReducer,
    favourites: favouriteReducer,
    shopping: shoppingReducer
  },
  preloadedState: loadState()
});

store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
  } catch (error) {
    console.warn("Could not save app data:", error);
  }
});
