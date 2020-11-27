'use strict';

let money;

const isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      },
      start = function() {
      do {
        money = prompt('Ваш месячный доход?');
      } while (!isNumber(money));
      };

start();

let appData = {
  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  asking: function() {
      const 
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период    через запятую', 'Квартплата, проездной, кредит');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            for (let i = 0; i < 2; i++) {

                appData.expenses[prompt('Введите обязательную статью расходов?')] = (() => {
                  let n = 0;
                  do {
                      n = prompt('Во сколько это обойдется?');
                  } while (!isNumber(n));
                  return +n;
              })();
              }
  },
  getExpensesMonth: function() {
    for (let item in appData.expenses) {
      appData.expensesMonth += appData.expenses[item];
    }
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function() {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function() {
    if (appData.budgetDay >= 1200) {
      return('У вас высокий уровень дохода!');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
      return('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return('Что то пошло не так');
    }
  }
};

appData.asking();

appData.getExpensesMonth();
appData.getBudget();

const targetMonth = appData.getTargetMonth();

//проверка на число(не NaN)

console.log('Расходы за месяц: ', appData.expensesMonth);
if (targetMonth >= 0) {
  console.log('Цель будет достигнута за:', appData.getTargetMonth(), 'месяцев');
  } else {
  console.log('Цель не будет достигнута');
  }
console.log('Дневной бюджет =', appData.budgetDay);

  // проверка уровня дохода и его вывод

console.log(appData.getStatusIncome());

console.log('наша программа включает в себя: ');
for (let item in appData) {
  console.log(item, appData[item]);
}