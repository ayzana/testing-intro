//const products = require("./data/products");
function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, quantity) {
  const existing = cart.find((item) => item.id === product.id);
  const currentQty = existing ? existing.quantity : 0;

  if (currentQty + quantity > product.stock) {
    throw new RangeError(`На складе только ${product.stock} шт.`);
  }

  if (existing) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
  }

  return [...cart, { ...product, quantity }];
}
function changeQuantity() {
  return notImplemented();
}
function removeFromCart() {
  return notImplemented();
}
function calculateCartSubtotal() {
  return notImplemented();
}
function calculateOrderTotal() {
  return notImplemented();
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
