const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcDay = document.querySelector('.calc-day'),
    calcCount = document.querySelector('.calc-count'),
    totalValue = document.getElementById('total');

  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1,
      step = 1;

    const typeValue = calcType.options[calcType.selectedIndex].value,
      squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if  (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue  * squareValue * countValue * dayValue;
    }

    if (calcSquare.value > 200 || calcCount.value > 40) {
      totalValue.textContent = total;
    } else if (calcSquare.value === 0 || typeValue === '') {
      totalValue.textContent = 0;
    } else {
      if (+totalValue.textContent !== total) {
        if (totalValue.textContent > total) {
          step = -1;
        }

        const timer = setInterval(() => {
          totalValue.textContent = +totalValue.textContent + (step * 200);
          if ((total - totalValue.textContent) * (step * 200)  < 1) {
            clearInterval(timer);
            totalValue.textContent = Math.round(total);
          }
        }, 0);
      }
    }
  };

  calcBlock.addEventListener('change', event => {
    const target  = event.target;

    if (target.matches('.calc-day') || target.matches('.calc-type') ||
          target.matches('.calc-square') || target.matches('.calc-count')) {
      countSum();
    }
  });
};

export default calc;
