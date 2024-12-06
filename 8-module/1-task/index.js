import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  #initialTopCoord = null;

  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.#initialTopCoord) {
      this.#initialTopCoord = this.elem.getBoundingClientRect().top + window.scrollY;
    }

    if (this.#isCartVisible() && !this.#isMobile() && this.#isScrolled()) {
      this.#pinCart();
    } else {
      this.#unpinCart();
    }
  }

  #isCartVisible() {
    return this.elem.offsetWidth > 0;
  }

  #isMobile() {
    return document.documentElement.clientWidth <= 767;
  }

  #isScrolled() {
    return window.scrollY > this.#initialTopCoord;
  }

  #pinCart() {
    let leftIndent = Math.min(
      document.querySelector('.container').getBoundingClientRect().right + 20,
      document.documentElement.clientWidth - this.elem.offsetWidth - 10
    ) + 'px';

    Object.assign(this.elem.style, {
      position: 'fixed',
      top: '50px',
      left: leftIndent,
      right: '10px',
      zIndex: 1e3
    });
  }

  #unpinCart() {
    Object.assign(this.elem.style, {
      position: '',
      top: '',
      left: '',
      right: '',
      zIndex: ''
    });
  }
}
