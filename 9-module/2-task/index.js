import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

import ProductGrid from '../../8-module/2-task/index.js';

export default class Main {
  #carousel;
  #ribbonMenu;
  #stepSlider;
  #cartIcon;
  #cart;
  #productsGrid;
  #products = [];

  #initialConfig = {
    stepSlider: {
      steps: 5,
      value: 3
    },
    category: ''
  };

  #nutsCheckbox;
  #vegeterianCheckbox;

  constructor() {
    this.#nutsCheckbox = document.getElementById('nuts-checkbox');
    this.#vegeterianCheckbox = document.getElementById('vegeterian-checkbox');
  }

  async render() {
    this.#createCarousel();
    this.#createRibbonMenu();
    this.#createStepSlider();
    this.#createCartIcon();
    this.#createCart();
    await this.#createProductsGrid();

    this.#productsGrid.updateFilter({
      noNuts: this.#nutsCheckbox.checked,
      vegeterianOnly: this.#vegeterianCheckbox.checked,
      maxSpiciness: this.#initialConfig.stepSlider.value,
      category: this.#initialConfig.category
    });

    this.#addEventListeners();
  }

  #createCarousel() {
    this.#carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(this.#carousel.elem);
  }

  #createRibbonMenu() {
    this.#ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.#ribbonMenu.elem);
  }

  #createStepSlider() {
    this.#stepSlider = new StepSlider({
      steps: this.#initialConfig.stepSlider.steps,
      value: this.#initialConfig.stepSlider.value
    });
    document.querySelector('[data-slider-holder]').append(this.#stepSlider.elem);
  }

  #createCartIcon() {
    this.#cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.#cartIcon.elem);
  }

  #createCart() {
    this.#cart = new Cart(this.#cartIcon);
  }

  async #createProductsGrid() {
    const productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = '';

    try {
      let response = await fetch('products.json');
      this.#products = await response.json();
    } catch {
      throw new Error('Can\'t get products!');
    }

    this.#productsGrid = new ProductGrid(this.#products);
    productsGridHolder.append(this.#productsGrid.elem);
  }

  #addEventListeners() {
    document.body.addEventListener('product-add', ({detail: productId}) => {
      let product = this.#products.find((product) => product.id === productId);
      this.#cart.addProduct(product);
    });

    document.body.addEventListener('slider-change', ({detail: value}) => {
      this.#productsGrid.updateFilter({
        maxSpiciness: value
      });
    });

    document.body.addEventListener('ribbon-select', ({detail: categoryId}) => {
      this.#productsGrid.updateFilter({
        category: categoryId
      });
    });

    this.#nutsCheckbox.addEventListener('change', (event) => {
      this.#productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    });

    this.#vegeterianCheckbox.addEventListener('change', (event) => {
      this.#productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    });
  }
}
