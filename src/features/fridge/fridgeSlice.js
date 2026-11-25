import { createSlice, nanoid } from "@reduxjs/toolkit";

const fridgeSlice = createSlice({
  name: "fridge",

  initialState: {
    items: [
      {
        id: "sample-1",
        name: "Tomato",
        category: "Vegetables",
        quantity: "4 pcs",
        expiry: "",
        image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300"
      },
      {
        id: "sample-2",
        name: "Egg",
        category: "Dairy & Eggs",
        quantity: "6 pcs",
        expiry: "",
        image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=300"
      },
      {
        id: "sample-3",
        name: "Onion",
        category: "Vegetables",
        quantity: "3 pcs",
        expiry: "",
        image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=300"
      },
      {
        id: "sample-4",
        name: "Potato",
        category: "Vegetables",
        quantity: "5 pcs",
        expiry: "",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300"
      }
    ],

    search: "",
    category: "All"
  },

  reducers: {
   addIngredient: {
  reducer(state, action) {
    state.items.push(action.payload);
  },

  prepare(item) {
    const images = {
      tomato: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300",
      egg: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=300",
      onion: "https://images.unsplash.com/photo-1508747703725-719777637510?w=300",
      potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300"
    };

    const image =
      item.image ||
      images[item.name.trim().toLowerCase()] ||
      "";

    return {
      payload: {
        id: nanoid(),
        ...item,
        image: image
      }
    };
  }
},
    updateIngredient(state, action) {
      const index = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    deleteIngredient(state, action) {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },

    setFridgeSearch(state, action) {
      state.search = action.payload;
    },

    setFridgeCategory(state, action) {
      state.category = action.payload;
    }
  }
});

export const {
  addIngredient,
  updateIngredient,
  deleteIngredient,
  setFridgeSearch,
  setFridgeCategory
} = fridgeSlice.actions;

export default fridgeSlice.reducer;