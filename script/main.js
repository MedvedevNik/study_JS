'use strict';

//обьявление переменных

let money = prompt('Ваш месячный доход?', '60000'),
    income = 'фриланс, инвестиции',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    expensesFirst = prompt('Введите обязательную статью расходов?', 'продукты'),
    amountFirst = +prompt('Во сколько обойдется?', '15000'),
    expensesSecond = prompt('Введите обязательную статью расходов?', 'квартплата'),
    amountSecond = +prompt('Во сколько обойдется?', '3000');
const mission = 1000000,
      period = 12;

// Использование callback
// Рассчёты расходов и т.д.

function getAccumulatedMonth(callback) {
  return  Number(money) - (callback(amountFirst, amountSecond));
}

function getExpensesMonth(amount1, amount2) {
  if (isNaN(amount1)) {
    console.log('Где-то ошибка, скорее всего вы не указали затраты');
  }  
  if (isNaN(amount2)) {
    console.log('Где-то ошибка, скорее всего вы не указали затраты');
  }   //проверка на пустоту
  return amount1 + amount2;
}

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
  console.log('Цель будет достигнута за:', getTargetMonth(), 'месяцев');

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
