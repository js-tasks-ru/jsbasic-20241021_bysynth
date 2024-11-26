import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;

  #slides = [];
  #inner = null;
  #prevButton = null;
  #nextButton = null;
  #slidesCount = 0;
  #displayedSlideIndex = 0;

  constructor(slides) {
    this.#slides = slides;
    this.#slidesCount = slides.length - 1;

    this.#render();

    this.#inner = this.elem.querySelector('.carousel__inner');
    this.#prevButton = this.elem.querySelector('.carousel__arrow_left');
    this.#nextButton = this.elem.querySelector('.carousel__arrow_right');

    this.#toggleButtonsVisibility();
  }

  #slideTemplate({name, price, image, id}) {
    return `
      <div class="carousel__slide" data-id="${id}">
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  #template() {
    return `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.#slides.map((slide) => this.#slideTemplate(slide)).join('\n')}
        </div>
      </div>
    `;
  }

  #render() {
    this.elem = createElement(this.#template());
    this.#addEventListeners(this.elem);
  }

  #addEventListeners(elem) {
    elem.addEventListener('click', (event) => {
      if (event.target.closest('.carousel__arrow_left')) {
        this.#prev();
      }

      if (event.target.closest('.carousel__arrow_right')) {
        this.#next();
      }

      if (event.target.closest('.carousel__button')) {
        let id = event.target.closest('.carousel__slide').dataset.id;

        this.elem.dispatchEvent(new CustomEvent('product-add', {
          detail: id,
          bubbles: true
        }));
      }
    });
  }

  #prev() {
    if (this.#displayedSlideIndex !== 0) {
      this.#displayedSlideIndex--;
      this.#move();
      this.#toggleButtonsVisibility();
    }
  }

  #next() {
    if (this.#displayedSlideIndex < this.#slidesCount) {
      this.#displayedSlideIndex++;
      this.#move();
      this.#toggleButtonsVisibility();
    }
  }

  #move() {
    this.#inner.style.transform = `translateX(-${this.#inner.offsetWidth * this.#displayedSlideIndex}px)`;
  }

  #toggleButtonsVisibility() {
    this.#prevButton.style.display = this.#displayedSlideIndex === 0 ? 'none' : '';
    this.#nextButton.style.display = this.#displayedSlideIndex === this.#slidesCount ? 'none' : '';
  }
}
