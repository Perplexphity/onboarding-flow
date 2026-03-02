const screens = Array.from(document.querySelectorAll('.screen'));
const dots = Array.from(document.querySelectorAll('.dot'));
const nextButtons = Array.from(document.querySelectorAll('[data-next]'));
const chips = Array.from(document.querySelectorAll('.chip'));

let currentIndex = 0;

function setScreen(index) {
  screens.forEach((screen, i) => {
    screen.classList.toggle('is-active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('is-active', i === index);
  });

  currentIndex = index;
}

nextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextIndex = Math.min(currentIndex + 1, screens.length - 1);
    if (nextIndex !== currentIndex) {
      setScreen(nextIndex);
    }
  });
});

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chip.classList.toggle('is-selected');
  });
});

setScreen(0);