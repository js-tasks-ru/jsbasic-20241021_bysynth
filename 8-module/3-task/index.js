export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product) {
      let cartItem = this.cartItems.find((item) => item.product.id === product.id);

      if (cartItem) {
        this.updateProductCount(cartItem.product.id, 1);
      } else {
        cartItem = {
          product: product,
          count: 1
        };

        this.cartItems.push(cartItem);
      }

      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((item) => item.product.id === productId);
    cartItem.count += amount;

    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, cartItem) => total + cartItem.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, cartItem) => total + cartItem.product.price * cartItem.count, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}

