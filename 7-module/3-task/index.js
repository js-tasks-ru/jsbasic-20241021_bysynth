import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;

  #steps;
  #value;
  #segments;
  #sliderThumb;
  #sliderValue;
  #sliderProgress;
  #sliderSteps;

  constructor({steps, value = 0}) {
    this.#steps = steps;
    this.#segments = steps - 1;

    this.#render();

    this.#sliderValue = this.elem.querySelector('.slider__value');
    this.#sliderThumb = this.elem.querySelector('.slider__thumb');
    this.#sliderProgress = this.elem.querySelector('.slider__progress');
    this.#sliderSteps = this.elem.querySelector('.slider__steps');

    this.#setValue(value);
    this.#addEventListeners();
  }

  #template() {
    return `
      <div class="slider">
      <div class="slider__thumb">
        <span class="slider__value"></span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
        ${this.#stepsTemplate()}
      </div>
    </div>
    `;
  }

  #stepsTemplate() {
    let spans = [];

    for (let i = 0; i < this.#steps; i++) {
      spans.push(`<span></span>`);
    }

    return spans.join('\n');
  }

  #render() {
    this.elem = createElement(this.#template());
  }

  #setValue(value) {
    this.#value = value;
    let percents = value / this.#segments * 100;

    this.#sliderValue.textContent = value;
    this.#sliderThumb.style.left = `${percents}%`;
    this.#sliderProgress.style.width = `${percents}%`;

    this.#setActiveStep(value);
  }

  #setActiveStep(value) {
    this.#sliderSteps.querySelector('.slider__step-active')?.classList.remove('slider__step-active');
    this.#sliderSteps.children[value].classList.add('slider__step-active');
  }

  #calculateValueFromClick(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * this.#segments;

    return Math.round(approximateValue);
  }

  #addEventListeners() {
    this.elem.addEventListener('click', (event) => {
      this.#setValue(this.#calculateValueFromClick(event));

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.#value,
        bubbles: true
      }));
    });
  }
}
