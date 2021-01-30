const changeImg = () => {
  const img = document.querySelector('#command .row');

  const changingPhotos = () => {
    const target = event.target;

    if (target.classList.contains('command__photo')) {
      const lastSrc = target.src;

      target.src = target.dataset.img;
      target.dataset.img = lastSrc;
    }
  };

  img.addEventListener('mouseover', changingPhotos);
  img.addEventListener('mouseout', changingPhotos);
};

export default changeImg;