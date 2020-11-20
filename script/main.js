let money,
    income,
    addExpenses,
    deposit,
    mission,
    period;

money = 60000;
income = 'фриланс, инвестиции';
addExpenses = 'Интернет, такси, комунналка, еда, машина';
deposit = true;
mission = 1000000;
period = 9;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев', '\nЦель заработать', mission, 'Рублей');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log('Дневной бюджет =', budgetDay);