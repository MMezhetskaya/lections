# Lection 11

## Статические свойства и методы

- методы и свойства, которые не привязаны к конкретному экземпляру объекта

- записывают прямо в саму функцию-конструктор

**Свойства**
 
```js
function Article() {
    Article.count++;
}

//хранят данные, специфичные не для одного объекта, а для всех статей целиком
Article.count = 0; // статическое свойство - переменная
Article.DEFAULT_FORMAT = "html"; // статическое свойство - константа
```

**Методы**

```js
function Article() {
    Article.count++;
}

Article.count = 0;
Article.showCount = function() {
    console.log(this.count); // (1)
}

// использование
new Article();
new Article();
Article.showCount(); // (2)
```
 
## Фабричные методы

**Задача**

Рассмотрим ситуацию, когда объект нужно создавать различными способами

- анонимные `new User()`

- с данными `new User({name: 'Вася', age: 25})`

**Решение**

- полиморфная функцию-конструктор `User`

```js
var guest = new User(),
    knownUser = new User({
        name: 'Вася',
        age: 25
    });

guest.sayHi(); // Аноним
knownUser.showName(); // Вася

function User(userData) {
    if (userData) { // если указаны данные -- одна ветка if
        this.name = userData.name;
        this.age = userData.age;
    } else { // если не указаны -- другая
        this.name = 'Аноним';
    }

    this.showName = function() {
        console.log(this.name);
    };
}
```

- подход с использованием фабричных методов

```js
var guest = User.createAnonymous(),
    knownUser = User.createFromData({
        name: 'Вася',
        age: 25
    });

guest.showName();
knownUser.showName();


//Вместо разбора параметров в конструкторе – делаем два метода: User.createAnonymous и `User.createFromData
function User() {
    this.showName = function() {
        console.log(this.name);
    };
}

User.createAnonymous = function() {
    var user = new User;

    user.name = 'Аноним';

    return user;
}

User.createFromData = function(userData) {
    var user = new User;

    user.name = userData.name;
    user.age = userData.age;

    return user;
}
```

**Вывод**

- лучшая читаемость кода

    - конструктора – вместо одной большой функции несколько маленьких

    - вызывающего кода – явно видно, что именно создаётся

- лучший контроль ошибок, т.к. если в  `createFromData` ничего не передали, то будет ошибка, а полиморфный конструктор создал бы анонимного посетителя

- удобная расширяемость

    - нужно добавить создание администратора без аргументов

        - `User.createAdmin = function() { ... }`

        - для полиморфного конструктора вызов без аргумента создаст анонима, так что нужно добавить параметр – "тип посетителя" и усложнить этим код

**Статические свойства и методы объекта удобно применять в следующих случаях**

- общие действия и подсчёты, имеющие отношения ко всем объектам данного типа

- методы, не привязанные к конкретному объекту, например кол-во вызовов

- фабричные методы.

## Явное указание this: call, apply

>**this** – это текущий объект при вызове "через точку" и новый объект при конструировании через `new`

```js
var targetObject = {
    name: 'Alec',
    showName: function() {
        console.log(this.name);
    }
};

targetObject.showName();
```

### Метод call

**Синтаксис**

```js
function foo(arg1, arg2, ...) {
    // this is object context
    console.log(this, arg1, arg2, ..);
}

foo.call(context, arg1, arg2, ...)
```

**Важно**

- вызов `foo.call(context, a, b...)` – то же, что обычный вызов `foo(a, b...)`, но с явно указанным `this(=context)`

```js
function showFullName() {
    console.log( this.firstName + " " + this.lastName );
}
```

```js
var user = {
    firstName: "Василий",
    lastName: "Алибабаевич"
};

// функция вызовется с this=user
showFullName.call(user) // "Василий Алибабаевич”

function showFullName() {
    console.log(this.firstName + " " + this.lastName);
}
```

- аргументы

```js
var user = {
    firstName: "Василий",
    surname: "Алибабаевич",
    patronym: "Иванович"
};

// foo.call(контекст, аргумент1, аргумент2, ...)
showFullName.call(user, 'firstName', 'surname') // "Василий Алибабаевич"
showFullName.call(user, 'firstName', 'patronym') // "Василий Иванович"

function showFullName(firstPart, lastPart) {
    console.log(this[firstPart] + " " + this[lastPart]);
}
```

### Метод apply

**Важно**

Вызов функции при помощи `foo.apply(this, [arg1, arg2, ...])` работает аналогично `foo.call(this, arg1, arg2, ...)`, но принимает массив аргументов вместо списка

**Синтаксис**

``` js
foo.call(context, arg1, arg2);
foo.apply(context, [arg1, arg2]);
```

```javascript
showFullName.call(user, 'firstName', 'surname');
showFullName.apply(user, ['firstName', 'surname']);
```

```js
Math.max(1, 5, 2)
```

```js
var arr = [1, 3, 7];

// получить максимум из элементов arr
console.log( Math.max.apply(null, arr) ); // 7

Math.max(1,2,3);
Math.max.apply(null, [1, 2, 3])
```


## Одалживание метода

При помощи **call** можно легко взять метод одного объекта, в том числе встроенного, и вызвать в контексте другого.

Это называется "одалживание метода" (на англ. method borrowing).

**Пример**

Используем эту технику для упрощения манипуляций с **arguments**.

**arguments** не  псевдо-массив(обычный объект)

- нет полезных методов как **push**, **pop**, **join** и тд

```js
function printArgs() {
    arguments.join = [].join; // одолжили метод (1)

    var argStr = arguments.join(':'); // (2)

    console.log(argStr); // сработает и выведет 1:2:3
}

printArgs(1, 2, 3);
```

**Почему вызов сработает?**

- Метод **join** массива скопирован и вызван в контексте **arguments**

- Не произойдёт ли что-то плохое от того, что **arguments** – не массив?

- Почему он, вообще, сработал?

**Ответ**

В соответствии со спецификацией, внутри **join** реализован примерно так:

```js
function join(separator) {
    if (!this.length) return '';

    var str = this[0];

    for (var i = 1; i < this.length; i++) {
        str += separator + this[i];
    }

    return str;
}
```

Как видно, используется

- **this**

- числовые индексы

- свойство **length**

**Вывод**

Если эти свойства есть, то все в порядке. А больше ничего и не нужно. В качестве **this** подойдёт даже обычный объект:

```js
var obj = { // обычный объект с числовыми индексами и length
    0: "А",
    1: "Б",
    2: "В",
    length: 3
};

obj.join = [].join;

console.log( obj.join(';') ); // "A;Б;В”
```

Представим на минуту, что вместо **arguments** у нас – произвольный объект, у него тоже есть

- числовые индексы

- **length**

Мы хотим вызвать в его контексте метод `[].join`. То есть, ситуация похожа на **arguments**, но **(!)** вполне возможно, что у объекта есть свой метод **join**

```js
function printArgs() {
    var join = [].join; // скопируем ссылку на функцию в переменную

    // вызовем join с this=arguments,
    // этот вызов эквивалентен arguments.join(':') из примера выше
    var argStr = join.call(arguments, ':');

    console.log(argStr); // сработает и выведет 1:2:3
}

printArgs(1, 2, 3);
```

```js
function printArgs() {
    // вызов arr.slice() скопирует все элементы из this в новый массив
    var args = [].slice.call(arguments);

    console.log(args.join(', ')); // args - полноценный массив из аргументов
}

printArgs('Привет', 'мой', 'мир'); // Привет, мой, мир
```


## Привязка контекста и карринг: bind

Функции в **JS** никак не привязаны к своему контексту **this**

- это позволяет быть максимально гибкими, одалживать методы и так далее

**Пример**

```js
var user = {
    firstName: "Вася",
    showName: function() {
        console.log(this.firstName);
    }
};

setTimeout(user.showName, 1000);
```

```js
var user = {
    firstName: "Вася",
    showName: function() {
        console.log(this.firstName);
    }
};

setTimeout(function() {
    user.showName();
}, 1000);
```


```js
var user = {
    firstName: "Вася",
    showName: function() {
        console.log(this.firstName);
    }
};

setTimeout(user.showName.bind(user), 1000);
```

- синтаксис встроенного **bind**

```js
var wrapper = foo.bind(context, arg1, arg2, ...)
```

Методы **bind** и **call**/**apply** близки по синтаксису, но есть важнейшее отличие

- **call**/**apply** вызывают функцию с заданным контекстом и аргументами

- **bind** не вызывает функцию, oн только возвращает "обёртку"

    - можно вызвать позже

    - передаст вызов в исходную функцию, с привязанным контекстом

```js
function bind(func, context) {
    return function() {
        return func.apply(context, arguments);
    };
}
```

### Карринг

>**Карринг (currying)** или **каррирование** – термин функционального программирования, который означает создание новой функции путём фиксирования аргументов существующей.

**Пример**

Функция умножения двух чисел mul(a, b):

```js
function mul(a, b) {
    return a * b;
};
```

```js
// double умножает только на два
var double = mul.bind(null, 2); // контекст фиксируем null, он не используется

console.log( double(3) ); // = mul(2, 3) = 6
console.log( double(4) ); // = mul(2, 4) = 8
console.log( double(5) ); // = mul(2, 5) = 10
```

- `double` является "частичной функцией" (partial function) от `mul`


**Выигрыш то в чем?**

- имеет понятное имя (double)

- повторные вызовы позволяют не указывать каждый раз первый аргумент, он уже фиксирован благодаря bind

**Вывод**

- функция сама по себе не запоминает контекст выполнения

- чтобы гарантировать правильный контекст для вызова `foo.func()`, нужно использовать функцию-обёртку, задать её через анонимную функцию:

```js
setTimeout(function() {
    obj.func();
})
```

Либо использовать **bind**

```js
setTimeout(obj.func.bind(obj));
```

- вызов **bind** часто используют для привязки функции к контексту, чтобы затем присвоить её в обычную переменную и вызывать уже без явного указания объекта

- вызов **bind** также позволяет фиксировать первые аргументы функции ("каррировать" её)

    - из общей функции получить её "частные" варианты

        - использовать их многократно без повтора одних и тех же аргументов каждый раз

## Функции-обёртки, декораторы

>**Декоратор** – приём программирования, который позволяет взять существующую функцию и изменить/расширить ее поведение.

**Декоратор** получает функцию и возвращает обертку, которая делает что-то своё "вокруг" вызова основной функции.

Этот приём называется "форвардинг вызова" (от англ. forwarding).

- текущий контекст и аргументы через **apply** передаются в функцию `f`

    - изнутри `f` всё выглядит так, как была вызвана она напрямую, а не декоратор

```js
var timers = {};

// прибавит время выполнения f к таймеру timers[timer]
function timingDecorator(f, timer) {
    return function() {
        var start = performance.now(),
            result = f.apply(this, arguments);

        if (!timers[timer]) {
            timers[timer] = 0;
        }

        timers[timer] += performance.now() - start;

        return result;
    }
}

// функция может быть произвольной, например такой:
var fibonacci = function f(n) {
    return (n > 2) ? f(n - 1) + f(n - 2) : 1;
}

// использование: завернём fibonacci в декоратор
fibonacci = timingDecorator(fibonacci, "fibo");

// неоднократные вызовы...
fibonacci(10);
fibonacci(20);
// ...

// в любой момент можно получить общее количество времени на вызовы
console.log( timers.fibo + 'мс' );
```

**Декораторы** способны упростить рутинные, повторяющиеся задачи, вынести их из кода функции

```js
function sum(a, b) {
    return a + b;
}

// передадим в функцию для сложения чисел нечисловые значения
console.log( sum(true, { name: "Вася", age: 35 }) );
```

```js
// обернём декоратор для проверки
var sum = typeCheck(sum, [checkNumber, checkNumber]); // оба аргумента - числа

sum(3, 4);

function sum(a, b) {
    return a + b;
}

// вспомогательная функция для проверки на число
function checkNumber(value) {
    return typeof +value === 'number';
}

// декоратор, проверяющий типы для f
// второй аргумент checks - массив с функциями для проверки
function typeCheck(f, checks) {
    return function() {
        for (var i = 0; i < arguments.length; i++) {
            if (!checks[i](arguments[i])) {
                console.error( "Некорректный тип аргумента номер " + i );
                return;
            }
        }

        return f.apply(this, arguments);
    }
}
```

- повторное использование

```js
var save = checkPermissionDecorator(save),
    remove = checkPermissionDecorator(remove);
    ...
    add = checkPermissionDecorator(add);

function save() { ... }

function remove() { ... }

...

function add() { ... }

function checkPermissionDecorator(f) {
    return function() {
        if (isAdmin()) {
            return f.apply(this, arguments);
        }

        console.log( 'Недостаточно прав' );
    }
};
```

**Вывод**

- **декоратор** – это обёртка над функцией, которая модифицирует её поведение

- основную работу по-прежнему выполняет функция

- декораторы можно не только повторно использовать, но и комбинировать!

## Заключение

- Статические свойства и методы

- Фабричные методы

- Явное указание **this**: **call**, **apply**

- Одалживание метода

- Привязка контекста: **bind**

- Функции-обёртки, декораторы

## ДЗ

**Задание 1**

- предыдущее задание

- конструктор **Component** содержит список всех созданных потомков(при **delete** потомок удаляется из списка)

- `renderPage() => Component.renderPage()` все потомки рендерятся в порядке **order** и добавляются к **body**

**Задание 2**

- при клике на пункт меню, рендерится блок соответсвующий странице обновляя текущий елемент `main` новым блоком

**Запуск**

```js
var componentHeader = new Component({parent: 'header', url: 'путь к лого',  title: 'заголовок'}),
    componentMenu = new Component({parent: 'nav'}),
    componentAbout = new Component({parent: 'main'}),
    componentContact = new Component({parent: 'main'}),
    componentArticles = new Component({parent: 'main'}),
    componentFooter = new Component({parent: 'footer', text: 'Корирайты'}),
    viewHeader = '<h1><img src="{url}" alt="{title}"/>  {title}</h1>',
    viewMenu = '<ul>{li}</ul>',
    viewArticle = '<section><h2>Home</h2>{article}</section>',
    viewFooter = '<p><small>{text}</small</p>',
    viewContact = '<section><h2>Contact</h2><form><textarea>Text</textarea><button type="submit">submit</button><form></section>',
    viewAbout = '<section><h2>About</h2><ul>{list}<ul></section>',
    dataMenu = [
        {
           name: 'Главная',
           url: 'componentArticles'
        },
        {
           name: 'O нас',
           url: 'componentAbout',
           items: [
               {name: 'Кто мы', url: 'www'},
               {name: 'Где мы', url: 'www'},
               {name: 'Откуда', url: 'www'}
           ]
        },
        {
           name: 'Контакты',
           url: 'componentContact'
        }
    ],
    dataArticle = [
        {name: 'Статья 1', url: 'www', text: 'Some text for you'},
        {name: 'Статья 2', url: 'www', text: 'Some text for you'},
        {name: 'Статья 3', url: 'www', text: 'Some text for you'}
    ],
    dataAbout = [
         {name: 'Name0', surname: 'Surname0', age: '18', profile: 'www', from: 'City'},
         {name: 'Name1', surname: 'Surname1', age: '18', profile: 'www', from: 'City'},
         {name: 'Name2', surname: 'Surname2', age: '18', profile: 'www', from: 'City'}
     ]

componentHeader.setView(viewHeader);
componentMenu.setView(viewMenu, dataMenu);
componentArticles.setView(viewArticle, dataArticle);
componentContact.setView(viewContact, dataContact);
componentAbout.setView(viewAbout);
componentFooter.setView(viewFooter);

Component.renderPage(componentHeader, componentMenu, componentArticles, componentFooter);

// Default - Component.renderPage(componentHeader, componentMenu, componentArticles, componentFooter);
// Homepage - Component.renderPage(componentArticles);
// About - Component.renderPage(componentAbout);
// Contact - Component.renderPage(componentContact);
```
