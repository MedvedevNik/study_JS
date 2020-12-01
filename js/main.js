'use strict';


// обьявление переменных и присвоение им элементов
const btnStart = document.getElementById('start'),
  btnIncome = document.getElementsByTagName('button')[0],
  btnExpenses = document.getElementsByTagName('button')[1],
  checkDeposit = document.querySelector('#deposit-check'),
  itemIncome = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  inputMoney = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('input.income-title'),
  incomeAmount = document.querySelector('.income-amount'),
  expensesTitle = document.querySelector('input.expenses-title'),
  expensesAmount = document.querySelector('.expenses-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  depositPercent = document.querySelector('.deposit-percent'),
  depositAmount = document.querySelector('.deposit-amount'),
  inputTarget = document.querySelector('.target-amount'),
  selectPeriod = document.querySelector('.period-select');


  // вывод в консоль этих элементов

console.log('btnStart: ', btnStart);
console.log('btnIncome: ', btnIncome);
console.log('btnExpenses: ', btnExpenses);
console.log('checkDeposit: ', checkDeposit);
console.log('itemIncome: ', itemIncome);
console.log('budgetMonthValue: ', budgetMonthValue);
console.log('budgetDayValue: ', budgetDayValue);
console.log('expensesMonthValue: ', expensesMonthValue);
console.log('additionalExpensesValue: ', additionalExpensesValue);
console.log('additionalIncomeValue: ', additionalIncomeValue);
console.log('incomePeriodValue: ', incomePeriodValue);
console.log('targetMonthValue: ', targetMonthValue);
console.log('inputMoney: ', inputMoney);
console.log('inputIncomeTitle: ', incomeTitle);
console.log('inputIncomeAmount: ', incomeAmount);
console.log('expensesTitle: ', expensesTitle);
console.log('expensesAmount: ', expensesAmount);
console.log('inputTarget: ', inputTarget);
console.log('depositPercent: ', depositPercent);
console.log('depositAmount: ', depositAmount);
console.log('inputPeriod: ', selectPeriod);
console.log('additionalExpensesItem: ', additionalExpensesItem);