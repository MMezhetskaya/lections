# Lection 30. Node p.03.

## Express

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

**Express** получил запрос

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

## Маршрутизация

**Опора Express**

- в приложении определяются маршруты

    - обработчики этих маршрутов

- запрос соответствует маршруту

    - вызывается соответствующий обработчик

**Пример**

Смотрим выше

**Рассмотрим детальнее**

Определения маршрутов могут содержать

- регулярные выражения

- специальные символы подстановок

    - ?, +, * и ().

**Пример**

- **?** предыдущий символ может встречаться 1 раз или отсутствовать

```js
// "/bk", "/bok"
app.get("/bo?k", function (request, response) {
    response.send(request.url)
});
```

- **+** предыдущий символ может встречаться 1 и более раз

```js
//  "/bok", "/book", "/boook"
app.get("/bo+k", function (request, response) {
    response.send(request.url)
});
```

- __*__ на месте данного символа может находиться любое количество символов

```js
//  "/bork", "/bonk", "/bor.dak", "/bor/ok"
app.get("/bo*k", function (request, response) {
    response.send(request.url)
});
```

- __()__ позволяют оформить группу символов, которые могут встречаться в запросе

```js
//  "/book", "/book.html"
app.get("/book(.html)?", function (request, response) {
    response.send(request.url)
});
```

- и конечно же регулярки

```js
app.get(/.*(\.)html$/, function (request, response) {
  response.send(request.url)
});
```

### Передача параметров в маршруте

- именованные сегменты URL-адреса

- символы из диапазона `[A-Za-z0-9_]`

```js
const express = require("express");

const app = express();

app.get("/products/:productId", function (request, response) {
    response.send("productId: " + request.params["productId"])
});

app.listen(3000);
```

- комбинации параметров

```js
...

app.get("/categories/:categoryId/products/:productId", function (request, response) {
    const catId = request.params["categoryId"];
    const prodId = request.params["productId"];

    response.send(`Категория: ${catId}  Товар: ${prodId}`);
});

app.get("/book/:pageName.:pageExt", function (request, response) {
    const pageName = request.params["pageName"];
    const pageExt = request.params["pageExt"];

    response.send(`Запрошенный файл: ${pageName}.${pageExt}`);
});

...
```

### express.Router

- позволяет определить маршрут

    - в рамках которого можно создавать подмаршруты

```js
...

const productRouter = express.Router();

productRouter.route("/")
    .get(function(request, response){
        response.send("Список товаров");
    });

productRouter.route("/:id")
    .get(function(request, response){
        response.send(`Товар ${request.params.id}`);
    });

app.use("/products", productRouter);

app.get("/", function(request, response){
    response.send("Главная страница");
});

...
```



# COFFEE BREAK
![Знания сила](./fun__00.jpg "Знания сила")



## Статические файлы

- **public/about.html**

```html
<!DOCTYPE html>
<html>
<head>
    <title>О сайте</title>
    <meta charset="utf-8" />
</head>
<body>
    <h1>О сайте</h1>
    <p>Сделано с помощью Node.js и Express</p>
</body>
<html>
```

- **app.js**

```js
const express = require("express");

const app = express();

// Вот тут то и оно
app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response){
    response.send("<h1>Главная страница</h1>");
});

app.get("/contact", function(request, response){
    response.send("<h1>Контакты</h1>");
});

app.listen(3000);
```

**Note:** можем изменить путь к каталогу статических файлов `app.use("/ВАШ_ПУТЬ", express.static(__dirname + "/public"));`

## POST-запросы и работа с формой

- для работы с **DOM**

```bash
npm install body-parser --save
```

- **public/register.html**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Регистрация</title>
    <meta charset="utf-8" />
</head>
<body>
    <h1>Введите данные</h1>

    <form action="/register" method="post">
        <p>
            <input type="text" name="userName" placeholder="Имя" />
        </p>

        <p>
            <input type="number" name="userAge" placeholder="Возраст" />
        </p>

        <p>
            <button type="submit">Отправить</button>
        </p>
    </form>
</body>
<html>
```

- **app.js**

```js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + "/public"));

app.post("/register", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);

    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.get("/", function(request, response){

    response.send("<h1>Главная страница</h1>");
});

app.listen(3000);
```

## JSON и AJAX

- снова нам нужен он **body-parser**

- обновим **public/register.html**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Регистрация</title>
    <meta charset="utf-8" />
</head>
<body>
    <h1>Введите данные</h1>

    <form action="/user" method="post">
        <p>
            <input type="text" name="userName" placeholder="Имя" />
        </p>

        <p>
            <input type="number" name="userAge" placeholder="Возраст" />
        </p>

        <p>
            <button type="submit">Отправить</button>
        </p>
    </form>

    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script>
        $("form").submit(function(e) {
            e.preventDefault();

            const $form = $(this);
            const userName = this.elements["userName"].value;
            const userAge = this.elements["userAge"].value;

            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: JSON.stringify({
                    userName: userName,
                    userAge: userAge
                }),
                dataType: "json",
                contentType: "application/json",
                success: function(data){
                    console.log(data);
                }
            });
        });
    </script>
</body>
<html>
```

- обновим **app.js**

```js
...

// создаем парсер для данных в формате json
const jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/public"));

app.post("/user", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);

    console.log(request.body);
    response.json(`${request.body.userName} - ${request.body.userAge}`);
});

app.get("/", function(request, response){
    response.send("<h1>Главная страница</h1>");
});

...
```

## Представления(View)

**Шаблонизаторы или view engine**

- Pug, Jade, Dust, Nunjucks, EJS, Handlebars и другие

**За базу возьмём [Handlebars](https://handlebarsjs.com/)**

- установим **hbs**

```bash
npm install hbs --save
```

- **app.js**

```js
...

app.set("view engine", "hbs");

app.get("/", function(request, response){
    response.send("Главная страница");
});

app.get("/contact", function(request, response){
    response.render("contact.hbs", {
        title: "Мои контакты",
        emailsVisible: true,
        emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
        phone: "+1234567890"
    });
});

...
```

- **views/contact.hbs**

```hbs
<!DOCTYPE html>
<html>
<head>
    <title>{{title}}</title>
    <meta charset="utf-8" />
</head>
<body>
    <h1>{{title}}</h1>
    {{#if emailsVisible}}
        <h3>Электронные адреса</h3>
        <ul>
            {{#each emails}}
                <li>{{this}}</li>
            {{/each}}
        </ul>
    {{/if}}
    <p>Телефон: {{phone}}</p>
</body>
<html>
```

## Частичные представления

**Зачем?**

- вынести общие элементы

**Пример**

- **views/partials/menu.hbs**

```hbs
<nav><a href="/">Главная</a> | <a href="/contact">Контакты</a></nav>
```

- **views/partials/footer.hbs**

```hbs
<footer><p>MyCorp - Copyright © 2017</p></footer>
```

- **views/contact.hbs**

```hbs
<!DOCTYPE html>
<html>
<head>
    <title>{{title}}</title>
    <meta charset="utf-8" />
</head>
<body>
    {{> menu}}

    <h1>{{title}}</h1>
    <p>Электронный адрес: {{email}}</p>
    <p>Телефон: {{phone}}</p>

    {{> footer}}
</body>
<html>
```

- **views/home.hbs**

```hbs
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
    <meta charset="utf-8" />
</head>
<body>
    {{> menu}}

    <h1>Главная страница</h1>

    {{> footer}}
</body>
<html>
```

- **app.js**

```js
...
const hbs = require("hbs");
...

// устанавливаем путь к каталогу с частичными представлениями
hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");

app.get("/", function(request, response){
    response.render("home.hbs");
});

app.get("/contact", function(request, response){

    response.render("contact.hbs", {
        title: "Мои контакты",
        email: "gavgav@mycorp.com",
        phone: "+1234567890"
    });
});

...
```

## Заключение

## Справочники

- [Handlebars](https://handlebarsjs.com/)