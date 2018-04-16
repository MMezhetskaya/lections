# Lection 13

## Что такое [QUnit](http://qunitjs.com/)

### Утверждения

> Утверждение - это выражение, которое прогнозирует возвращаемый результат при выполнении вашего кода. Если прогноз неверный, то утверждение имеет значение **false**, что позволяет сделать выводы о наличии ошибок.

- строительный блок модульного тестирования - утверждение

- **example__qunit.html**

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Комплект для тестов QUnit</title>
    <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.4.1.css">
    <script src="https://code.jquery.com/qunit/qunit-2.4.1.js"></script>
    <!-- Файл вашего проекта  -->
    <script type="text/javascript" src="js/test.js"></script>
    <!-- Файл ваших тестов -->
    <script type="text/javascript" src="js/qunit_test.js"></script>
</head>
<body>
    <h1 id="qunit-header">Комплект для тестов QUnit</h1>

    <h2 id="qunit-banner"></h2>

    <div id="qunit-testrunner-toolbar"></div>

    <h2 id="qunit-userAgent"></h2>

    <ol id="qunit-tests"></ol>
</body>
</html>
```

- **js/test.js**

```js
function isEven(val) {
    return val % 2 === 0;
}
```

- **js/qunit_test.js**

```js
QUnit.test('isEven()', function(assert) {
    assert.ok(isEven(0), 'Ноль - четное число');
    assert.ok(isEven(2), 'Два - тоже');
    assert.ok(isEven(-4), 'И отрицательное четыре - тоже четное число');
    assert.ok(!isEven(1), 'Один - нечетное число');
    assert.ok(!isEven(-7), 'Как и отрицательное семь - нечетное число');
    assert.ok(isEven(3), 'Три - четное число');

});
```

### Структура утверждений

Размещать все утверждения в одном тесте - очень плохая идея

- сложно поддерживать

- можно запутаться в оценке результатов выполнения

**Решение - отдельные модули**

```js
QUnit.module('Модуль A');
QUnit.test('Тест', function() {});
QUnit.test('Еще один тест', function() {});


QUnit.module('Модуль B');
QUnit.test('Тест', function() {});
QUnit.test('Еще один тест', function() {});
```

## ES6

> Стандарт [ES6](http://www.ecma-international.org/publications/standards/Ecma-262.htm) был принят в июне 2015. Пока что большинство браузеров реализуют его частично, текущее состояние реализации различных возможностей можно посмотреть [здесь](https://kangax.github.io/compat-table/es6/).

**Все просто** - один конкретный движок JS, например V8 (Chrome)

- добавили директиву **use strict**

- погнали...


**Все сложно** - кросс-браузерная поддержка

- транспайлер

- погнали...

**[Babel.JS](http://babeljs.io/)** – это транспайлер, переписывающий код на ES5+ в код на предыдущем стандарте ES5.

Он состоит из двух частей:

 - cобственно транспайлер, который переписывает код.

 - полифилл, который добавляет методы.

**let, const и блочная область видимости**

- областью видимости `let` и `const` является ближайший блок

- при использовании `const` рекомендуется использовать ПРОПИСНЫЕ_БУКВЫ.

- в `const` одновременно с объявлением переменной должно быть присвоено значение

-  `let` и `const` не существуют до своего объявления

```js
let a = 2;

{
    let a = 3;
    console.log(a);
}

console.log(a);
```

```js
{
    const ARR = [5, 6];
    ARR.push(7);
    console.log(ARR); // [5,6,7]
    ARR = 10; // TypeError
    ARR[0] = 3; // значение можно менять
    console.log(ARR); // [3,6,7]
}
```

```js
{
    function foo () { return 1 }

    foo() === 1;

    {
        function foo () { return 2 }

        foo() === 2;
    }

    foo() === 1;
}
```

**Стрелочные функции**

```js
// Классическое функциональное выражение
let addition = function(a, b) {
    return a + b;
};

// Стрелочная функция
let addition = (a, b) => a + b;
```

```js
function Person() {
    // Конструктор Person() определяет `this` как экземпляр самого себя.
    this.age = 0;

    setInterval(function growUp() {
        // Без использования `use strict`, функция growUp() определяет `this`
        // как глобальный объект, который отличается от `this`,
        // определённого конструктором Person().
        this.age++;
    }, 1000);
}
var p = new Person();
```

```js
function Person() {
    this.age = 0;

    setInterval(() => {
        this.age++; // `this` относится к объекту person
    }, 1000);
}

var p = new Person();
```

**Параметры по умолчанию**

```js
let getFinalPrice = (price, tax = 0.7) => price + price * tax;

getFinalPrice(500); // 850, так как значение tax не задано
getFinalPrice(500, 0.2); // 600, значение tax по-умолчанию заменяется на 0.2
```

**Spread / Rest оператор**

`...` - оператор называют как `spread` или `rest`, в зависимости от того, как и где он используется

```js
function foo(x, y, z) {
    console.log(x, y, z);
}

let arr = [1, 2, 3];

// spread
foo(...arr); // 1 2 3
```

```js
function foo(...args) {
    console.log(args);
}

// rest
foo(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]
```

**Расширение возможностей литералов объекта**

```js
function getCar(make, model, value) {
    return {
        // с синтаксисом короткой записи можно
        // пропускать значение свойства, если оно
        // совпадает с именем переменной, значение
        // которой мы хотим использовать
        make,  // аналогично make: make
        model, // аналогично model: model
        value, // аналогично value: value

        // вычисляемые свойства теперь работают в
        // литералах объекта
        ['make' + make]: true,

        // Короткая запись метода объекта пропускает
        // ключевое слово `function` и двоеточие. Вместо
        // "depreciate: function() {}" можно написать:
        depreciate() {
            this.value -= 2500;
        }
    };
}

let car = getCar('Kia', 'Sorento', 40000);
console.log(car);
// {
//     make: 'Kia',
//     model:'Sorento',
//     value: 40000,
//     makeKia: true,
//     depreciate: function()
// }
```

**Восьмеричный и двоичный литералы**

```js
let oValue = 0o10;
console.log(oValue); // 8

let bValue = 0b10;
console.log(bValue); // 2
```


**Деструктуризация массивов и объектов**

```js
function foo() {
    return [1, 2, 3];
}

let arr = foo(); // [1,2,3]

let [a, b, c] = foo();

console.log(a, b, c); // 1 2 3
```

```js
function bar() {
    return {
        x: 4,
        y: 5,
        z: 6
    };
}
let { x: a, y: b, z: c } = bar();

console.log(a, b, c); // 4 5 6
```

```js
function f ([ name, val ]) {
    console.log(name, val)
}

function g ({ name: n, val: v }) {
    console.log(n, v)
}

function h ({ name, val }) {
    console.log(name, val)
}

f([ "bar", 42 ])
g({ name: "foo", val:  7 })
h({ name: "bar", val: 42 })
```

**Ключевое слово super для объектов**

```js
let parent = {
    foo() {
        console.log("Привет от Родителя!");
    }
}

let child = {
    foo() {
        super.foo();
        console.log("Привет от Ребёнка!");
    }
}

Object.setPrototypeOf(child, parent);
child.foo(); // Привет от Родителя!
             // Привет от Ребёнка!
```

**Строковые шаблоны и разделители**

```js
let user = 'Alec';

console.log(`Привет, ${user}!`); // Привет, Alec!
```

**for...of против for...in**

- `for...of` используется для перебора в цикле итерируемых объектов, например, массивов

```js
let nicknames = ['di', 'boo', 'punkeye'];

nicknames.size = 3;

for (let nickname of nicknames) {
    console.log(nickname);
}

// di
// boo
// punkeye
```

- `for...in` используется для перебора в цикле всех доступных для перебора (enumerable) свойств объекта

```js
let nicknames = ['di', 'boo', 'punkeye'];

nicknames.size = 3;

for (let nickname in nicknames) {
    console.log(nickname);
}

// 0
// 1
// 2
// size
```

**Map и WeakMap**

- для ключа и значения можно использовать любое значение (и объекты, и примитивы)

```js
let myMap = new Map();

let keyString = "строка",
    keyObj = {},
    keyFunc = function() {};

// устанавливаем значения
myMap.set(keyString, "значение, связанное со 'строка'");
myMap.set(keyObj, "значение, связанное с keyObj");
myMap.set(keyFunc, "значение, связанное с keyFunc");

myMap.size; // 3

// получаем значения
myMap.get(keyString);    // "значение, связанное со 'строка'"
myMap.get(keyObj);       // "значение, связанное с keyObj"
myMap.get(keyFunc);      // "значение, связанное с keyFunc"
```

- `WeakMap` это `Map`, в котором ключи обладают неустойчивыми связями, что позволяет не мешать сборщику мусора удалять элементы `WeakMap`

    - не беспокоиться об утечках памяти

- `WeakMap` каждый ключ должен быть объектом

```js
let w = new WeakMap();

w.set('a', 'b');
// Uncaught TypeError: Invalid value used as weak map key

var o1 = {},
    o2 = function(){},
    o3 = window;

w.set(o1, 37);
w.set(o2, "azerty");
w.set(o3, undefined);

w.get(o3); // undefined, потому что это заданное значение

w.has(o1); // true
w.delete(o1);
w.has(o1); // false
```

**Set и WeakSet**

- коллекции уникальных значений

- дублированные значения игнорируются

- значения могут быть примитивами или ссылками на объекты

```js
let mySet = new Set([1, 1, 2, 2, 3, 3]);

mySet.size; // 3
mySet.has(1); // true
mySet.add('строки');
mySet.add({ a: 1, b:2 });
```

- перебирать Set в цикле с помощью `forEach` или `for...of`

    - порядок, тот-же что и вставка

- методы `delete()` и `clear()`

- `WeakSet`

    - объекты с неустойчивыми связями в коллекции

```js
let ws = new WeakSet(),
    obj = {},
     foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false, foo не был добавлен к коллекции

ws.delete(window); // удаляет window из коллекции
ws.has(window);    // false, window был удалён
```

**Классы в ES6**

```js
class Task {
    constructor() {
        console.log("Создан экземпляр task!");
    }

    showId() {
        console.log(23);
    }

    static loadAll() {
        console.log("Загружаем все tasks...");
    }
}

console.log(typeof Task); // function
let task = new Task(); // "Создан экземпляр task!"
task.showId(); // 23
Task.loadAll(); // "Загружаем все tasks..."
```

- `extends` и `super` в классах

```js
class Car {
    constructor() {
        console.log("Создаём новый автомобиль");
    }
}

class Porsche extends Car {
    constructor() {
        super();
        console.log("Создаём Porsche");
    }
}

let c = new Porsche();
// Создаём новый автомобиль
// Создаём Porsche
```

- в классе-потомке можно вызвать метод родительского класса с помощью `super.имяМетодаРодителя()`

- `set`, `get`

```js
class Rectangle {
    constructor (width, height) {
        this._width  = width;
        this._height = height;
    }
    set width  (width)  { this._width = width               }
    get width  ()       { return this._width                }
    set height (height) { this._height = height             }
    get height ()       { return this._height               }
    get area   ()       { return this._width * this._height }
}

let r = new Rectangle(50, 20);

r.area === 1000;
```

**Modules**

```js
//  lib/math.js
export function sum (x, y) { return x + y };
export var pi = 3.141593;

//  someApp.js
import * as math from "lib/math";
console.log("2π = " + math.sum(math.pi, math.pi));

//  otherApp.js
import { sum, pi } from "lib/math";
console.log("2π = " + sum(pi, pi));
```

```js
//  lib/mathplusplus.js
export * from "lib/math";
export let e = 2.71828182846;
export default (x) => Math.exp(x);

//  someApp.js
import exp, { pi, e } from "lib/mathplusplus";

console.log("e^{π} = " + exp(pi));
```

**Тип данных Symbol**

- уникальный и неизменяемый тип данных

```js
let sym = Symbol("опциональное описание");

console.log(typeof sym); // symbol
```

- сохраняется таким специальным образом, что свойство не будет показано при нормальном перечислении свойств объекта

```js
var o = {
    val: 10,
    [Symbol("случайный")]: "Я - символ"
};

console.log(Object.getOwnPropertyNames(o)); // val
```

- извлечь символьные свойства объекта, нужно использовать `Object.getOwnPropertySymbols(o)`

## Заключение

- QUnit

- ES6

## ДЗ

- доделайть предыдущее ДЗ

- ES6

## Справочники

- [Qunit](http://qunitjs.com/)

- [ES-2015](http://www.ecma-international.org/publications/standards/Ecma-262.htm)

- [Babel.JS](http://babeljs.io/)

- [ES6 список фич](http://es6-features.org/#Constants)