/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
export default class Collapsible {
  constructor() {
    this.collabpsibles = Array.from(document.getElementsByClassName('collapse'));
  }

  drawBtn(el) {
    const btn = document.createElement('button');
    btn.innerText = el.dataset.buttontext;
    el.insertAdjacentElement('beforebegin', btn);

    if (el.dataset.animationmethod === 'raf') {
      const maxHeight = el.offsetHeight * 10;
      let open = false;
      el.style.height = '0px';

      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        const start = Date.now();
        const end = maxHeight;

        function draw() {
          const progress = Date.now() - start;
          if (!open) el.style.height = `${progress / 10}px`;
          else el.style.height = `calc(${el.style.height} - ${progress / 10}px`;

          if (progress <= end) window.requestAnimationFrame(draw);
          else open = !open;
        }

        window.requestAnimationFrame(draw);
      });
    }

    if (el.dataset.animationmethod === 'css') {
      el.classList.add('hidden');
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        el.classList.toggle('hidden');
        el.classList.toggle('visible');
      });
    }
  }

  init() {
    this.collabpsibles.forEach((el) => {
      el.style.overflow = 'hidden';
      this.drawBtn(el);
    });
  }
}
