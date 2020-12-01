'use strict';


// обьявление переменных и присвоение им элементов
const btnStart = document.getElementById('start'),
  btnIncome = document.getElementsByTagName('button')[0],
  btnExpenses = document.getElementsByTagName('button')[1],
  checkDeposit = document.querySelector('#deposit-check'),
  itemIncome = document.querySelectorAll('.additional_income-item'),
  elemValue = document.querySelectorAll('[class$="-value"]'),
  inputMoney = document.querySelector('.salary-amount'),
  inputIncomeTitle = document.querySelector('.income-title'),
  inputIncomeAmount = document.querySelector('.income-amount'),
  inputIncomeTitle = document.querySelector('.income-title'),
  inputExpenses = document.querySelector('[class^="additional"]'),
  inputTarget = document.querySelector('.target-amount'),
  inputPeriod = document.querySelector('.period-select');


  // вывод в консоль этих элементов

console.log('btnStart: ', btnStart);
console.log('btnIncome: ', btnIncome);
console.log('btnExpenses: ', btnExpenses);
console.log('checkDeposit: ', checkDeposit);
console.log('itemIncome: ', itemIncome);
console.log('elemValue: ', elemValue);
console.log('inputMoney: ', inputMoney);
console.log('inputIncomeTitle: ', inputIncomeTitle);
console.log('inputIncomeAmount: ', inputIncomeAmount);
console.log('inputIncomeTitle: ', inputIncomeTitle);
console.log('inputExpenses: ', inputExpenses);
console.log('inputTarget: ', inputTarget);
console.log('inputPeriod: ', inputPeriod);