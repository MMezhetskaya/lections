# Lection 08

## Объекты как сущности

>Внутренняя основа, содержание, смысл, суть чего-н. 
>**@ Google**

- методы объектов
 
 ```js
var user = {
    name: 'Alec'
};

user.sayHi = function() {
    console.log('Привет!');
};

user.sayHi();
```

## Доступ к объекту через this

- ключевое слово **this**

```js
var user = {
    name: 'Alec',

    sayHi: function() {
        console.log(this.name);
    }
};

user.sayHi();
```

- можно по имени

```js
var user = {
    name: 'Alec',
    
    sayHi: function() {
        console.log(user.name);
    }
};

user.sayHi();
```

- или аргументом

```js
var user = {
    name: 'Alec',
    
    sayHi: function() {
        showName(this);
    }
};

function showName(namedObj) {
    console.log(namedObj.name);
}

user.sayHi();
```

**Вывод**

>Любая функция может иметь в себе **this**, совершенно неважно, объявлена ли она в объекте или отдельно от него. 
>Значение **this** называется контекстом вызова и будет определено в момент вызова функции.

```js
function sayHi() {
    console.log(this.firstName);
}
```

- одна и ту же функция в контексте разных объектов

```js
var user = { 
        firstName: "Вася"
     },
    admin = { 
        firstName: "Админ" 
    };

function func() {
    console.log(this.firstName);
}

user.f = func;
admin.g = func;

// this равен объекту перед точкой:
user.f(); // Вася
admin.g(); // Админ
admin['g'](); // Админ (не важно, доступ к объекту через точку или квадратные скобки)
```

**Вывод**

>Значение **this** не зависит от того, как функция была создана, оно определяется исключительно в момент вызова.

- Значение **this** при вызове без контекста

```js
function func() {
    console.log(this); // выведет [object Window] или [object global]
}

func();
```

режим **use strict**

```js
function func() {
    "use strict";
    
    console.log(this); // выведет undefined (кроме IE9-)
}

func();
```

## Дескрипторы

```js
var user = {};

// 1. простое присваивание
user.name = "Alec";

// 2. указание значения через дескриптор
Object.defineProperty(
    user,
    "name",
    { 
        value: "Alec",
        configurable: true,
        writable: true,
        enumerable: true
    }
);
```

Основной метод для управления свойствами – **Object.defineProperty**

```js
Object.defineProperty(obj, prop, descriptor)
```

- **obj** - объект, в котором объявляется свойство

- **prop** - имя свойства, которое нужно объявить или модифицировать

- **descriptor** - объект, который описывает поведение свойства

**Свойства дескриптора:**

- **value(undefined)** – значение свойства

- **writable(false)** – значение свойства можно менять, если **true**

- **configurable(false)** – если **true**, то свойство можно удалять, а также менять его в дальнейшем при помощи новых 
вызовов **defineProperty**

- **enumerable(false)** – если **true**, то свойство просматривается в цикле **for..in** и методе **Object.keys()**

- **get(undefined)** – функция, которая возвращает значение свойства

- **set(undefined)** – функция, которая записывает значение свойства


```js
"use strict";

var user = {};

Object.defineProperty(user, "name", {
    value: "Alec",
    writable: false, // запретить присвоение "user.name="
    configurable: false // запретить удаление "delete user.name"
});

// Теперь попытаемся изменить это свойство.
// в strict mode присвоение "user.name=" вызовет ошибку
user.name = "Петя";
```

## Преобразование объектов 

**Логическое преобразование**

Любой объект в логическом контексте – **true**, даже если это пустой массив **[]** или объект **{}**

```js
if ({} && []) {
    console.log( "Все объекты - true!" );
}
```

**Строковое преобразование**

```js
var user = {
    firstName: 'Alec'
};

console.log(user + ''); 
```

- **toString**

```js
var user = {
    firstName: 'Alec',
    
    toString: function() {
        return 'Пользователь ' + this.firstName;
    }
};

console.log(user + ''); 
```

**Численное преобразование**

>Для численного преобразования объекта используется метод **valueOf**, а если его нет – то **toString**

```js
var room = {
    number: 777,
    
    valueOf: function() { 
        return this.number;
    },
    
    toString: function() { 
        return this.number;
    }
};

console.log(+room);

delete room.valueOf;

console.log(+room);

delete room.toString;
```

**Вывод**

- в логическом контексте объект – всегда **true**

- при строковом преобразовании объекта используется его метод **toString** -  - любое примитивное значение, причём не 
обязательно именно строку

- для численного преобразования используется метод **valueOf** - любое примитивное значение.
 
*У большинства объектов **valueOf** не работает (возвращает сам объект и потому игнорируется), при этом для численного 
преобразования используется **toString**
 
## Конструктор

>В объектно-ориентированном программировании конструктор класса (от англ. **constructor**) — специальный блок инструкций, вызываемый при создании объекта.
>**@ Wiki**

Нужно создать много однотипных объектов

- обычный синтаксис {...} позволяет создать один объект. 

- **функции-конструкторы**

```js
function Animal(name) {
    this.name = name;
    this.canWalk = true;
}

var animal = new Animal("кот");
```

**Включим режим понимания**

```js
function Animal(name) {
    // создаётся новый пустой объект
    // {}
    
    // ключевое слово this получает ссылку на этот объект
    // this = {};
    
    // функция выполняется, она модифицирует this, добавляет методы, свойства
    this.name = name;
    this.canWalk = true;
    
    // возвращается this
    // return this;
}
```

**Вывод**

- любая функция может быть вызвана с **new** 

    - новый пустой объект в качестве **this**, в который она добавляет свойства
    
    - если функция не решит возвратить свой объект, то её результатом будет **this**

- функции, которые предназначены для создания объектов, называются конструкторами
 
    - названия конструкторов пишут с большой буквы, чтобы отличать от обычных

## ООП

**Раньше**

- **процедурный подход** - программа состоит из функций, вызывающих друг друга

**Сейчас**

- **ООП** - парадигма программирования, которая использует абстракции, чтобы создавать модели, основанные на 
объектах реального мира 

- **ООП** использует несколько техник из ранее признанных парадигм
     
    - **модульность**
     
    - **наследование**
     
    - **полиморфизм**
     
    - **инкапсуляция**

- **ООП** представляет программное обеспечение как 

    - совокупность взаимодействующих объектов
    
    - каждый объект может получать сообщения, обрабатывать данные, и отправлять сообщения другим объектам
    
    - каждый объект может быть представлен как маленькая независимая машина с отдельной ролью или ответственностью

- **ООП** - способствует большей гибкости и поддерживаемости в программировании, и широко распространена в крупномасштабном программном инжиниринге, благодаря модульности

- **ООП** – это наука о том, как делать правильную архитектуру. У неё есть свои принципы, например [SOLID](https://ru.wikipedia.org/wiki/SOLID_(%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BD%D0%BE-%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5))

## Терминология

- **класс** - определяет характеристики объекта

- **полиморфизм** - различные классы могут объявить один и тот же метод или свойство

- **наследование** - класс может наследовать характеристики от другого класса

- **инкапсуляция** - отделение и защита внутреннего интерфейса

## ООП в функциональном стиле

```js
function User(name) {
    this.sayHi = function() {
        console.log( "Привет, я " + name );
    };
}

var vasya = new User("Alec");

vasya.sayHi();
```

*класс **User** написан в **функциональном** стиле

## Прототипное программирование

**Прототипное программирование** — это модель **ООП** которая не использует классы.

>Объекты организованы в цепочки так, чтобы свойство, не найденное в одном объекте, автоматически искалось бы в другом. Связующим звеном выступает специальное свойство `__proto__`

```js
var animal = {
    eats: true
};

var rabbit = {
    jumps: true
};

rabbit.__proto__ = animal;

// в rabbit можно найти оба свойства
console.log(rabbit.jumps); // true
console.log(rabbit.eats); // true
```

*объект, на который указывает ссылка `__proto__`, называется **прототипом**

## Функционально - прототипное программирование

- методы в прототипном стиле

- свойства в функциональном стиле

```js
function User(name) {
    this.name = name;
}

User.prototype.sayHi = function() {
    console.log( "Привет, я " + this.name );
};

var userAdmin = new User('Admin'),
    userGuest = new User('Guest');

User.prototype.showRole = function() {
     console.log("Только ...");
 };
```

**Достоинства**

- функциональный стиль записывает в каждый объект и свойства и методы, а прототипный – только свойства. Поэтому 
прототипный стиль – быстрее и экономнее по памяти.

**Недостатки**

- при создании методов через прототип, мы теряем возможность использовать локальные переменные как приватные свойства, у них больше нет общей области видимости с конструктором.

## Наследование 

```js
// 1. Конструктор Animal
function Animal(name) {
    this.name = name;
    this.speed = 0;
}

// 1.1. Методы -- в прототип
Animal.prototype.stop = function() {
  this.speed = 0;
  console.log(this.name + ' стоит');
}

Animal.prototype.run = function(speed) {
  this.speed += speed;
  console.log(this.name + ' бежит, скорость ' + this.speed);
};

// 2. Конструктор Rabbit
function Rabbit(name) {
  this.name = name;
  this.speed = 0;
}

// 2.1. Наследование
Rabbit.prototype = Object.create(Animal.prototype);
Rabbit.prototype.constructor = Rabbit;

// 2.2. Методы Rabbit
Rabbit.prototype.jump = function() {
  this.speed++;
  console.log( this.name + ' прыгает, скорость ' + this.speed );
}
```

## Заключение

- Объекты как сущности

- Доступ к объекту через **this**

- **Дескрипторы**

- Преобразование объектов

- **Конструктор**

- **ООП**


## ДЗ

### Задание 1

Реализуйте класс **Worker**, который будет иметь следующие свойства: **name**, **surname**, **rate**, **days**. 
 
Также класс имеет метод **getSalary()**, который выводит зарплату работника.

Зарплата - произведение ставки **rate** на количество отработанных дней **days**.

```js
var worker00 = new Worker(
    {
        name: 'Иван', 
        surname: 'Иванов',
        rate: 10, 
        days: 20
    }
);

console.log(worker00.name);
console.log(worker00.surname);
console.log(worker00.rate);
console.log(worker00.days);
console.log(worker00.getSalary());
```

С помощью класса **Worker** создайте 3х рабочих и добавьте метод **getTotalSalary()** выводящий сумму их зарплат.

### Задание 2

Создайте класс **Director** который должен наследовать свойства класса **Worker**, и иметь методы

- **addWorker({name: workerName, surname: workerSurname, rate: workerRate, days: workerDays})** - добавит работника в
 список

- **removeWorker(workerName)** - удалит работника из списока

- **getWorker(workerName)** - получить все данные работника

- **setWorkerRate(workerName, rate)** - обновить **rate**  для работника

```js
var director = new Director(
    {
        name: 'Alec', 
        surname: 'P',
        rate: 30, 
        days: 20
    }
);

director.addWorker('Петя', 'Петров', 10, 20);
director.removeWorker('Петя');
director.getWorker('Петя');
director.setWorkerRate('Петя', 11);
```

**Подсказки**

Прочитайте про каждый элемент из списка, и при необходимости не стесняемся использовать

- **querySelector**

- **querySelectorAll**

- **innerHTML**

- **submit** 

- **click** 

- **addEventListener** 

- **event.preventDefault()**

- **reduce** 

- **push**

- **map**

- **new**

- **prototype**

- **for (key in object)**

Не забываем включать логику, сначала проектируем - потом пишем код!

## Справочники
- [SOLID](https://ru.wikipedia.org/wiki/SOLID_(%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BD%D0%BE-%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)).