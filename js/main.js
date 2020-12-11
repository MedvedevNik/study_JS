'use strict';


// обьявление переменных и присвоение им элементов
const btnStart = document.getElementById('start'),
  btnIncome = document.getElementsByTagName('button')[0],
  btnExpenses = document.getElementsByTagName('button')[1],
  checkDeposit = document.querySelector('#deposit-check'),
  addItemIncome = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  inputMoney = document.querySelector('.salary-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  depositPercent = document.querySelector('.deposit-percent'),
  depositAmount = document.querySelector('.deposit-amount'),
  targetAmount = document.querySelector('.target-amount'),
  selectPeriod = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

let expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items');

const appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 500000,
  start: function() {
    
    appData.budget = +inputMoney.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
  
    if (btnStart.textContent === 'Рассчитать') {
      this.blockInput();
      btnStart.textContent = 'Сбросить';
    } else {
      btnStart.textContent = 'Рассчитать';
      this.reset();
    }

  },
  reset: function() {
    for (let i = incomeItems.length - 1; i > 0; i--) {
      incomeItems[0].parentNode.removeChild(incomeItems[i]);
    }
    for (let i = expensesItems.length - 1; i > 0; i--) {
        expensesItems[0].parentNode.removeChild(expensesItems[i]);
    }
    btnIncome.style.display = '';
    btnExpenses.style.display = '';
    this.blockInput(false);
    this.getBudget();
    document.querySelectorAll('input[type=text]').forEach(function(item) {
      item.value = '';
    });
    selectPeriod.value = document.querySelector('.period-amount').textContent = 1;
    this.disStart();
  },
  blockInput: function(disabled = true) {
    document.querySelectorAll('.data input[type=text]').forEach(function(item) {
      item.disabled = disabled;
    });
  },
  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
  },
  addExpensesBlock: function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpenses);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';

    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      btnExpenses.style.display = 'none';
    }
  },
  addIncomeBlock: function() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncome);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';

    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      btnIncome.style.display = 'none';
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      const itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '') {
          this.expenses[itemExpenses] = +cashExpenses;
        }
    }, appData);
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      const itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
          this.income[itemIncome] = +cashIncome;
          this.incomeMonth += +cashIncome;
        }
    }, appData);
  },
  getAddExpenses: function() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, appData);
  },
  getAddIncome: function() {
    addItemIncome.forEach(function(item) {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }, appData);
  },
  getExpensesMonth: function() {
    for (let item in this.expenses) {
      this.expensesMonth += +this.expenses[item];
    }
  },
  getBudget: function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function() {
    return Math.ceil(targetAmount.value /this.budgetMonth);
  },
  getStatusIncome: function() {
    if (this.budgetDay >= 1200) {
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
    // if (appData.deposit) {
    //   do {
    //     appData.percentDeposit = prompt('Какой годовой процент?', 10);
    //   } while(!isNumber(appData.percentDeposit) || appData.percentDeposit >= 100 || appData.percentDeposit <= 0);
    //   do {
    //     appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    //   } while(!isNumber(appData.moneyDeposit) || appData.moneyDeposit === 0);

    // }
    this.moneyDeposit = 0;
  },
  calcSavedMoney: function() {
    return this.budgetMonth * selectPeriod.value;
  },
  changePriod: function() {
    periodAmount.textContent = selectPeriod.value;
    incomePeriodValue.value = appData.calcSavedMoney();
  },
  disStart: function() {
    btnStart.disabled = !inputMoney.value.trim();
    btnStart.style.cursor = 'not-allowed';
    
    if (inputMoney.value.trim() !== '') {
      btnStart.style.cursor = 'pointer';
    }
  }
};

const foo = appData.start.bind(appData);

appData.disStart();
btnStart.addEventListener('click', foo);

btnIncome.addEventListener('click', appData.addIncomeBlock);
btnExpenses.addEventListener('click', appData.addExpensesBlock);
selectPeriod.addEventListener('input', appData.changePriod);
inputMoney.addEventListener('input', appData.disStart);


// const targetMonth = appData.getTargetMonth();

//проверка на число(не NaN)

// console.log('Расходы за месяц: ', appData.expensesMonth);
// if (targetMonth >= 0) {
//   console.log('Цель будет достигнута за:', appData.getTargetMonth(), 'месяцев');
// } else {
//   console.log('Цель не будет достигнута');
// }
// console.log('Дневной бюджет =', appData.budgetDay);


// console.log(appData.addExpenses.map(function(val, i) {
//     return val[0].toUpperCase() + val.slice(1);
//   }).join(', '));