function initCarousel() {
  const inner = document.querySelector('.carousel__inner');
  const buttons = {
    next: document.querySelector('.carousel__arrow_right'),
    prev: document.querySelector('.carousel__arrow_left')
  };

  const slideWidth = inner.querySelector('.carousel__slide').offsetWidth;
  const slidesCount = inner.querySelectorAll('.carousel__slide').length;

  const minInnerPosition = 0;
  const maxInnerPosition = slideWidth * slidesCount - slideWidth;

  let innerPosition = 0;
  let displayedSlideIndex = 1;

  toggleButtonsVisibility(buttons, displayedSlideIndex, slidesCount);

  buttons.next.addEventListener('click', () => {
    innerPosition = Math.min(innerPosition + slideWidth, maxInnerPosition);
    displayedSlideIndex++;
    move(inner, innerPosition);
    toggleButtonsVisibility(buttons, displayedSlideIndex, slidesCount);
  });

  buttons.prev.addEventListener('click', () => {
    innerPosition = Math.max(innerPosition - slideWidth, minInnerPosition);
    displayedSlideIndex--;
    move(inner, innerPosition);
    toggleButtonsVisibility(buttons, displayedSlideIndex, slidesCount);
  });
}

function move(elem, position) {
  elem.style.transform = `translateX(-${position}px)`;
}

function toggleButtonsVisibility({prev, next}, index, count) {
  const firstSlideIndex = 1;

  next.style.display = index === count ? 'none' : '';
  prev.style.display = index === firstSlideIndex ? 'none' : '';
}
