'use strict';

let money = prompt('Ваш месячный доход?', '60000'),
    income = 'фриланс, инвестиции',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    expensesFirst = prompt('Введите обязательную статью расходов?', 'продукты'),
    amountFirst = +prompt('Во сколько обойдется?', '15000'),
    expensesSecond = prompt('Введите обязательную статью расходов?', 'квартплата'),
    amountSecond = +prompt('Во сколько обойдется?', '3000'),
    budgetMonth = money - (amountFirst + amountSecond), 
    mission = 1000000,
    period = 12,
    month = 0;
    console.log(typeof money);


console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев', '\nЦель заработать', mission, 'Рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц', budgetMonth);
console.log(`Цель будет достигнута за: ${Math.ceil(mission / budgetMonth)} месяцев`);

let budgetDay = budgetMonth / 30; //заменена переменная money на budgetMonth
console.log('Дневной бюджет =', Math.floor(budgetDay));

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода!');
} else if (budgetDay >= 600 && budgetDay <= 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay >= 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}