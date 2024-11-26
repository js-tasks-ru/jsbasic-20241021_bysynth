/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  #rows = [];

  constructor(rows) {
    this.#rows = rows || this.#rows;
    this.#render();
  }

  #template() {
    let tableElement = document.createElement('table');
    let tableRows = this.#rows
      .map(({name, age, salary, city}) => {
        return `
          <tr>
            <td>${name}</td>
            <td>${age}</td>
            <td>${salary}</td>
            <td>${city}</td>
            <td><button>X</button></td>
          </tr>
        `;
      })
      .join('\n');

    tableElement.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
          ${tableRows}
      </tbody>
    `;

    return tableElement;
  }

  #onButtonClick(event) {
    if (event.target.tagName === 'BUTTON') {
      event.target.closest('tr').remove();
    }
  }

  #render() {
    this.elem = this.#template();
    this.elem.addEventListener('click', this.#onButtonClick);
  }
}
