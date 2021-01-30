document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output'),
        db = './cars.json';

    const getData = url => new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.open('GET', url);
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.readyState === 4 && request.status === 200) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject(request.statusText);
            }
        });
    });    

    const throughArray = data => {
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
            }
        });
    }

    select.addEventListener('change', () => getData(db)
        .then(data => throughArray(data))
        .catch(error => output.innerHTML = `Произошла ошибка: ${error}`)
    );

});