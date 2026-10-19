// const products = require("./data/products");
// function notImplemented() {
//   throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
// }

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть положительным");
  }
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
function changeQuantity(cart, productId, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть положительным");
  }
  const existing = cart.find((item) => item.id === productId);
  if (!existing) return cart;

  if (quantity > existing.stock) {
    throw new RangeError(`На складе только ${existing.stock} шт.`);
  }

  return cart.map((item) =>
    item.id === productId ? { ...item, quantity } : item,
  );
}
function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function calculateOrderTotal(cart, promoCode = "") {
  const subtotal = calculateCartSubtotal(cart);
  const delivery = subtotal >= 50000 ? 0 : 30000;

  let discount = 0;
  if (promoCode === "SAVE10" && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1);
  }
  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
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
