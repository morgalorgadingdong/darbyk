import { writable } from 'svelte/store';
import { BROWSER } from 'esm-env';

let initialCart = []
// Check if cart data exists in local storage
if (BROWSER) {
  const storedCart = localStorage.getItem('cart');
  initialCart = storedCart ? JSON.parse(storedCart) : [];
}


// Create a writable Svelte store
export const cart = writable(initialCart);

// Subscribe to changes in the cart store and update local storage
if (BROWSER) {
  cart.subscribe(value => {
    localStorage.setItem('cart', JSON.stringify(value));
  });
}




















// TS Version
// interface CartItem {
//   id: string;
//   quantity: number;
// }

// let stored = [];

// if (BROWSER) {
//   // Get the value out of storage on load.
//   stored = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
// }

// // Parse the stored value or set a default empty array.
// export const cart = writable<CartItem[]>(stored);

// // Anytime the store changes, update the local storage value.
// if (BROWSER) {
//   cart.subscribe((value) => localStorage.setItem('cart', JSON.stringify(value)));
// }