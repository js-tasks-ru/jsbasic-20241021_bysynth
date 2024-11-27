import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;
  #categories = [];

  #ribbonInner = null;
  #leftButton = null;
  #rightButton = null;

  #step = 350;

  constructor(categories) {
    this.#categories = categories;
    this.#render();

    this.#ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.#leftButton = this.elem.querySelector('.ribbon__arrow_left');
    this.#rightButton = this.elem.querySelector('.ribbon__arrow_right');

    this.#addEventListeners();
    this.#setFirstCategoryAsActive();
  }

  #template() {
    return `
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${this.#categories.map((category) => this.#linkTemplate(category)).join('\n')}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `;
  }

  #linkTemplate({id, name}) {
    return `
      <a href="#" class="ribbon__item" data-id="${id}">${name}</a>
    `;
  }

  #render() {
    this.elem = createElement(this.#template());
  }

  #addEventListeners() {
    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.ribbon__arrow_left')) {
        this.#moveLeft();
      }

      if (event.target.closest('.ribbon__arrow_right')) {
        this.#moveRight();
      }

      if (event.target.closest('.ribbon__item')) {
        event.preventDefault();

        let categoryLink = event.target.closest('.ribbon__item');
        this.#setCategoryLinkAsActive(categoryLink);

        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: categoryLink.dataset.id,
          bubbles: true
        }));
      }
    });

    this.#ribbonInner.addEventListener('scroll', this.#toggleButtonsVisibility);
  }

  #moveRight() {
    this.#ribbonInner.scrollBy(this.#step, 0);
  }

  #moveLeft() {
    this.#ribbonInner.scrollBy(-this.#step, 0);
  }

  #scrollLeft() {
    return this.#ribbonInner.scrollLeft;
  }

  #scrollRight() {
    let scrollLeft = this.#scrollLeft();
    let scrollWidth = this.#ribbonInner.scrollWidth;
    let clientWidth = this.#ribbonInner.clientWidth;

    return scrollWidth - scrollLeft - clientWidth;
  }

  #toggleButtonsVisibility = () => {
    this.#scrollLeft() === 0
      ? this.#leftButton.classList.remove('ribbon__arrow_visible')
      : this.#leftButton.classList.add('ribbon__arrow_visible');

    this.#scrollRight() < 1
      ? this.#rightButton.classList.remove('ribbon__arrow_visible')
      : this.#rightButton.classList.add('ribbon__arrow_visible');
  };

  #setFirstCategoryAsActive() {
    this.#ribbonInner.querySelector('.ribbon__item').classList.add('ribbon__item_active');
  }

  #setCategoryLinkAsActive(link) {
    let categoryLinks = this.#ribbonInner.querySelectorAll('.ribbon__item');

    categoryLinks.forEach(categoryLink => {
      if (categoryLink.classList.contains('ribbon__item_active')) {
        categoryLink.classList.remove('ribbon__item_active');
      }
    });

    link.classList.add('ribbon__item_active');
  }
}
