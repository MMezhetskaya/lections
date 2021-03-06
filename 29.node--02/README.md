# Lection 29. Node p.02.

## Эмиттеры событий

> **[Эмиттер событий](https://nodejs.org/api/events.html)** — это триггер для события, которое может прослушать кто угодно.

- за каждым событием закреплено строковое имя

    - на которое эмиттером может быть повешен **callback**

**Цель**

- справиться с [адом callback’ов](http://callbackhell.com/)

- и много

    - много других

**Как?**

- события обрабатываются с использованием шаблона **observer**

- событие отслеживает все связанные с ним

    - функции(**observer**)

        - исполняются при активизации

**Для использования эмиттеров нужно импортировать модуль и создать экземпляр объекта:**

```js
const Emitter = require("events");

const emitter = new Emitter();
```

**Далее можно прикрепить получателей событий и активировать/передавать события:**

```js
const Emitter = require("events");

const emitter = new Emitter();

emitter.on('knock', function() {
  console.log('Who\'s there?')
})

emitter.on('knock', function() {
  console.log('Go away!')
})

emitter.emit('knock')
```

**Что есть ещё**

- **emitter.listeners(eventName)**

    - формирует список всех получателей для данного события

- **emitter.once(eventName, listener)**

    - прикрепляет одноразового получателя событий

- **emitter.removeListener(eventName, listener)**

    - удаляет получателя событий.

### Передача параметров событию

**При вызове события**

- в качестве второго параметра в функцию **emit**

    - можно передавать данные

        - передается в функцию обработчика события

```js
const Emitter = require("events");

const emitter = new Emitter();
const eventName = "greet";

emitter.on(eventName, function(data){
    console.log(data);
});

emitter.emit(eventName, "Привет пир!");
```

### Наследование от EventEmitter

**Приложении как набор сложных объектов**

- можно определять события

    - их надо связать с объектом **EventEmitter**

```js
// app.js

const util = require("util");
const EventEmitter = require("events");

const eventName = "greet";

function User() {}

util.inherits(User, EventEmitter);

User.prototype.sayHi = function(data) {
    this.emit(eventName, data);
}

const user = new User();

// добавляем к объекту user обработку события "greet"
user.on(eventName, (data) => console.log(data));

user.sayHi("Зай, мне нужна твоя одежда...");
```

## Буферы

- бинарный тип данных

    - глобальный объект

**[Для создания бинарного типа](https://nodejs.org/api/buffer.html#buffer_buffer)**

**Помните fs?**

```js
// По умолчанию значение data тоже является буфером
fs.readFile('file.txt', (err, data) => {
  if (err) return console.error(err);

  console.log(data);
});
```


**Note:** **data** выполняет роль буфера при работе с файлами

## Stream’ы

**Стандартный подход к буферизации**

![Стандартный подход к буферизации](./buffer__standart.png "Стандартный подход к буферизации")

**Note:** ждём полной загрузки буфера

**Поточный подход к буферизации**

![Поточный подход к буферизации](./buffer__stream.png "Поточный подход к буферизации")

> **Stream’ы** в **Node** являются абстракцией, обозначающей непрерывное разбиение данных на фрагменты

**Типы stream’ов**

- **readable**

- **writable**

- **duplex**

- **transform**

![Stream’ы](./fun__01.jpeg "Stream’ы")

**А ведь мы знакомы с потоками!**

```js
const http = require("http");

http.createServer((request, response) => { ... }).listen(3000);
```

- **request**

    - поток для чтения

- **response**

    - поток для записи

**Используя потоки чтения и записи, мы можем считывать и записывать информацию в файл**

```js
const fs = require("fs");

const writeableStream = fs.createWriteStream("hello.txt");

writeableStream.write("Привет мир!");
writeableStream.write("Продолжение записи \n");
writeableStream.end("Завершение записи");

const readableStream = fs.createReadStream("hello.txt", "utf8");

readableStream.on("data", function(chunk){
    console.log(chunk);
});
```

- поток разбивается на ряд кусков или **chunk**

- при считывании каждого такого куска

    - возникает событие **data**

        - с помощью метода **on**

            - подписаться на это событие

                - получить каждый кусок данных

**Только файлы?**

- сетевые потоки,

- потоки шифрования

- архивации

- т.д.

**Note:** общие принципы работы с ними те же, что и у файловых потоков

**Зачем**

Большие объёмы данных:

- низкая производительность

- ограничен размер буфера примерно 1 Гб

**Наиболее востребованные реализации stream’ов**

- HTTP-запросы и отклики

- стандартные операции ввода/вывода

- чтение из файлов и запись в них

**Note:** **stream** события — наследуют от объекта "эмиттер событий"

## Pipe

> **Pipe** - это канал, который связывает поток для чтения и поток для записи и позволяет сразу считать из потока чтения в поток записи

**Для чего они нужны?**

**Пример**

- копирование данных

```js
const fs = require("fs");

const readableStream = fs.createReadStream("hello.txt", "utf8");
const writeableStream = fs.createWriteStream("some.txt");

readableStream.on("data", (chunk) => {
    writeableStream.write(chunk);
});
```

**С pipe**

```js
const fs = require("fs");

const readableStream = fs.createReadStream("hello.txt", "utf8");
const writeableStream = fs.createWriteStream("some.txt");

readableStream.pipe(writeableStream);
```

- архивация файла

```js
const fs = require("fs");
const zlib = require("zlib");

const readableStream = fs.createReadStream("hello.txt", "utf8");
const writeableStream = fs.createWriteStream("hello.txt.gz");
const gzip = zlib.createGzip();

readableStream.pipe(gzip).pipe(writeableStream);
```

- каждый метод **pipe**

    - возвращает поток для чтения

        - можно применить **pipe** снова

            - записи в другой поток

                - и по новой



# COFFEE BREAK
![Знания сила](./fun__00.jpg "Знания сила")



## Сервер

- [http](https://nodejs.org/api/http.html)

```js
const http = require("http");

http.createServer((request, response) => {
    response.end("Hello world!");
}).listen(3000);
```

- **request**

    - хранит информацию о запросе

- **response**

    - управляет отправкой ответа

**Request**

- **headers**

    - возвращает заголовки запроса

- **method**

    - тип запроса (**GET**, **POST**, **DELETE**, **PUT** и тд.)

- **url**

    - запрошенный адрес

```js
const http = require("http");

http.createServer((request, response) => {
    console.log("Url: " + request.url);
    console.log("Тип запроса: " + request.method);
    console.log("User-Agent: " + request.headers["user-agent"]);
    console.log("Все заголовки");
    console.log(request.headers);

    response.end();
}).listen(3000);
```

**Response**

- **statusCode**

    - устанавливает статусный код ответа

- **statusMessage**

    - устанавливает сообщение, отправляемое вместе со статусным кодом

- **setHeader(name, value)**

    - добавляет в ответ один заголовок

- **write**

    - пишет в поток ответа некоторое содержимое

- **writeHead**

    - добавляет в ответ статусный код и набор заголовков

```js
const http = require("http");

http.createServer(function(request, response){
    response.setHeader("UserId", 12);
    response.setHeader("Content-Type", "text/html");
    response.write("<h2>hello world</h2>");
    response.end();
}).listen(3000);
```


### Отправка статических файлов

- **public/index.html**

```js
// app.js

const http = require("http");
const fs = require("fs");

http.createServer((request, response) => {
    console.log(`Запрошенный адрес: ${request.url}`);

    if(request.url.startsWith("/public/")){
        // получаем путь после слеша
        const filePath = request.url.substr(1);

        fs.readFile(filePath, (error, data) => {
            if(error){
                response.statusCode = 404;
                response.end("Ресурс не найден!");
            } else {
                response.end(data);
            }
        })
    } else{
        // во всех остальных случаях отправляем строку hello world!
        response.end("Hello World!");
    }
}).listen(3000);
```

### Stream и отправка файлов

- работа с большими файлами

    - использование потоков

```js
// app.js

const http = require("http");
const fs = require("fs");

http.createServer((request, response) => {
    if(request.url === "/some.png") {
        response.writeHead(200, {"Content-Type" : "image/png"});

        fs.createReadStream("some.png").pipe(response);
    } else {
        response.end("hello world!");
    }

}).listen(3000);
```

- **fs.createReadStream** создаёт поток для чтения

    - получения данных из потока метод **pipe**

        - передается объект интерфейса **stream.Writable** или поток для записи

            - **http.ServerResponse** реализует этот интерфейс

## Кластеры

**Минусы**

- один **thread**

**Выход**

- **[cluster](https://nodejs.org/api/cluster.html)**

**Итого**

- возможность использовать все ресурсы процессора на любой машине

или

- вертикально масштабировать Node-приложения

**Код очень прост**

- импортируем модуль

- один мастер и несколько работников

- обычно по одному процессу на каждый ЦПУ

    - не является незыблемым правилом

        - сколько пожелаете процессов

            - но с определённого момента прирост производительности прекратится

                - закон убывания доходности

```js
// cluster.js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```


## Обработка асинхронных ошибок

- **try/catch**

```js
try {
    throw new Error('Fail!')
} catch (e) {
    console.log(`Custom Error:  ${e.message}`);
}
```

**Кто скажет в чем минус?**

```js
try {
    setTimeout(function () {
        throw new Error('Fail!')
    }, Math.round(Math.random()*100));
} catch (e) {
    console.log(`Custom Error:  ${e.message}`);
}
```

![Работа над ошибками](./fun__05.jpg "Работа над ошибками")

### `on('error')`

- прослушивайть события **error**

    - генерируемые большинством основных объектов

```js
server.on('error', (err) => {
    console.error(err);
    process.exit(1);
})
```

### uncaughtException

- очень грубый механизм обработки ошибок

- всегда прослушивайте **uncaughtException** в объекте **process**

- если ошибка не обработана

    - приложение находится в неопределённом состоянии

```js
process.on('uncaughtException', (err) => {
    console.error(`uncaughtException:  ${err.message}`);
    console.error(err.stack);
    process.exit(1);
});
```

**или**

```js
process.addListener('uncaughtException', (err) => {
    console.error(`uncaughtException:  ${err.message}`);
    console.error(err.stack);
    process.exit(1);
});
```

## Аддоны на С/С++

**Плюсы**

- **Node.js** позволяет забавляться с более низкоуровневым кодом на **С/С++**

**Иии?**

Разработка для

- железа

- IoT

- дронов

- роботов

- умных гаджетов

**Тут куют собственные аддоны на  С/С++!**

**Напишем аддон с нуля?**

![Напишем аддон с нуля С++?](./fun__02.jpg "Напишем аддон с нуля на С++?")

- создадим файл **hello.cc**

    - поместим несколько шаблонных импортов

    - определим метод

        - возвращающий строковое значение

        - экспортирующий себя

```cc
#include <node.h>

namespace demo {

using v8::FunctionCallbackInfo;
using v8::HandleScope;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "capital one")); // String
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method); // Exporting
}

NODE_MODULE(addon, init)

}
```

- создадим файл **binding.gyp**

```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "hello.cc" ]
    }
  ]
}

```

- установим `node-gyp`

```bash
npm install -g node-gyp;

node-gyp configure;
node-gyp build;
```

- проверим **build/Release/**

- напишем наш скрипт

```js
const addon = require('./build/Release/addon');

console.log(addon.hello());
```

![Как забыть С++](./forgetCpp.jpg "Как забыть С++")

## [Express](http://expressjs.com/ru/)

**Предоставляет ряд готовых абстракций, которые упрощают**

- создание сервера

- серверной логики

**Подробнее**

- обработка отправленных форм

- работа с куками

- CORS

- т.д.

**Пройдёмся по примерам**

- **package.json**

```bash
npm init;
```

- установим фреймворк

```bash
npm install express --save;
```

- **app.js**

```js
// подключение express
const express = require("express");

// создаем объект приложения
const app = express();

// определяем обработчик для маршрута "/"
app.get("/", function(request, response){
    response.send("<h1>Главная страница</h1>");
});

app.get("/about", function(request, response){
    response.send("<h1>О сайте</h1>");
});

app.get("/contact", function(request, response){
    response.send("<h1>Контакты</h1>");
});

// начинаем прослушивать подключения на 3000 порту
app.listen(3000);
```

## Конвейер обработки запроса

**Что происходит?**

- **Express** получил запрос

    - запрос передается в конвейер обработки

**Из чего состоит?**

- набор компонентов или **middleware**

    - получают данные запроса

        - решают как его обрабатывать

**Пример?**

Смотрим выше `app.get`

**А ещё?**

```js
const express = require("express");

const app = express();

app.use(function(request, response, next){
    console.log("Middleware 1");
    next();
});

app.use(function(request, response, next){
    console.log("Middleware 2");
    next();
});

app.get("/", function(request, response){
    console.log("Route /");
    response.send("Hello");
});

app.listen(3000);
```

**Что за параметры?**

- **request** данные запроса

- **response** объект для управления ответом

- **next** следующая в конвейере обработки функция

**Note:** необязательно вызывать все последующие **middleware**

**Что ещё?**

**middleware**  могут сопоставляться с определенными маршрутами

```js
const express = require("express");

const app = express();

app.use(function(request, response, next) {
    console.log("Middleware 1");
    next();
});

app.use("/about", function(request, response, next) {
    console.log("About Middleware");
    response.send("About Middleware");
});

app.get("/", function(request, response){
    console.log("Route /");
    response.send("Hello");
});

app.listen(3000);
```

**Стандартная задача**

- логгирование запросов

```js
const express = require("express");
const fs = require("fs");

const app = express();

app.use(function(request, response, next) {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")} \n`;

    console.log(data);
    fs.appendFile("server.log", data);
    next();
});

app.get("/", function(request, response){
    response.send("Hello");
});

app.listen(3000);
```

## Заключение

- Эмиттеры событий

- Буферы

- Stream’ы

- Pipe

- Сервер

- Кластеры

- Обработка асинхронных ошибок

- Аддоны на С/С++

- Express

- Конвейер обработки запроса

**Молодцы выдержали!!!**

[<< prev](../28.node--01) | [next >>](../30.node--03)

## Справочники

- [Ад callback’ов](http://callbackhell.com/)

- [документации по буферу](https://nodejs.org/api/buffer.html#buffer_buffer)

- [http](https://nodejs.org/api/http.html)

- [Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)

- [руководство](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27)

- [Express](http://expressjs.com/ru/)