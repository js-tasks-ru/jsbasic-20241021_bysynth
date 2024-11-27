import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #modal = null;
  #modalTitle = null;
  #modalBody = null;
  #modalCloseButton = null;

  constructor() {
    this.#render();

    this.#modalTitle = this.#modal.querySelector('.modal__title');
    this.#modalBody = this.#modal.querySelector('.modal__body');
    this.#modalCloseButton = this.#modal.querySelector('.modal__close');

    this.#addEventListeners();
  }

  setTitle(title) {
    this.#modalTitle.textContent = title;
  }

  setBody(body) {
    this.#modalBody.append(body);
  }

  open() {
    document.body.append(this.#modal);
    document.body.classList.add('is-modal-open');
  }

  close() {
    this.#modal.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.#closeModalOnKeydownHandler);
  }

  #template() {
    return `
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `;
  }

  #render() {
    this.#modal = createElement(this.#template());
  }

  #addEventListeners() {
    this.#modal.addEventListener('click', (event) => {
      if (event.target.closest('.modal__close')) {
        this.close();
      }
    });

    document.addEventListener('keydown', this.#closeModalOnKeydownHandler);
  }

  #closeModalOnKeydownHandler = event => {
    if (event.code === 'Escape' && document.body.classList.contains('is-modal-open')) {
      this.close();
    }
  };
}
