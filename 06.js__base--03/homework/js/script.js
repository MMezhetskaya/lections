/*
 Сделать страницу сохранения пользователей.

 Посетитель заходит на страницу, появляется окно с вопросом - ‘Какое кол-во пользователей вы хотите добавить?’,

 Указанное кол-во раз появляется окно, где через запятую указывается имя, возвраст, профессия.

 Данные записываются в массив типа [{name: 'Петя', age: 12 ... }, ..., { ... }]

 После появляется окно где можно указать по какому полю(ключу) сортировать

 Результат в отсотированном виде, выводится в специальном div c id result.

 Дополнительное задание.

 Если в поле сортировки ввести Sum {имя поля}:

 {имя поля} = age вывести суммарный возвраст

 {имя поля} != age вывести все значения введенного поля отсортированные через запятую.
 */

'use strict';

function getUserData(title, pHolder) {
    prompt(title, pHolder);
}

function setUsersNum() {
    var usersNum = +prompt('Какое кол-во пользователей вы хотите добавить?', '0-999'),
        result = document.getElementById('result'),
        usersData, getSortKey, sortedData;

    if (usersNum) {
        usersData = setUsersInfo(usersNum);
        getSortKey = prompt('по какому полю(ключу) сортировать', 'name, age, job');
        sortedData = usersData.sort(
            function(a, b) {
                if (a[getSortKey]) {
                    return (a[getSortKey] === b[getSortKey])
                        ? 0
                        : (a[getSortKey] < b[getSortKey])
                            ? -1
                            : 1;
                }
            }
        );

        var sortedMapData = sortedData.map(function (el) {
            return el.name + ' Age: ' + el.age + el.job;
        });
        console.log(sortedMapData);
        result.innerHTML = sortedMapData.join('<br>');
    }
}

function setUsersInfo(usersNum) {
    var usersData = [];

    for (var i = 1; i <= usersNum; i++) {
        var userInfo = prompt('User ' + i + ' info', 'имя, возвраст, профессия'),
            userInfoMap;

        userInfoMap = userInfo
            .split(',')
            .reduce(function (prevVal, targetVal, j) {
                switch (j) {
                    case 0:
                        prevVal.name = targetVal;
                        break;

                    case 1:
                        prevVal.age = +targetVal;
                        break;

                    case 2:
                        prevVal.job = targetVal;
                        break;
                }

                return prevVal;
            }, {});

        usersData.push(userInfoMap)
    }
    // debugger;
    return usersData;
}

function sortByKey(key) {
    debugger;
}