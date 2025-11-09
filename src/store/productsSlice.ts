import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  id: string;
  title: string;
  description: string;
  category?: string;
  liked?: boolean;
  created?: boolean;
  image?: string;
};

const initialState = {
  items: [] as Product[],
  loaded: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
      state.loaded = true;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    toggleLike(state, action: PayloadAction<string>) {
      const p = state.items.find((x) => x.id === action.payload);
      if (p) p.liked = !p.liked;
    },
  },
});

export const { setProducts, addProduct, removeProduct, toggleLike } =
  productsSlice.actions;
export default productsSlice.reducer;
export type { Product };
