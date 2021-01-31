const slider = () => {
  const slide = document.querySelectorAll('.portfolio-item'),
    slider = document.querySelector('.portfolio-content');

  let currentSlide = 0,
    interval;

  const addDot = () => {
    const portfolioDots = document.querySelector('.portfolio-dots');

    slide.forEach(() => {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      portfolioDots.append(dot);
    });
    portfolioDots.children[0].classList.add('dot-active');
  };

  addDot();

  const dots = document.querySelectorAll('.dot');

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {

    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dots, currentSlide, 'dot-active');
    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dots, currentSlide, 'dot-active');
  };

  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener('click', event => {
    event.preventDefault();

    const target = event.target;

    if (!target.matches('.portfolio-btn, .dot')) {
      return;
    }

    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dots, currentSlide, 'dot-active');

    if (target.matches('#arrow-right')) {
      currentSlide++;
    } else if (target.matches('#arrow-left')) {
      currentSlide--;
    } else if (target.matches('.dot')) {
      dots.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }


    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }

    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dots, currentSlide, 'dot-active');

  });

  slider.addEventListener('mouseover', event => {
    if (event.target.matches('.portfolio-btn') ||
          event.target.matches('.dot')) {
      stopSlide();
    }
  });

  slider.addEventListener('mouseout', event => {
    if (event.target.matches('.portfolio-btn') ||
          event.target.matches('.dot')) {
      startSlide();
    }
  });

  startSlide(1500);
};

export default slider;
