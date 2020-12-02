'use strict';

const books = document.querySelectorAll('.books'),
  adv = document.querySelector('.adv'),
  book = document.querySelectorAll('.book'),
  arr = Object.keys(book).sort((prev, next) => {
    if ( book[prev].firstElementChild.innerText < book[next].firstElementChild.innerText ) {
      return -1;
    }
    if ( book[prev].firstElementChild.innerText > book[next].firstElementChild.innerText) {
      return 1;
    }
});
for (let i = 0; i < arr.length; i++){
  books[0].append(book[arr[i]]);
};

let newChapter = document.createElement('li');



// меняем фон
document.querySelector('body').style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

//исправление заголовка 
books[0].children[2].querySelector('h2').querySelector('a').text = 'Книга 3. this и Прототипы Объектов';

// убираем рекламу
adv.remove();

//function для сортировки

const sortChapter = function (collection) {
  const sortElements = function (arr) {
    const indexArr = Object.keys(arr).sort((prev, next) => {
      if ( arr[prev].textContent < arr[next].textContent ) {
        return -1;
      }
      if ( arr[prev].textContent > arr[next].textContent) {
        return 1;
      }
    });

    let newArr = [];

    for (let i = 0; i < indexArr.length; i++) {
      newArr.push(arr[indexArr[i]]);
    }
    return newArr;
  };

  const elem = collection.querySelectorAll('li');

let chapterArr = [],
    appArr = [];

  elem.forEach(element => {
    if (element.textContent.indexOf('Введение') > -1) {
      collection.before(element, elem[0]);
    }
    if (element.textContent.indexOf('Предисловие') > -1) {
      collection.before(element, elem[1]);
    }
    if (element.textContent.indexOf('Глава') > -1) {
      chapterArr.push(element);
    }
    if (element.textContent.indexOf('Приложение') > -1) {
      appArr.push(element);
    }
  });

  //сортируем главы
  chapterArr = sortElements(chapterArr);
  chapterArr.forEach(element => { collection.append(element); });

  //сортируем приложение
  appArr = sortElements(appArr);
  appArr.forEach(element => { collection.append(element); });
}

sortChapter(books[0].children[1].querySelector('ul'));

sortChapter(books[0].children[4].querySelector('ul'));

// добавляем новую главу
newChapter.innerText = 'Глава 8: За пределами ES6';
books[0].children[5].querySelector('ul').append(newChapter);
sortChapter(books[0].children[5].querySelector('ul'));


