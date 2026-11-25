import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: { ids: [] },
  reducers: {
    toggleFavourite(state, action) {
      const id = action.payload;
      state.ids = state.ids.includes(id)
        ? state.ids.filter(item => item !== id)
        : [...state.ids, id];
    }
  }
});

export const { toggleFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
