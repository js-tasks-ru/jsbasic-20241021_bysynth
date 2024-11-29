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

    this.#setInitialValue(value);
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

  #setInitialValue(value) {
    this.#value = value;
    let percents = value / this.#segments * 100;

    this.#renderSliderInners(value, percents);
    this.#setActiveStep(value);
  }

  #setValueByEvent({value, percents}) {
    this.#value = value;

    this.#renderSliderInners(value, percents);
    this.#setActiveStep(value);
  }

  #renderSliderInners(value, percents) {
    this.#sliderValue.textContent = value;
    this.#sliderThumb.style.left = `${percents}%`;
    this.#sliderProgress.style.width = `${percents}%`;
  }

  #setActiveStep(value) {
    this.#sliderSteps.querySelector('.slider__step-active')?.classList.remove('slider__step-active');
    this.#sliderSteps.children[value].classList.add('slider__step-active');
  }

  #getLeftRelative(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    return left / this.elem.offsetWidth;
  }

  #calculateValueFromClick(event) {
    let value = Math.round(this.#getLeftRelative(event) * this.#segments);
    let percents = value / this.#segments * 100;

    return {
      value,
      percents
    };
  }

  #calculateValueFromPointerMove(event) {
    let leftRelative = this.#getLeftRelative(event);

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let value = Math.round(leftRelative * this.#segments);
    let percents = leftRelative * 100;

    return {
      value,
      percents
    };
  }

  #sliderChangeDispatchEvent() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: Math.abs(this.#value),
      bubbles: true
    }));
  }

  #addEventListeners() {
    this.elem.addEventListener('click', this.#onClick);

    this.#sliderThumb.addEventListener('dragstart', (event) => event.preventDefault());
    this.#sliderThumb.addEventListener('pointerdown', this.#onPointerDown);
  }

  #onClick = (event) => {
    this.#setValueByEvent(this.#calculateValueFromClick(event));
    this.#sliderChangeDispatchEvent();
  };

  #onPointerDown = (event) => {
    event.preventDefault();

    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.#onPointerMove);
    document.addEventListener('pointerup', this.#onPointerUp, {once: true});
  };

  #onPointerMove = (event) => {
    event.preventDefault();

    this.#setValueByEvent(this.#calculateValueFromPointerMove(event));
  };

  #onPointerUp = () => {
    this.elem.classList.remove('slider_dragging');
    this.#sliderChangeDispatchEvent();

    document.removeEventListener('pointermove', this.#onPointerMove);
  };
}
