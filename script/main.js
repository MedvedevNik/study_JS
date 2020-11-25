'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
};

//обьявление переменных

const
    income = 'фриланс, инвестиции',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000,
    period = 12;

let expenses = [],
    money,
    start = function() {
    
      do {
        money = prompt('Ваш месячный доход?');
      } while (!isNumber(money));
    };

start();

// Использование callback
// Рассчёты расходов и т.д.


const  getExpensesMonth = function() {
  let sum = 0;
  
  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt('Введите обязательную статью расходов?', 'продукты');
    
    do {
      sum = prompt('Во сколько обойдется?');
    } while (!isNumber(sum));
    
  }

  return sum;
};

const getAccumulatedMonth = function() {
  return  money - getExpensesMonth();
};


const accumulatedMonth = getAccumulatedMonth(getExpensesMonth);

const showTypeOF = function(data) {
  console.log(typeof(data));
};

// вызов функций typeOf
showTypeOF(money);
showTypeOF(income);
showTypeOF(deposit);

console.log('Период равен ' + period + ' месяцев', '\nЦель заработать', mission, 'Рублей');
console.log(addExpenses.toLowerCase().split(', '));

const getTargetMonth = function() {
  return Math.ceil(mission / accumulatedMonth);
};

//проверка на число(не NaN)

if (isNaN(accumulatedMonth)) {
  console.log('Где-то ошибка, проверьте числа, которые вы ввели');
} else {
  console.log('Бюджет на месяц', accumulatedMonth);
  if (getTargetMonth() > 0) {
    console.log('Цель не будет достигнута');
  } else {
    console.log('Цель будет достигнута за:', getTargetMonth(), 'месяцев');
  }

  let budgetDay = Math.floor(accumulatedMonth / 30);
  console.log('Дневной бюджет =', budgetDay);

  // проверка уровня дохода и его вывод

  const getStatusIncome = function() {
    if (budgetDay >= 1200) {
      return('У вас высокий уровень дохода!');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
      return('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay >= 0) {
      return('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return('Что то пошло не так');
    }
  };

  console.log(getStatusIncome());
}
