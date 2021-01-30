

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import addDot from './modules/addDot';
import slider from './modules/slider';
import changeImg from './modules/changeImg';
import checkCalcBlock from './modules/checkCalcBlock';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Timer
countTimer('30 march 2021');
// menu
toggleMenu();
// popup
togglePopUp();
// tabs
tabs();
//addDot
addDot();
// slider
slider();
//changeImg
changeImg();
//checkCalcBlock
checkCalcBlock();
//calc
calc(100);
//send-ajax-form
sendForm();


//animate
const anchors = document.querySelectorAll('menu>ul a');

for (const anchor of anchors) {
  anchor.addEventListener('click', event => {
    event.preventDefault();
    const blockID = anchor.getAttribute('href').substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

const animateScroll = () => {

  const target = event.target.closest('[href^="#"]'),
    speed = 0.85;


  if (target) {
    const pageY = window.pageYOffset,
      hash = target.href.replace(/[^#]*(.*)/, '$1'),
      distTopPosition = document.querySelector(hash).getBoundingClientRect().top;

    let start = 0;


    const step = time => {
      if (!start) start = time;

      const progress = time - start;

      const r = (distTopPosition < 0 ?
        Math.max(pageY - progress / speed, pageY + distTopPosition) :
        Math.min(pageY + progress / speed, pageY + distTopPosition));

      window.scrollTo(0, r);

      if (r < pageY + distTopPosition) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);

  }
};

document.querySelector('main a').addEventListener('click', animateScroll);

