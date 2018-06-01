# Lection 31. Node p.04.

## Создание [RESTful](https://ru.wikipedia.org/wiki/REST) API

**Особенность REST**

- сервер не запоминает состояние пользователя между запросами

    - в каждом запросе передаётся информация, идентифицирующая пользователя

**Всё взаимодействие с сервером сводится к 4 операциям**

1. получение данных с сервера (обычно в формате JSON, или XML)

2. добавление новых данных на сервер

3. модификация существующих данных на сервере

4. удаление данных на сервере

**Note:**  4 - это необходимый и достаточный минимум, в конкретной реализации типов операций может быть больше(CONNECT, DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE)

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
app.get("/api/users", function(req, res){
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
        if(users[i].id == id){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user) {
        res.send(user);
    } else {
        res.status(404).send();
    }
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
        if(users[i].id === id){
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
        if(users[i].id === userId){
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

- **public/index.html**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Список пользователей</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
</head>
<body>

<main class="container">
    <h2>Список пользователей</h2>

    <form name="userForm">
        <input type="hidden" name="id" value="0" />

        <p class="form-group">
            <input class="form-control" name="name" placeholder="Имя" />
        </p>

        <p class="form-group">
            <input class="form-control" name="age" placeholder="Возраст" />
        </p>

        <p class="panel-body">
            <button type="submit" class="btn btn-sm btn-primary">Сохранить</button>
            <button type="reset" id="reset" class="btn btn-sm btn-primary">Сбросить</button>
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
        <tbody>
        </tbody>
    </table>
</main>

<script>
    // Получение всех пользователей
    function GetUsers() {
        $.ajax({
            url: "/api/users",
            type: "GET",
            contentType: "application/json",
            success: function (users) {
                let rows = "";

                $.each(users, function (index, user) {
                    // добавляем полученные элементы в таблицу
                    rows += row(user);
                });

                $("table tbody").append(rows);
            }
        });
    }

    // Получение одного пользователя
    function GetUser(id) {
        $.ajax({
            url: `/api/users/${id}`,
            type: "GET",
            contentType: "application/json",
            success: function (user) {
                const form = document.forms["userForm"];

                form.elements["id"].value = user.id;
                form.elements["name"].value = user.name;
                form.elements["age"].value = user.age;
            }
        });
    }

    // Добавление пользователя
    function CreateUser(userName, userAge) {
        $.ajax({
            url: "api/users",
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify({
                name: userName,
                age: userAge
            }),
            success: function (user) {
                reset();
                $("table tbody").append(row(user));
            }
        })
    }

    // Изменение пользователя
    function EditUser(userId, userName, userAge) {
        $.ajax({
            url: "api/users",
            contentType: "application/json",
            method: "PUT",
            data: JSON.stringify({
                id: userId,
                name: userName,
                age: userAge
            }),
            success: function (user) {
                reset();
                $("tr[data-rowid='" + user.id + "']").replaceWith(row(user));
            }
        })
    }

    // сброс формы
    function reset() {
        const form = document.forms["userForm"];

        form.elements["id"].value = 0;
    }

    // Удаление пользователя
    function DeleteUser(id) {
        $.ajax({
            url: `api/users/${id}`,
            contentType: "application/json",
            method: "DELETE",
            success: function (user) {
                console.log(user);
                $("tr[data-rowid='" + user.id + "']").remove();
            }
        })
    }

    // создание строки для таблицы
    function row(user) {
        return `<tr data-rowid='${user.id}'><td>${user.id}</td><td>${user.name}</td><td>${user.age }</td><td><a class='editLink' data-id='${user.id}'>Изменить</a> | <a class='removeLink' data-id='${user.id}'>Удалить</a></td></tr>`;
    }

    // сброс значений формы
    $("#reset").click(function (e) {
        reset();
    });

    // отправка формы
    $("form").submit(function (e) {
        e.preventDefault();

        const id = this.elements["id"].value;
        const name = this.elements["name"].value;
        const age = this.elements["age"].value;

        (id === 0) ? CreateUser(name, age) : EditUser(id, name, age);
    });

    // нажимаем на ссылку Изменить
    $("body").on("click", ".editLink", function () {
        const id = $(this).data("id");

        GetUser(id);
    });

    // нажимаем на ссылку Удалить
    $("body").on("click", ".removeLink", function () {
        const id = $(this).data("id");

        DeleteUser(id);
    });

    // загрузка пользователей
    GetUsers();
</script>
</body>
</html>
```

## [MongoDB](https://www.mongodb.com/)

- нет таблиц, схем, запросов SQL, внешних ключей

**А что тогда?**

- [документо-ориентированная модель данных](https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%B0%D1%8F_%D0%A1%D0%A3%D0%91%D0%94)

**Плюсы**

- быстрее

- лучшая масштабируемость

- легче использовать

**Важно!**

- где-то лучше **MongoDB**

    - хранить сложные по структуре данные

- где-то лучше традиционные реляционные базы данных.

- можно использовать смешенный подход

    - один тип данных в **MongoDB**

    - другой тип данных в традиционных

**Note:** функциональность **MongoDB** позволяет расположить несколько баз данных на нескольких физических серверах(не нарушая целостность)

**Формат данных в MongoDB**

- **BSON**

**Кроссплатформенность**

- написана на **C++**

**Документы вместо строк**

- можно представить как хранилище **ключей** и **значений**

    - **ключ** простая метка

        - ассоциированная с определенным куском данных

**Коллекции**

- коллекции могут содержать самые разные объекты(вместо таблицы)

![Коллекции mongodb](./mongo__collections.png "Коллекции mongodb")

```json
{
    "name": "Alec",
    "surname": "Pov",
    "age": "17",
    "company": {
        "name" : "Some Company",
        "year" : "2017",
        "price" : "300000"
    }
}
```

**Репликация**

- есть основной узел,

    - может быть набор вторичных узлов

        - автоматически обновляются вместе с обновлением главного узла

**Простота в использовании**

- нет жесткой схемы базы данных

    - легкое масштабирование

    - нет траты времени на пересоздание базы данных

    - нет траты времени на построение сложных запросов

**Технология GridFS**

- сохранение данных большого размера

    - две коллекции

        - **files** имена файлов и их метаданные

        - **chunks** данные файлов в виде небольших сегментов

**[Самостоятельно изучить MongoDB](https://university.mongodb.com/)**

## Node.js и MongoDB

- **[установим сервер MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/?_ga=2.205151449.87750550.1527684453-1743588063.1527684453)** и **драйвер MongoDB**

```bash
npm install mongodb --save
```

- **[MongoDB Compass](https://www.mongodb.com/download-center?jmp=hero#compass)**

**Процесс работы**

- запуск сервера(специфика системы)

- подключение к серверу

- получение объекта базы данных на сервере

- получение объекта коллекции в базе данных

- взаимодействие с коллекцией (добавление, удаление, получение, изменение данных)

**Подключение к базе данных**

```js
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/";
const user = {name: "Alec", age: 17};

MongoClient.connect(url, { useNewUrlParser: true }, function(err, client){
    const db = client.db("usersdb");
    const collection = db.collection("users");

    collection.insertOne(user, function(err, result){
        if(err) return console.log(err);

        console.log(result.ops);
        client.close();
    });
});
```

- адрес сервера

    - протокол устанавливается "mongodb://"

- callback

    - **err**

    - **client**

        - ссылка на подключенный к серверу клиент

        - **client.db**

        - **db.collection**

        - **insertOne** метод коллекции

            - **err**

                - ошибка, которая может возникнуть при операции

            - **result**

                - результат операции

        - закрыть соединение

**Note:** если нет подобной базы данных **MongoDB**, будет создана при первом обращении

## Добавление и получение данных

- **insertOne**, **insertMany**

```js
...

const users = [{name: "Alec", age: 17} , {name: "Bob", age: 21}, {name: "Tom", age: 45}];

MongoClient.connect(url, { useNewUrlParser: true }, function(err, client){
    const db = client.db("usersdb");
    const collection = db.collection("users");

    collection.insertMany(users, function(err, result){
        if(err) return console.log(err);

        console.log(result.ops);
        client.close();
    });
});
```

- **find** и **findOne**

    - можно использовать как фильтр

        - `collection.find({name: "Alec"}`

    - возвращает специальный обьект [Cursor](http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html)

        - **toArray**

```js
...

MongoClient.connect(url, { useNewUrlParser: true }, function(err, client){
    const db = client.db("usersdb");
    const collection = db.collection("users");

    if(err) return console.log(err);

    collection.find().toArray(function(err, results){
        console.log(results);
        client.close();
    });
});
```

## Удаление документов

- **deleteOne**

    - удаляет один документ, который соответствует определенному критерию

- **deleteMany**

    - удаляет все документы, которые соответствуют определенному критерию

- **findOneAndDelete**

    - получает и удаляет один документ, который соответствует определенному критерию

    - **deleteOne** vs **findOneAndDelete** возвращает удаленный документ

- **drop**

    - удаляет всю коллекцию

## Обновление документов

- **updateOne**

    - обновляет один документ, который соответствует критерию фильтрации

        - возвращает информацию об операции обновления

- **updateMany**

    - обновляет все документы, которые соответствуют критерию фильтрации

        - возвращает информацию об операции обновления

- **findOneAndUpdate**

    - обновляет один документ, который соответствует критерию фильтрации

        - возвращает старое состояние документ

```js
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const jsonParser = bodyParser.json();
const url = "mongodb://localhost:27017/";

app.use(express.static(__dirname + "/public"));

app.get("/api/users", function(req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        client.db("usersdb")
            .collection("users")
            .find()
            .toArray(function(err, users) {
                res.send(users);
                client.close();
            });
    });
});

app.get("/api/users/:id", function(req, res){
    const id = new ObjectId(req.params.id);

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        client.db("usersdb")
            .collection("users")
            .findOne(
                {_id: id},
                function(err, user){
                    if(err) return res.status(400).send();

                    res.send(user);
                    client.close();
                }
            );
    });
});

app.post("/api/users", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {name: userName, age: userAge};

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        client.db("usersdb")
            .collection("users")
            .insertOne(
                user,
                function(err, result) {
                    if(err) return res.status(400).send();

                    res.send(user);
                    client.close();
                }
            );
    });
});

app.delete("/api/users/:id", function(req, res){
    const id = new ObjectId(req.params.id);

    MongoClient.connect(url, { useNewUrlParser: true },  function(err, client){
        client.db("usersdb")
            .collection("users")
            .findOneAndDelete(
                {_id: id},
                function(err, result) {
                    if(err) return res.status(400).send();

                    const user = result.value;

                    res.send(user);
                    client.close();
                }
            );
    });
});

app.put("/api/users", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);

    const id = new ObjectId(req.body._id);
    const userName = req.body.name;
    const userAge = req.body.age;

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client){
        client.db("usersdb")
            .collection("users")
            .findOneAndUpdate(
                {_id: id},
                {
                    $set: {
                        age: userAge,
                        name: userName
                    }
                },
                {
                    returnOriginal: false
                },
                function(err, result){

                    if(err) return res.status(400).send();

                    const user = result.value;

                    res.send(user);
                    client.close();
                }
            );
    });
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});
```

## [Mongoose](http://mongoosejs.com/)

- **ODM** библиотека (Object Data Modelling)

    - сопоставлять объекты классов и документы коллекций из базы

```bash
npm install mongoose --save
```

- **app.js**

```js
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

 // для работы с promise
 mongoose.Promise = global.Promise;

 // установка схемы
 const userScheme = new Schema({
     name: String,
     age: Number
 });

 // подключение
 mongoose.connect("mongodb://localhost:27017/usersdb");

 const User = mongoose.model("User", userScheme);
 const user = new User({
     name: "Alec",
     age: 17
 });


user.save(function(err){
    mongoose.disconnect();  // отключение от базы данных

    if(err) return console.log(err);
    console.log("Сохранен объект", user);
});
```

- потому-что промис

```js
user.save()
.then(function(doc){
    console.log("Сохранен объект", doc);
    mongoose.disconnect();  // отключение от базы данных
})
.catch(function (err){
    console.log(err);
    mongoose.disconnect();
});
```

### Схемы в Mongoose

**Определяют метаданные модели**

- свойства

- [типы данных](http://mongoosejs.com/docs/schematypes.html)

    - **String**

    - **Number**

    - **Date**

    - **Buffer**

    - **Boolean**

    - **Mixed**

    - **Objectid**

    - **Array**

- доп. инфа

```js
// сложный объект
const userScheme = new Schema({
    name: String,
    age: Number,
    company: {
        name: String,
        employee: [String], // тип - массив строк
        date: Date
    }
});
```

### Значение по умолчанию

- **default**

```js
const userScheme = new Schema({
    name: {
        type: String,
        default: "NoName"
    },
    age: {
        type: Number,
        default: 22
    }
});

...

const User = mongoose.model("User", userScheme);
const user1 = new User(); // name - NoName, age - 22
const user2 = new User({name: "Alec"}); // name - Alec, age - 17
const user3 = new User({age: 31}); // name - NoName, age - 31
```

### Валидация

- **required**

    - требует обязательного наличия значения для свойства

- **min/max**

    - задают минимальное и максимальное значения для числовых данных

- **minlength/maxlength**

    - задают минимальную и максимальную длину для строк

- **enum**

    - строка должна представлять одно из значений в указанном массиве строк

- **match**

    - строка должна соответствовать регулярному выражению

```js
...

// установка схемы
const userScheme = new Schema({
    name: {
        type: String,
        required: true,
        minlength:3,
        maxlength:20
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max:100
    }
});

const User = mongoose.model("User", userScheme);
const user = new User({name: "Me"});

user.save()
    .then(function(doc){
        console.log("Сохранен объект", doc);
        mongoose.disconnect();  // отключение от базы данных
    })
    .catch(function (err){
        console.log(err);
        mongoose.disconnect();
    });
```

### Версия документа

- **`__v`**

```js
const userScheme = new Schema(
    {
        name: String,
        age: Number
    },
    {
        versionKey: false
    }
);
```

### CRUD в Mongoose

- **save/create**

```js
// установка схемы
const userScheme = new Schema({
    name: {
        type: String,
        required: true,
        minlength:3,
        maxlength:20
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max:100
    }
});

const User = mongoose.model("User", userScheme);

User.create({name: "Bob", age: 34})
    .then(function(doc){
        console.log("Сохранен объект", doc);
        mongoose.disconnect();  // отключение от базы данных
    })
    .catch(function (err){
        console.log(err);
        mongoose.disconnect();
    });
```

- **получение данных**

    - **find**

        - возвращает все объекты, которые соответствуют критерию фильтрации

    - **findById**

        - возвращает один объект по значению поля **_id**

    - **findOne**

        - возвращает один объект, который соответствует критерию фильтрации
```js
const userScheme = new Schema({
    name: String,
    age: Number
});
const User = mongoose.model("User", userScheme);

User.find()
    .then(function(doc){
        console.log(doc);
        mongoose.disconnect();
    })
    .catch(function (err){
        console.log(err);
        mongoose.disconnect();
    });
```

- **remove**

    - **findOneAndRemove**

    - **findByIdAndRemove**

```js
const userScheme = new Schema({
    name: String,
    age: Number
});
const User = mongoose.model("User", userScheme);

User.remove({age: 17})
    .then(function(doc){
        console.log(doc);
        mongoose.disconnect();
    })
    .catch(function (err){
        console.log(err);
        mongoose.disconnect();
    });
```

- **update**

    - **findByIdAndUpdate**

        - **{new: true}**

```js
...

User.update({name: "Alec"}, {name: "Alec P"})
    .then(function(doc){
        console.log(doc);
        mongoose.disconnect();
    })
    .catch(function (err){
        console.log(err);
        mongoose.disconnect();
    });
```

```js
...

const id = "SOME_ID";
User.update(id, {name: "Alec P"})
    .then(function(doc){
        console.log(doc);
        mongoose.disconnect();
    })
    .catch(function (err){
        console.log(err);
        mongoose.disconnect();
    });
```


## Заключение

- Создание RESTful API

- MongoDB

- Node.js и MongoDB

- Добавление и получение данных

- Удаление документов

- Обновление документов

- Express и MongoDB

- Mongoose

## Справочники

- [RESTful](https://ru.wikipedia.org/wiki/REST)

- [MongoDB](https://www.mongodb.com/)

- [University mongodb](https://university.mongodb.com/)

- [MongoDB download](https://www.mongodb.com/)

- [Установка сервера MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/?_ga=2.205151449.87750550.1527684453-1743588063.1527684453)

- [MongoDB Compass](https://www.mongodb.com/download-center?jmp=hero#compass)

- [Документо-ориентированная модель данных](https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%B0%D1%8F_%D0%A1%D0%A3%D0%91%D0%94)

- [Cursor](http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html)

- [Mongoose](http://mongoosejs.com/)

- [Mongoose типы данных](http://mongoosejs.com/docs/schematypes.html)