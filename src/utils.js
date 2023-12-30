// export function getItemsCount(cartItems) {
//   return cartItems.reduce((count, cartItem) => cartItem.quantity + count, 0);
// }

export function getItemsCount(cartItems) {
  return cartItems.reduce((count, cartItem) => count + 1, 0);
}

export function getSubTotal(cartData) {
  return cartData.reduce(
    (sum, { product, quantity }) => product.price * quantity + sum,
    0
  );
}
