'use strict';

let money;

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  start = function () {
    do {
      money = prompt('Ваш месячный доход?', 50000);
    } while (!isNumber(money));
  };

start();

const appData = {
  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 500000,
  period: 3,
  asking: function () {

    if(confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;
      let cashIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      } while (isNumber(itemIncome) || itemIncome.trim() === '');
      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }


    let addExpenses = '';
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                'интернет, такси, коммуналка');
        } while (isNumber(addExpenses) || addExpenses.trim() === '');

    appData.addExpenses = addExpenses.toLowerCase().split(',').map(function (val) {
      return val.trim();
    });
    console.log('appData.addExpenses: ', appData.addExpenses);
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    let itemExpenses;

    for (let i = 0; i < 2; i++) {

      do {
        itemExpenses = prompt('Введите обязательную статью расходов?');
      } while (isNumber(itemExpenses) || itemExpenses.trim() === '');

      appData.expenses[itemExpenses] = (() => {
        let cashExpenses = 0;
        do {
          cashExpenses = prompt('Во сколько это обойдется?');
        } while (!isNumber(cashExpenses));
        return +cashExpenses;
      })();
    }
  },
  getExpensesMonth: function () {
    for (let item in appData.expenses) {
      appData.expensesMonth += +appData.expenses[item];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода!');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  },
  getInfoDeposit: function(){
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      } while(!isNumber(appData.percentDeposit) || appData.percentDeposit >= 100 || appData.percentDeposit <= 0);
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while(!isNumber(appData.moneyDeposit) || appData.moneyDeposit === 0);

    }
  },
  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
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
appData.getInfoDeposit();

console.log(appData.addExpenses.map(function(val, i) {
    return val[0].toUpperCase() + val.slice(1);
  }).join(', '));