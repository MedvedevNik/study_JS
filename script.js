'use strict';

const date = new Date(),
  seconds = date.getSeconds(),
  minutes = date.getMinutes(),
  hours = date.getHours(),
  day = date.getDay(),
  nextDate = new Date("January 1, 2021"),
  msPerDay = 24*60*60*1000;

let kindDay = '',
  daysWeek = '',
  daysLeft = Math.round((nextDate.getTime() - date.getTime())/msPerDay),
  dayname="";

if (hours >= 6 && hours < 12) {
  kindDay = 'ое утро';
} else if (hours >= 12 && hours < 18) {
  kindDay = 'ый день';
} else if (hours >= 18 && hours < 24) {
  kindDay = 'ый вечер';
} else {
  kindDay = 'ой ночи';
};


function dayOfWeek(day) {
  switch(day) {
    case 0 :
      daysWeek = 'Воскресенье';
      break;
    case 1 :
      daysWeek = 'Понедельник';
      break;
    case 2 :
      daysWeek = 'Вторник';
      break;
    case 3 :
      daysWeek = 'Среда';
      break;
    case 4 :
      daysWeek = 'Четверг';
      break;
    case 5 :
      daysWeek = 'Пятница';
      break;
    case 6 :
      daysWeek = 'Суббота';
      break;
  };

  document.write(`<h2>Сегодня: ${daysWeek}</h2>`);
}


function dateTime(){
  document.write(`<h3>Текущее время: ${date.toLocaleTimeString('en')}</h3>`);
};

function daysLeftNewYear() { 
  if(daysLeft > 1 && daysLeft < 5) {
    dayname=" дня";
  } else if ( daysLeft === 1 ) {
    dayname=" день";
  } else {
    dayname=" дней";
  }

  document.write(`<h4>До Нового года осталось ${daysLeft + dayname}</h4>`)
};


document.write(`<h1>Добр${kindDay}</h1>`);

dayOfWeek(day);
dateTime()
daysLeftNewYear();