'use strict';

function ajaxRequest(url, block) {
    // 1. Создаём новый объект XMLHttpRequest
    let domNodeBlock = document.querySelector(block),
        xhr = new XMLHttpRequest(),
        res;

    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', url, true);

    // 3. Отсылаем запрос
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        domNodeBlock.innerHTML = 'Готово!';

        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status !== 200) {
            // обработать ошибку
            res = `${xhr.status}: ${xhr.statusText}`;
        } else {
            // вывести результат
            res = xhr.responseText;
        }
        debugger;
    };

    domNodeBlock.innerHTML = 'Загрузка!';
}