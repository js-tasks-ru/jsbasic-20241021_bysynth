function highlight(table) {
  const NAME = 0;
  const AGE = 1;
  const GENDER = 2;
  const STATUS = 3;

  for (const row of table.rows) {
    if (row.cells[STATUS].dataset.available === 'true') {
      row.classList.add('available');
    }

    if (row.cells[STATUS].dataset.available === 'false') {
      row.classList.add('unavailable');
    }

    if (!row.cells[STATUS].dataset.available) {
      row.hidden = true;
    }

    if (row.cells[GENDER].textContent === 'm') {
      row.classList.add('male');
    }

    if (row.cells[GENDER].textContent === 'f') {
      row.classList.add('female');
    }

    if (parseInt(row.cells[AGE].textContent) < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
