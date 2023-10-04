import create from "zustand";
import { productData } from "./data";
import { getServerJwt, getServerCart } from "./logic";

export const useStore = create((set) => ({
  // User
  loggedIn: false,
  username: "",
  jwt: "",
  login: async (username, password) => {
    const token = await getServerJwt(username, password);
    const cartData = await getServerCart(token);
    console.log("cartData:", cartData);
    set(() => ({ username: username }));
    set(() => ({ loggedIn: true }));
    set(() => ({ jwt: token }));
    set(() => ({ cart: { items: cartData.cartItems, lastUpdated: 0 } }));
  },
  logout: () => {
    set(() => ({ username: "" }));
    set(() => ({ password: "" }));
    set(() => ({ loggedIn: false }));
    set(() => ({ jwt: "" }));
    set(() => ({ cart: { items: [], lastUpdated: Date.now() } }));
  },
  // Cart
  cart: JSON.parse(localStorage.getItem("cart")) || {
    items: [],
    lastUpdated: Date.now(),
  },
  addToCart: (product) => {
    // set((state) => ({ cart: [...state.cart, product] }));
    set((state) => ({
      cart: { items: [...state.cart.items, product], lastUpdated: Date.now() },
    }));

    let arrContainer = {
      items: [],
      lastUpdated: Date.now(),
    };

    if (localStorage.getItem("cart")) {
      arrContainer = JSON.parse(localStorage.getItem("cart"));
      arrContainer.items.push(product);
    } else {
      arrContainer.items = [product];
    }

    arrContainer.lastUpdated = Date.now();

    localStorage.setItem("cart", JSON.stringify(arrContainer));
  },
  clearCart: () => {
    set(() => ({ cart: { items: [], lastUpdated: Date.now() } }));
    localStorage.setItem(
      "cart",
      JSON.stringify({ items: [], lastUpdated: Date.now() })
    );
  },
  refreshCart: async (jwt) => {
    const cartData = await getServerCart(jwt);

    set(() => ({
      cart: { items: cartData.cartItems, lastUpdated: Date.now() },
    }));
  },
  // Products
  products: productData,
}));
