/* app.js — Onboarding flow controller */

(function () {
  'use strict';

  const screens = document.querySelectorAll('.screen');
  const dots = document.querySelectorAll('.progress__dot');
  const chips = document.querySelectorAll('.chip');
  let currentScreen = 0;
  let isTransitioning = false;

  function goToScreen(index) {
    if (index < 0 || index >= screens.length || isTransitioning) return;
    if (index === currentScreen) return;

    isTransitioning = true;

    const outgoing = screens[currentScreen];
    const incoming = screens[index];

    outgoing.classList.remove('active');
    outgoing.classList.add('exiting');

    setTimeout(() => {
      outgoing.classList.remove('exiting');
      incoming.classList.add('active');

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-label', 
          `Step ${i + 1} of ${screens.length}${i === index ? ', current' : ''}`
        );
      });

      currentScreen = index;

      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }, 380);
  }

  document.querySelectorAll('[data-action="next"]').forEach(btn => {
    btn.addEventListener('click', () => {
      goToScreen(currentScreen + 1);
    });
  });

  document.querySelectorAll('[data-action="finish"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = document.body;
      body.style.transition = 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)';
      body.style.opacity = '0';
      setTimeout(() => {
        screens.forEach(s => s.classList.remove('active', 'exiting'));
        screens[0].classList.add('active');
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === 0);
        });
        currentScreen = 0;
        isTransitioning = false;
        chips.forEach(chip => {
          chip.classList.remove('selected');
          chip.setAttribute('aria-checked', 'false');
        });
        body.style.opacity = '1';
      }, 650);
    });
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const isSelected = chip.classList.toggle('selected');
      chip.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      goToScreen(currentScreen + 1);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      goToScreen(currentScreen - 1);
    }
  });

})();