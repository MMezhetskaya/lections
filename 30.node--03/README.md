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

## Заключение

## Справочники
