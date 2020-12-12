'use strict';


// обьявление переменных и присвоение им элементов
const btnStart = document.getElementById('start'),
  btnCancel = document.querySelector('#cancel'),
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

const AppData = function() {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
};

AppData.prototype.start = function() {
  let allInput = document.querySelectorAll('.data input[type = text]');
  allInput.forEach(function(item) {
    item.setAttribute('disabled','true');
  });
 
  btnIncome.setAttribute('disabled','true');
  btnExpenses.setAttribute('disabled','true');
  btnStart.style.display = 'none';
  btnCancel.style.display = 'block';

  this.budget = +inputMoney.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
};

AppData.prototype.reset = function() {
  let inputTextData = document.querySelectorAll('.data input[type = text]'),
      resultInputAll = document.querySelectorAll('.result input[type = text]');

  inputTextData.forEach(function(item) {
    item.value = '';
    item.removeAttribute('disabled');
    selectPeriod.value = '0';
    periodAmount.innerHTML = selectPeriod.value;
  });
  resultInputAll.forEach(function(item) {
    item.value = '';
  });

  incomeItems.forEach(function(item, i) {
    if (i > 0 && i < 3) {
      item.remove();
    }
  });
  expensesItems.forEach(function(item, i) {
    if (i > 0 && i < 3) {
      item.remove();
    }
  });

  btnIncome.setAttribute('disabled','false');
  btnIncome.setAttribute('disabled','false');
  btnExpenses.style.display = 'block';
  btnIncome.style.display = 'block';

  this.blockInput(false);

  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  
  btnCancel.style.display = 'none';
  btnStart.style.display = 'block';

  this.disStart();
};
AppData.prototype.blockInput = function(disabled = true) {
  document.querySelectorAll('.data input[type=text]').forEach(item => {
    item.disabled = disabled;
  });
  document.querySelector('.data input[type=checkbox]').disabled = disabled;
  btnIncome.disabled = disabled;
  btnExpenses.disabled = disabled;
};
AppData.prototype.showResult = function() {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.floor(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcSavedMoney();
};
AppData.prototype.addExpensesBlock = function() {
  const cloneExpensesItem = expensesItems[0].cloneNode(true);

  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpenses);
  cloneExpensesItem.querySelector('.expenses-title').value = '';
  cloneExpensesItem.querySelector('.expenses-amount').value = '';

  expensesItems = document.querySelectorAll('.expenses-items');

  if (expensesItems.length === 3) {
    btnExpenses.style.display = 'none';
  }
};
AppData.prototype.addIncomeBlock = function() {
  const cloneIncomeItem = incomeItems[0].cloneNode(true);

  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncome);
  cloneIncomeItem.querySelectorAll('.income-title').value = '';
  cloneIncomeItem.querySelectorAll('.income-amount').value = '';

  incomeItems = document.querySelectorAll('.income-items');

  if (incomeItems.length === 3) {
    btnIncome.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function() {
  document.querySelectorAll('.expenses-items').forEach(function(item) {
    const itemExpenses = item.querySelector('.expenses-title').value,
      cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
  }, this);
};
AppData.prototype.getIncome = function() {
  document.querySelectorAll('.income-items').forEach(function(item) {
    const itemIncome = item.querySelector('.income-title').value,
      cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
        this.incomeMonth += +cashIncome;
      }
  }, this);
};
AppData.prototype.getAddExpenses = function() {
  const addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item) {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  }, this);
};
AppData.prototype.getAddIncome = function() {
  addItemIncome.forEach(function(item) {
    const itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  }, this);
};
AppData.prototype.getExpensesMonth = function() {
  for (let item in this.expenses) {
    this.expensesMonth += +this.expenses[item];
  }
};
AppData.prototype.getBudget = function() {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function() {
  return Math.ceil(targetAmount.value /this.budgetMonth);
};
AppData.prototype.getStatusIncome = function() {
  if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода!');
  } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
};
AppData.prototype.getInfoDeposit = function(){
  this.moneyDeposit = 0;
};
AppData.prototype.calcSavedMoney = function() {
  return this.budgetMonth * selectPeriod.value;
};
AppData.prototype.changePriod = function() {
  periodAmount.textContent = selectPeriod.value;
  incomePeriodValue.value = this.calcSavedMoney();
};
AppData.prototype.disStart = function() {
  btnStart.disabled = !inputMoney.value.trim();
  btnStart.style.cursor = 'not-allowed';
  
  if (inputMoney.value.trim() !== '') {
    btnStart.style.cursor = 'pointer';
  }
};


AppData.prototype.eventsListeners = function () {

  this.disStart();

  btnStart.addEventListener('click', appData.start.bind(appData));
  btnCancel.addEventListener('click', appData.reset.bind(appData));

  btnIncome.addEventListener('click', appData.addIncomeBlock);
  btnExpenses.addEventListener('click', appData.addExpensesBlock);
  selectPeriod.addEventListener('input', appData.changePriod.bind(appData));
  inputMoney.addEventListener('input', appData.disStart);
};

const appData = new AppData();

appData.eventsListeners();

