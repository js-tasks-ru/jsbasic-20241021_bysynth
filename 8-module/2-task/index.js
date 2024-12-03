import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = null;

  #products = [];
  #filters = {};

  #inner;

  constructor(products) {
    this.#products = products;
    this.#renderGrid();

    this.#inner = this.elem.querySelector('.products-grid__inner');

    this.#renderProducts(this.#products);
  }

  updateFilter(filters) {
    Object.assign(this.#filters, filters);
    this.#renderProducts(this.#filterProducts());
  }

  #filterProducts() {
    let filteredProducts = this.#products;

    for (const filter in this.#filters) {
      if (filter === 'noNuts') {
        this.#filters[filter]
          ? filteredProducts = filteredProducts.filter((product) => !product.nuts)
          : filteredProducts;
      }

      if (filter === 'vegeterianOnly') {
        this.#filters[filter]
          ? filteredProducts = filteredProducts.filter((product) => product.vegeterian)
          : filteredProducts;
      }

      if (filter === 'maxSpiciness') {
        this.#filters[filter] < 4
          ? filteredProducts = filteredProducts.filter((product) => this.#filters[filter] >= product.spiciness)
          : filteredProducts;
      }

      if (filter === 'category') {
        this.#filters[filter] !== ''
          ? filteredProducts = filteredProducts.filter((product) => this.#filters[filter] === product.category)
          : filteredProducts;
      }
    }

    return filteredProducts;
  }

  #templateGrid() {
    return `
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `;
  }

  #renderGrid() {
    this.elem = createElement(this.#templateGrid());
  }

  #renderProducts(products) {
    this.#inner.innerHTML = '';

    let cards = products.map((product) => {
      return new ProductCard(product).elem;
    });

    this.#inner.append(...cards);
  }
}
