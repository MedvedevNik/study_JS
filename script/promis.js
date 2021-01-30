// Промисы === Обещания

const doUniversity = docs => new Promise((resolve, reject) => {
  if (docs) {
    console.log('Рассмотрение документов...');
    setTimeout(() => {
      if (Math.random() > 0.3) {
        const result = 'Принят';
        resolve(result);
      } else {
        reject('Отказано');
      }
    }, 3000);
  } else {
    reject('Отказано, нехватате документов');
  }
});

const doArmy = docs => new Promise((resolve, reject) => {
  if (docs) {
    console.log('Военком думает...');
    setTimeout(() => {
      if (docs === 'Принят') {
        resolve('Отсрочка');
        console.log('Отсрочка');
      } else {
        reject('Повестка');
      }
    }, 2000);
  } else {
    reject('Повестка');
  }
});

const doWork = docs => new Promise((resolve, reject) => {
  console.log('Директор google думает...');

  setTimeout(() => {
    if (Math.random() > 0.3) {
      const result = 'Приглашен на собеседование в Google в Понедельник';
      console.log(result);
      resolve(result);
    } else {
      reject('Отказано иди в Яндекс!');
    }
  }, 3000);
});

const documents = ['Паспорт', 'Аттестат'];

doUniversity(documents)
  .then(result => {
    console.log(result);
    return result;
  }, reason => {
    console.error(reason);
  })
  .then(doArmy)
  .then(doWork)
  .catch(reason => console.error(reason));
