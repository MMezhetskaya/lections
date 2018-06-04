# Lection 30. Node p.03.

## Маршрутизация

**Опора Express**

- в приложении определяются маршруты

    - обработчики этих маршрутов

- запрос соответствует маршруту

    - вызывается соответствующий обработчик

**Пример**

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

**Рассмотрим детальнее**

Определения маршрутов могут содержать

- регулярные выражения

- специальные символы подстановок

    - ?, +, * и ().

**В деталях**

- **?**

    - предыдущий символ может встречаться 1 раз или отсутствовать

```js
// "/bk", "/bok"
app.get("/bo?k", function (request, response) {
    response.send(request.url)
});
```

- **+**

    - предыдущий символ может встречаться 1 и более раз

```js
//  "/bok", "/book", "/boook"
app.get("/bo+k", function (request, response) {
    response.send(request.url)
});
```

- __*__

    - на месте данного символа может находиться любое количество символов

```js
//  "/bork", "/bonk", "/bor.dak", "/bor/ok"
app.get("/bo*k", function (request, response) {
    response.send(request.url)
});
```

- __()__

    - позволяют оформить группу символов, которые могут встречаться в запросе

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

- для работы с **body**

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

    <form action="/register" method="post" id="form">
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

<form action="/user" method="post" id="form">
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

<script>
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const userName = this.elements["userName"].value;
        const userAge = this.elements["userAge"].value;

        fetch(this.getAttribute('action'), {
            method: this.getAttribute('method'),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                userAge: userAge
            })
        })
        .then((res) => console.log(res))
        .catch((res) => console.log(res));
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

**Note:** c клиентом мы взаимодействуем через формат **json**, то данные клиенту отправляются с помощью метода **response.json**



# COFFEE BREAK
![Знания сила](./fun__00.jpg "Знания сила")



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

## EJS

- **.ejs**

```ejs
<!DOCTYPE html>
<html>
<head>
    <title><%=title %></title>
    <meta charset="utf-8" />
</head>
<body>
    <h1><%=title %> в EJS</h1>

    <% if(emailsVisible) {%>
        <h3>Электронные адреса</h3>
        <ul>
            <% for(var i=0; i<emails.length;i++) {%>
                <li><%=emails[i] %></li>
            <%} %>
        </ul>
    <%} %>
    <p>Телефон: <%=phone %></p>
</body>
<html>
```

## Создание [RESTful](https://ru.wikipedia.org/wiki/REST) API

**Особенность REST**

- сервер не запоминает состояние пользователя между запросами

    - в каждом запросе передаётся информация, идентифицирующая пользователя

**Всё взаимодействие с сервером сводится к 4 операциям**

1. получение данных с сервера (обычно в формате JSON, или XML)

2. добавление новых данных на сервер

3. модификация существующих данных на сервере

4. удаление данных на сервере

**Note:**  4 - это необходимый и достаточный минимум, может быть больше(CONNECT, DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE)

**Для каждого типа операции используется свой метод HTTP-запроса:**

1. получение - **GET**

2. добавление - **POST**

3. модификация - **PUT**

4. удаление - **DELETE**

**Пример**

```
GET-запрос /rest/users - получение информации о всех пользователях

GET-запрос /rest/users/125 - получение информации о пользователе с id=125

POST-запрос /rest/users - добавление нового пользователя

PUT-запрос /rest/users/125 - изменение информации о пользователе с id=125

DELETE-запрос /rest/users/125 - удаление пользователя с id=125
```

**Удобен для  Single Page Application**

- уже установлены **body-parser**, **express**

**Что будем делать?**

- создадим экспериментальный проект

    - будет хранить данные в файле `json`

**Задача**

Показать создание **API** в **Node.js** в стиле **REST**

**Реализация**

- **users.json**

```json
[{
  "id":1,
  "name":"Tom",
  "age":24
},
{
  "id":2,
  "name":"Bob",
  "age":27
},
{
  "id":3,
  "name":"Alice",
  "age":"23"
}]
```

- **app.js**

```js
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/public"));

// получение списка данных
app.get("/api/users", function(req, res) {
    const content = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(content);

    res.send(users);
});

// получение одного пользователя по id
app.get("/api/users/:id", function(req, res){
    const id = req.params.id; // получаем id
    const content = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(content);

    let user = null;

    // находим в массиве пользователя по id
    for(let i = 0; i < users.length; i++){
        if(users[i].id == +id){
            user = users[i];
            break;
        }
    }

    // отправляем пользователя
    (user) ? res.send(user) : res.status(404).send();
});

// получение отправленных данных
app.post("/api/users", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {
        name: userName,
        age: userAge
    };

    let data = fs.readFileSync("users.json", "utf8");

    const users = JSON.parse(data);

    // находим максимальный id
    const id = Math.max.apply(Math, users.map(u => u.id));


    // увеличиваем его на единицу
    user.id = id + 1;

    // добавляем пользователя в массив
    users.push(user);

    data = JSON.stringify(users);

    // перезаписываем файл с новыми данными
    fs.writeFileSync("users.json", data);

    res.send(user);
});

// удаление пользователя по id
app.delete("/api/users/:id", function(req, res){
    const id = req.params.id;
    const data = fs.readFileSync("users.json", "utf8");

    let index = -1;

    const users = JSON.parse(data);

    // находим индекс пользователя в массиве
    for(let i = 0; i < users.length; i++){
        if(users[i].id == +id){
            index = i;
            break;
        }
    }

    if(index > -1){
        // удаляем пользователя из массива по индексу
        const user = users.splice(index, 1)[0];
        const data = JSON.stringify(users);

        fs.writeFileSync("users.json", data);

        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

// изменение пользователя
app.put("/api/users", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);

    const userId = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;

    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);

    let user = null;

    for(let i = 0; i < users.length; i++){
        if(users[i].id == +userId){
            user = users[i];
            break;
        }
    }

    // изменяем данные у пользователя
    if(user) {
        user.age = userAge;
        user.name = userName;

        const data = JSON.stringify(users);

        fs.writeFileSync("users.json", data);
        res.send(user);
    } else {
        res.status(404).send(user);
    }
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});
```

- **index.html**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Список пользователей</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body>

<main class="container">
    <h2>Список пользователей</h2>

    <form name="userForm" id="form">
        <input type="hidden" name="id" value="0" />

        <p class="form-group">
            <input class="form-control" name="name" placeholder="Имя" />
        </p>

        <p class="form-group">
            <input class="form-control" name="age" placeholder="Возраст" />
        </p>

        <p class="panel-body">
            <button type="submit" class="btn btn-sm btn-primary">Сохранить</button>
            <button type="reset" id="resetBtn" class="btn btn-sm btn-primary">Сбросить</button>
        </p>
    </form>

    <table class="table table-condensed table-striped table-bordered">
        <thead>
        <tr>
            <th>Id</th>
            <th>Имя</th>
            <th>возраст</th>
            <th></th>
        </tr>
        </thead>
        <tbody id="tableBody">
        </tbody>
    </table>
</main>

<script>
    // Получение всех пользователей
    function GetUsers() {
        fetch('/api/users', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((users) => tableBody.innerHTML = users.reduce((rows, user) => rows + row(user), ''))
            .catch((res) => console.log(res));
    }

    // Получение одного пользователя
    function GetUser(id) {
        fetch(`/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((user) => {
                form.elements["id"].value = user.id;
                form.elements["name"].value = user.name;
                form.elements["age"].value = user.age;
            })
            .catch((res) => console.log(res));
    }

    // Добавление пользователя
    function CreateUser(userName, userAge) {
        fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                age: userAge
            })
        })
            .then((res) => res.json())
            .then((user) => {
                form.elements["id"].value = 0;
                tableBody.innerHTML += row(user);
            })
            .catch((res) => console.log(res));
    }

    // Изменение пользователя
    function EditUser(userId, userName, userAge) {
        fetch('/api/users/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userId,
                name: userName,
                age: userAge
            })
        })
            .then((res) => res.json())
            .then((user) => {
                const childsTD = document.querySelector(`tr[data-rowid='${user.id}']`).children;

                childsTD[1].innerHTML = user.name;
                childsTD[2].innerHTML = user.age;

                reset();
            })
            .catch((res) => console.log(res));
    }

    // Удаление пользователя
    function DeleteUser(id) {
        fetch(`api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((user) => document.querySelector(`tr[data-rowid='${user.id}']`).remove())
            .catch((res) => console.log(res));
    }

    // создание строки для таблицы
    function row(user) {
        return `<tr data-rowid='${user.id}'><td>${user.id}</td><td>${user.name}</td><td>${user.age }</td><td><a class='editLink' data-id='${user.id}'>Изменить</a> | <a class='removeLink' data-id='${user.id}'>Удалить</a></td></tr>`;
    }

    // сброс значений формы
    resetBtn.click(() => reset());

    function reset() {
        form.elements["id"].value = 0;
    }

    // отправка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const id = this.elements["id"].value;
        const name = this.elements["name"].value;
        const age = this.elements["age"].value;

        (+id === 0) ? CreateUser(name, age) : EditUser(id, name, age);
    });

    tableBody.addEventListener('click', function(e) {
        e.preventDefault();

        const targetBtn = e.target;

        // нажимаем на ссылку Изменить
        targetBtn.className === "editLink" && GetUser(targetBtn.getAttribute('data-id'));

        // нажимаем на ссылку Удалить
        targetBtn.className === "removeLink" && DeleteUser(targetBtn.getAttribute('data-id'));
    });

    // загрузка пользователей
    GetUsers();
</script>
</body>
</html>
```

[<< prev](../29.node--02) | [next >>](../31.node--04)

## Заключение

- Express

- Конвейер обработки запроса

- Маршрутизация

- Статические файлы

- POST-запросы и работа с формой

- JSON и AJAX

- Представления(View)

- Частичные представления(Partial views)

- EJS

- Создание RESTful API

## Справочники

- [Handlebars](https://handlebarsjs.com/)