import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    value: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.value = [];
      state.loading = false;
    });
  },
});

export default categoriesSlice.reducer;
