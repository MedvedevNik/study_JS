const toggleMenu = () => {
  const menu = document.querySelector('menu');

  const handlerMenu = event => {
    const target = event.target;

    const activeMenu = () => {
      menu.classList.toggle('active-menu');
    };

    if (target.closest('.menu') || (!target.closest('menu') && menu.classList.contains('active-menu'))) {
      activeMenu();
    } else if (target.closest('menu') && target.closest('[href^="#"]')) {
      activeMenu();

      if (!target.classList.contains('close-btn')) {
        // eslint-disable-next-line no-use-before-define
        animateScroll();
      }
    }
  };

  document.body.addEventListener('click', handlerMenu);
};

export default toggleMenu;
