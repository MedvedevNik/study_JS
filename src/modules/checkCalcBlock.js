const checkCalcBlock = () => {
  const calcBlock = document.querySelector('.calc-block');

  calcBlock.addEventListener('input', event => {
    const target = event.target;

    if (target.matches('.calc-day') ||
          target.matches('.calc-square') || target.matches('.calc-count')) {
      event.target.value = event.target.value.replace(/\D/g, '');
    }
  });
};

export default checkCalcBlock;