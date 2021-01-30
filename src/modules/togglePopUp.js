const togglePopUp = () => {
  const popUp = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popupContent = document.querySelector('.popup-content'),
    popupAnimate = {
      count: -1200,
      speed: 12,
      startPos: -1200,
      endPos: 0
    };


  const showPopup = () => {
    popupAnimate.startPos > popupAnimate.endPos ?
      popupAnimate.count -= popupAnimate.speed :
      popupAnimate.count += popupAnimate.speed;
    popupContent.style.transform = `translateX(${popupAnimate.count}px)`;

    if (popupAnimate.startPos > popupAnimate.endPos ?
      popupAnimate.count > popupAnimate.endPos :
      popupAnimate.count < popupAnimate.endPos) {
      requestAnimationFrame(showPopup);
    }
  };

  popupBtn.forEach(elem => {
    elem.addEventListener('click', () => {
      popUp.style.display = 'block';
      if (screen.width > 768) {
        popupAnimate.count = popupAnimate.startPos;
        requestAnimationFrame(showPopup);
      }
    });
  });

  popUp.addEventListener('click', event => {
    let target = event.target;

    if (target.classList.contains('popup-close')) {
      popUp.style.display = 'none';
    } else {
      target = target.closest('.popup-content');

      if (!target) {
        popUp.style.display = 'none';
      }
    }
  });
};

export default togglePopUp;