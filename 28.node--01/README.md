# Lection 28. Node p.01.

## Введение в Node JS

- среда выполнения кода на **JavaScript**

- основа движка **JavaScript Chrome V8**

- предназначен для серверных приложений на **JavaScript**

- кроссплатформенный

- основа **JavaScript Chrome V8**

    - скорость

    - работа с памятью

    - тот же **JS**

**Note:** **Node.js** является открытым проектом, исходники которого можно посмотреть на [github.com](https://github.com/nodejs)

### Особенности или под капотом

**JS не работает с?**

- FS

- Сетью

- I/O

**Что за сервер такой?**

- библиотеки + экстра код(на C++ -> C и не только)


**Где хорош?**

много соединений -> что-то онлайн -> много юзеров/задач

**Note:** не вычисления


**Итого**

- клиент **JS**

- сервер **JS**

    - полноценный сервер

- расширяемость

- менеджер пакетов

- сообщество

### Окружение, установка

- [Node JS download](https://nodejs.org)

    - [nvm](https://github.com/creationix/nvm/blob/master/README.md)

- PhpStorm

    - плагины (Node JS)

- [Node JS dev version](https://nodejs.org/uk/download/current/)

    - С++ как база

    - реализация модулей

- [Node JS api](https://nodejs.org/dist/latest-v10.x/docs/api/)

**После установки REPL(Read Eval Print Loop)**

- выполнить js

```bash
node
```

- либо файл js

```bash
node file.js
```

## Цикл событий

- **Node.js** core **[LibUV](http://libuv.org/)**

![Цикл событий](./node__cycle__events.png "Цикл событий")

**Цикл позволяет**

- работать с другими задачами

    - параллельно с выполнение операций ввода/вывода

**Благодаря циклу событий**

- работает очень быстро и эффективно

```js
console.log('Step: 1');
setTimeout(function () {
  console.log('Step: 3');
  console.log('Step 5');
}, 0);
console.log('Step: 2');
console.log('Step 4');
```

**Более полный цикл**

![Цикл событий полный](./node__cycle__events__full.png "Цикл событий полный")

**Note:** задействуются thread’ы операционной системы

## Модули

> Модуль представляет блок кода, который может использоваться повторно в других модулях.

- использует модульную систему

- вся встроенная функциональность разбита

    - отдельные пакеты или модули

    - [встроенные модули](https://nodejs.org/api/)

- для загрузки `require()`

```js
const os = require("os");
// получим имя текущего пользователя
const userName = os.userInfo().username;

console.log(userName);
```

- свои модули

```js
// greeting.js

const currentDate = new Date();

module.exports.date = currentDate;

module.exports.getMessage = function(name){
    const hour = currentDate.getHours();
    let greeting = `Доброе утро, ${name}`;

    if(hour > 10) {
        greeting = `Добрый день, ${name}`;
    }

    if(hour > 16) {
        greeting = `Добрый вечер, ${name}`;
    }

    return greeting;
}
```

- **module** ссылка на текущий модуль

- **exports**

```js
// app.js

const os = require("os");
const greeting = require("./greeting");

// получим имя текущего пользователя
const userName = os.userInfo().username;


console.log(`Дата запроса: ${greeting.date}`);
console.log(greeting.getMessage(userName));
```

**Определение конструкторов и объектов**

```js
// user.js

function User(name, age){
    this.name = name;
    this.age = age;
    this.displayInfo = function() {
        console.log(`Имя: ${this.name}  Возраст: ${this.age}`);
    }
}

User.prototype.sayHi = function() {
    console.log(`Привет, меня зовут ${this.name}`);
};

module.exports = User;
```

```js
// user.js

const User = require("./user");

const alec = new User("Alec", 17);

alec.sayHi();
```

### Работа с модулями

- модули кэшируются

    - увеличивает производительность

**Нюансы**

```js
// greeting.js

module.exports.name = "Alec";
```


```js
// app.js

const greeting1 = require("./greeting");

console.log(`Hello ${greeting1.name}`); // Hello Alec

const greeting2 = require("./greeting");

greeting2.name= "Not Alec";

console.log(`Hello ${greeting2.name}`); // Hello Not Alec
console.log(`Hello ${greeting1.name}`); // Hello Not Alec
```

### Структура модулей

- перенесли **greeting.js** -> **greeting/**

- переименовали **greeting.js** -> **index.js**

- как ищет модуль?

    - **greeting** -> **greeting.js**

    - **greeting** -> **greeting.note**

    - **greeting** -> **greeting.json**

    - **greeting** -> **greeting/** -> **index.***

- а что внутри?

```greeting.js
...

console.log(module);
```

## Глобальный объект

**Вопросы**

- как создавать глобальные переменные (в **Node** нет **window**)?

- как обращаться к входным данным **CLI**, **ОС**, платформе, памяти, версиям и т.д.?

**Встречайте**

```js
// some_module.js

global.name = 'Alec';
```

- [все доступные Global Objects](https://nodejs.org/api/globals.html)

- **global.process**

    - процесс, система, информация об окружении (вы можете обратиться к входным данным **CLI**, к переменным окружения с паролями, к памяти т.д.)

- **global.__filename**

    - имя файла и путь к выполняемому в данный момент скрипту, в котором находится это выражение

- **global.__dirname**

    - полный путь к выполняемому в данный момент скрипту

- **global.module**

    - объект для экспорта кода, создающего модуль из этого файла

- **global.require()**

    - метод для импорта модулей, JSON-файлов и папок

- **global.console()**

- **global.setInterval()**

- **global.setTimeout()**

## Процесс

**Почему отдельно?**

**Свойства**

- **process.pid**

    - ID процесса этого экземпляра **Node**

- **process.versions**

    - разные версии **Node**, **V8** и других компонентов

- **process.arch**

    - архитектура системы

- **process.argv**

    - аргументы **CLI**

- **process.env**

    - переменные окружения

**Методы**

- **process.uptime()**

    - получает время работы

- **process.memoryUsage()**

    - получает объём потребляемой памяти

- **process.cwd()**

    - получает текущую рабочую папку

- **process.exit()**

    - выходит из текущего процесс

- **process.on()**

    - прикрепляет на событие, например, `on('uncaughtException')`

## Отладка

- [Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)

    - [руководство](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27)

```js
//app.js
const http = require("http");

const server = http.createServer();

server.on('request', function(request, response) {
    debugger;
    response.setHeader("UserId", 12);
    response.setHeader("Content-Type", "text/html");
    response.write("<h2>hello world</h2>");

    response.end();

});

server.listen(3000);

console.log('Started');
```

- **inspect/inspect-brk**

```bash
node --inspect app.js
```

- или немного магии и в **IDE**



# COFFEE BREAK
![Знания сила](./fun__00.jpg "Знания сила")



## NPM и установка сторонних модулей

- [npm](https://docs.npmjs.com/)

- установим **express**

```js
npm install express
```

- **package.json**

```js
npm init;
```

```js
npm install;
```


- **dependencies**

```js
npm install express --save;
```

- **devDependencies**

```js
npm install jasmine-node --save-dev
```

- удаление

```js
npm uninstall express
npm uninstall express --save
npm uninstall express --save-dev
```

- семантическое версионирование **major.minor.patch**

    - баг **patch**

    - новая функциональность

        - совместимая **minor**

        - нет **major**

- не стесняемся использовать **help**

```bash
npm help
npm <command> -h
```

## Передача параметров приложению

**Запуск**

- из терминала/командной

    - применяется массив **process.argv**

```js
// app.js

const nodePath = process.argv[0];
const appPath = process.argv[1];
const name = process.argv[2];
const age = process.argv[3];

console.log("nodePath: " + nodePath);
console.log("appPath: " + appPath);
console.log("name: " + name);
console.log("age: " + age);
```

```bash
node app.js Alec 18
```

## Nodemon

**Процесс разработки(вообразили)**

- необходимость внести изменения запущенный проект

```js
//  app.js

const http = require("http");

const message = "Hello World!";

http.createServer((request, response) => {
    console.log(message);
    response.end(message);
}).listen(3000, "127.0.0.1", () => {
    console.log("Сервер начал прослушивание запросов");
});
```

- обратимся к [http://localhost:3000/](http://localhost:3000/)

- внезапно понадобилось изменить `message`

**И тут на помощь к нам приходит!?**

![Nodemon](./nodemon.jpg "Nodemon")

- [nodemon](http://nodemon.io/)

```bash
npm install nodemon -g
```

- по новой

```bash
nodemon app
```

**Что еще?**

- [pm2](http://pm2.keymetrics.io/)


## Асинхронность в Node.js

**Ааа что? Зачем?**

- один поток

- множество задач

**А одновременно?**

![Вот это поворот](./hqdefault.png "Вот это поворот")

- очевидно

```js
// app.js

function displaySync(data) {
    console.log(data);
}

console.log("Начало работы программы");

displaySync("Обработка данных...");

console.log("Завершение работы программы");
```

- а так?

```js
// app.js

function display(data, callback) {
    // с помощью случайного числа определяем ошибку
    const randInt = Math.random() * (10 - 1) + 1;
    const err = randInt > 5 ? new Error("Ошибка выполнения. randInt больше 5"): null;

    setTimeout(() => {
        callback(err, data);
    }, 0);
}

console.log("Начало работы программы");

display("Обработка данных...", (err, data) => {
    if(err) throw err;

    console.log(data);
});

console.log("Завершение работы программы");
```

- приложение не блокируется (вспомним **event loop**)

```js
function displaySync(callback){
    callback();
}

console.log("Начало работы программы");

setTimeout(() => {
    console.log("timeout 500");
}, 500);

setTimeout(() => {
    console.log("timeout 100");
}, 100);

displaySync(() => { console.log("without timeout") });

console.log("Завершение работы программы");
```

## Работа с файлами

- знакомьтесь [fs](https://nodejs.org/api/fs.html)

```txt
// hello.txt

Hello Node JS!
```

### Чтение

- **fs.readFileSync/readFile**

```js
fs.readFileSync("hello.txt", "utf8");

fs.readFile("hello.txt", "utf8", (error, data) => { });
```

```js
// app.js

const fs = require("fs");

// асинхронное чтение
fs.readFile(
    "hello.txt",
    "utf8",
    (error, data) => {
        console.log("Асинхронное чтение файла");

        if(error) throw error; // если возникла ошибка

        console.log(data);  // выводим считанные данные
    }
);

// синхронное чтение
console.log("Синхронное чтение файла");
const fileContent = fs.readFileSync("hello.txt", "utf8");
console.log(fileContent);
```

### Запись

- **fs.writeFileSync/writeFile**

```js
fs.writeFileSync("hello.txt", "Привет ми ми ми!");

fs.writeFile("hello.txt", "Привет МИР!");
```

```js
const fs = require("fs");
 
fs.writeFile(
    "hello.txt",
    "Hello мир!",
    (error) =>
        if(error) throw error; // если возникла ошибка

        console.log("Асинхронная запись файла завершена. Содержимое файла:");

        const data = fs.readFileSync("hello.txt", "utf8");

        console.log(data);  // выводим считанные данные
    }
);
```

- **fs.appendFileSync/appendFile**

```js
var fs = require("fs");

fs.appendFileSync("hello.txt", "Привет ми ми ми!");

fs.appendFile(
    "hello.txt",
    "Привет МИР!",
    (error) => {
        if(error) throw error; // если возникла ошибка

        console.log("Запись файла завершена. Содержимое файла:");

        const data = fs.readFileSync("hello.txt", "utf8");

        console.log(data);  // выводим считанные данные
});
```

- [несомненно много много других возможностей](https://nodejs.org/api/fs.html)

## Заключение

**Что с нами было!**

- Немного узнали о Node JS

- Цикл событий

- Модули

- Глобальный объект

- Процесс

- Отладка

- NPM

- Передача параметров приложению

- Nodemon

- Асинхронность

- Работа с файлами

**Молодцы выдержали!!!**

[next >>](../29.node--02)

## Справочники

- [Github Node.js](https://github.com/nodejs)

- [Node JS download](https://nodejs.org)

- [Node JS dev version](https://nodejs.org/uk/download/current/)

- [nvm](https://github.com/creationix/nvm/blob/master/README.md)

- [Node JS api](https://nodejs.org/dist/latest-v10.x/docs/api/)

- [LibUV](http://libuv.org/)

- [Global Objects](https://nodejs.org/api/globals.html)

- [npm](https://docs.npmjs.com/)

- [nodemon](http://nodemon.io/)

- [pm2](http://pm2.keymetrics.io/)

- [fs](https://nodejs.org/api/fs.html)