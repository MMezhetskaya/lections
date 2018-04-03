# Lection 10

## Расширим кругозор

>**Метапеременные** — это слова-заменители, которые применяются в технических текстах для обозначения чего-либо, что может стоять на их месте, метапеременные часто используются в программировании. **@Wiki**

Есть две легендарных метапеременных — это **foo** и **bar**

- короткие

- одинаковой длины
 
- отличаются друг от друга
 
- легко произносятся

## Прототип объекта

>**prototype** - свойство функции-конструктора, которая устанавливает, что войдёт в свойство `__proto__` на построенном объекте.

![Proto & prototype](./proto_vs_prototype.jpeg "Proto & prototype")

**Просто объекты**

```js
var knowledgesProgress = {
        lvl: 50
    },
    knowledgesProgressFoo = {
        getProgress: function() {
            var msg = this.lvl < 50 ? 'Need more brains' : 'Im super smart';
            
            console.log(msg);
        }
    };
    
// foo.__proto__
knowledgesProgress.__proto__ = knowledgesProgressFoo;

console.dir(knowledgesProgress);
knowledgesProgress.getProgress();
```

**Cложно объекты**

```js
var knowledgesProgress = new KnowledgesProgress();

function KnowledgesProgress() {
    this.lvl= 50;
}

//Foo.prototype
KnowledgesProgress.prototype.getProgress = function() {
    var msg = this.lvl < 50 ? 'Need more brains' : 'Im super smart';

    console.log(msg);
}
```

**Важно!**

- объекты в можно организовать в цепочки 

- свойство не найденное в одном объекте, автоматически ищется в другом


```js
var animal = {
     eats: true
};

var rabbit = {
    jumps: true
};

rabbit.__proto__ = animal;

// в rabbit можно найти оба свойства
console.dir(rabbit.jumps); // true
console.dir(rabbit.eats); // true
```

## obj.hasOwnProperty(prop)

```javascript
var animal = {
    eats: true
};

var rabbit = {
    jumps: true,
    __proto__: animal
};

for (var key in rabbit) {
    console.log(key + " = " + rabbit[key]);
}
```

>Обычный цикл **for..in** не делает различия между свойствами объекта и его прототипа.

**Что делать?**

Вызов **obj.hasOwnProperty(prop)** возвращает **true**, если свойство **prop** принадлежит самому объекту **obj**, иначе **false**.

```js
var animal = {
    eats: true
};

var rabbit = {
    jumps: true,
    __proto__: animal
};

console.log( rabbit.hasOwnProperty('jumps') );

console.log( rabbit.hasOwnProperty('eats') );

for (var key in rabbit) {
    if (!rabbit.hasOwnProperty(key)) continue;
    
    console.log(key + " = " + rabbit[key]);
}
```

### Object.create(null)

- зачастую объекты используют для хранения произвольных значений по ключу, как коллекцию:

```js
var data = {};

data.text = "Привет";
data.age = 35;
// ...
```

- в каждом обьекте есть встроенные функции

```js
var data = {};

console.log(data.toString); // функция, хотя мы её туда не записывали
```

- названия свойств приходят от посетителя и могут быть произвольными(неприятный сюрприз и может привести к ошибкам)

```js
var data = {};

// выведет toString только если оно записано в сам объект
console.log(data.hasOwnProperty('toString') ? data.toString : undefined);
```

```js
var data = Object.create(null);

data.text = "Привет";

console.log(data.text);
console.log(data.toString);
```

*__Object.create(null)__ не имеет прототипа, а значит в нём нет лишних свойств

**Итого:**

- В **JS** есть встроенное "наследование" между объектами при помощи специального свойства `__proto__`

- При установке свойства `rabbit.__proto__ = animal` говорят, что объект `animal` будет "прототипом" `rabbit`

- При чтении свойства из объекта, если его в нём нет, оно ищется в `__proto__`

- Прототип задействуется **только** при чтении свойства

- Операции присвоения `obj.prop = 'some value'`или удаления `delete obj.prop` совершаются всегда над самим объектом `obj`.

## Создание прототипов объекта через конструктор

- в реальных проектах объекты обычно создаются функцией-конструктором через **new**

```js
var animal = {
        eats: true
    },
    rabbit;

function Rabbit(name) {
    this.name = name;
    this.__proto__ = animal;
}

rabbit = new Rabbit("Кроль");

console.log(rabbit.eats);
```

- что-бы новым объектам автоматически ставить прототип, конструктору ставится свойство `prototype`

    - при создании объекта через **new**, в его прототип `__proto__` записывается ссылка из `prototype` функции-конструктора

```js
...

function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype = animal;

rabbit = new Rabbit("Кроль"); // rabbit.__proto__ = animal

...
```

- свойство `constructor`

```js
function Rabbit() {}

Rabbit.prototype = {
    constructor: Rabbit
};
```

```js
var rabbit = new Rabbit("Кроль"),
    rabbit2 = new rabbit.constructor("Крольчиха");

function Rabbit(name) {
    this.name = name;
    console.log(name);
}
```

- свойство `constructor` легко потерять

```js
...

Rabbit.prototype = {
    jumps: true
}
```

```js
...

Rabbit.prototype = {
    jumps: true,
    constructor: Rabbit
};

// сохранится встроенный constructor
Rabbit.prototype.jumps = true
```

**Вывод**

Для произвольной функции – назовём её **Person**, верно следующее:

- прототип `__proto__` новых объектов, создаваемых через `new Person`, можно задавать при помощи свойства `Person.prototype`

- значением `Person.prototype` по умолчанию является объект с единственным свойством `constructor`, содержащим ссылку на `Person`

    - его можно использовать, чтобы из самого объекта получить функцию, которая его создала

    - **JS** никак не поддерживает корректность этого свойства, поэтому программист может его изменить или удалить

- `Object.create(proto)` создает пустой обьект `prototype` которого равен заданному

## Встроенные "классы" в JavaScript

>В JS есть встроенные объекты: Date, Array, Object и другие. Они используют прототипы и демонстрируют организацию "псевдоклассов" на JS, которую мы вполне можем применить и для себя

```js
var obj = {};

alert(obj); // "[object Object]" ?”
```

- запись `obj = {}` является краткой формой `obj = new Object`, где `Object` – встроенная функция-конструктор для объектов

- при выполнении `new Object`, создаваемому объекту ставится `__proto__` по `prototype` конструктора, который в данном случае равен встроенному `Object.prototype`

- в дальнейшем при обращении к `obj.toString()` – функция будет взята из `Object.prototype`
 
- точно такой же подход используется в массивах `Array`, функциях `Function` и других объектах

    - встроенные методы для них находятся в `Array.prototype`, `Function.prototype` и т.п

![Build in class](./build_in_class.png "Build in class")

**Вывод**

- все объекты наследуют от `Object`, а если более точно, то от `Object.prototype`

- классом, называют функцию-конструктор вместе с её `prototype`

- такой способ объявления классов называют - прототипным стилем ООП

## Изменение встроенных прототипов

```js
Object.prototype.each = function(f) {
    for (var prop in this) {
        var value = this[prop];

        f.call(value, prop, value); // вызовет f(prop, value), this=value
    }
}

// Попробуем! (внимание, пока что это работает неверно!)
var user = {
    name: 'Вася',
    age: 25
};

user.each(function(prop, val) {
    console.log(prop);
});
```

```js
...

// пропускать свойства из прототипа
if (!this.hasOwnProperty(prop)) continue;

...
```

```js
Object.prototype.each = function(f) {
    for (var prop in this) {
        var value = this[prop];

        f.call(value, prop, value);
    }
};

// поправить объявление свойства, установив флаг enumerable: false
Object.defineProperty(Object.prototype, 'each', {
    enumerable: false
});

// Теперь все будет в порядке
var obj = {
    name: 'Вася',
    age: 25
};

obj.each(function(prop, val) {
    console.log(prop);
});
```

**Достоинства**

- методы в прототипе автоматически доступны везде, их вызов прост и красив

**Недостатки**
 
- Новые свойства, добавленные в прототип из разных мест, могут конфликтовать между собой

>Представьте, что вы подключили две библиотеки, которые добавили одно и то же свойство в прототип, но определили его по-разному. Конфликт неизбежен.

**Вывод**

Изменения встроенных прототипов влияют глобально, на все-все скрипты, делать их не очень хорошо с архитектурной точки зрения.

## Класс через прототип

- функциональное ООП:

```js
var m = new Machine();

function Machine() {
    var enabled = false;

    this.enable = function() {
        enabled = true;
    };

    this.disable = function() {
        enabled = false;
    };
}
```

- прототипное ООП:

```js
var m = new Machine();

function Machine(power) {
    this._enabled = false;
}

Machine.prototype.enable = function() {
    this._enabled = true;
};

Machine.prototype.disable = function() {
    this._enabled = false;
};
```

**В чем же разница?**

- функциональный стиль записывает в каждый объект и свойства и методы, а прототипный – только свойства

    - прототипный стиль – быстрее и экономнее по памяти

- при создании методов через прототип, мы теряем возможность использовать локальные переменные как приватные свойства, у них больше нет общей области видимости с конструктором

## Наследование в наших классах

Применим тот же подход для наших классов: объявим класс `Rabbit`, который будет наследовать от `Animal`

- создадим два этих класса по отдельности, они пока что будут совершенно независимы

```js
function Animal(name) {
    this.name = name;
    this.speed = 0;
}

Animal.prototype.run = function(speed) {
    this.speed += speed;

    console.log(this.name + ' бежит, скорость ' + this.speed);
};

Animal.prototype.stop = function() {
    this.speed = 0;
    console.log(this.name + ' стоит');
};
```

```js
function Rabbit(name) {
    this.name = name;
    this.speed = 0;
}

Rabbit.prototype.jump = function() {
    this.speed++;
    console.log(this.name + ' прыгает');
};

var rabbit = new Rabbit('Кроль');

Rabbit.prototype.__proto__ = Animal.prototype; // IE10- Nooooooooo!!!
```

```js
function Rabbit(name) {
    this.name = name;
    this.speed = 0;
}

// задаём наследование
Rabbit.prototype = Object.create(Animal.prototype);

// и добавим свой метод (или методы...)
Rabbit.prototype.jump = function() { ... }; 
```

![Inherit prototype](./proto_inherit.png "Inherit prototype")

```js
// 1. Конструктор Animal
function Animal(name) {
    this.name = name;
    this.speed = 0;
}

// 1.1. Методы -- в прототип
Animal.prototype.stop = function() {
    this.speed = 0;
    console.log( this.name + ' стоит' );
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
    console.log(this.name + ' прыгает, скорость ' + this.speed);
}
```

- вызов конструктора родителя

```js
function Animal(name) {
    this.name = name;
    this.speed = 0;
}

function Rabbit(name) {
    this.name = name;
    this.speed = 0;
}

function Rabbit(name) {
  Animal.apply(this, arguments);
}
```

- вызов метода родителя внутри своего

```js
Rabbit.prototype.run = function() {
    // вызвать метод родителя, передав ему текущие аргументы
    Animal.prototype.run.apply(this, arguments);
    this.jump();
}
```

- для наследования нужно, чтобы "склад методов потомка" (Child.prototype) наследовался от "склада метода родителей" (Parent.prototype).

```js
Rabbit.prototype = Object.create(Animal.prototype);
```

- для того, чтобы наследник создавался так же, как и родитель, он вызывает конструктор родителя в своём контексте, используя `apply(this, arguments)`, вот так

```js
function Rabbit(...) {
    Animal.apply(this, arguments);
}
```

- при переопределении метода родителя в потомке, к исходному методу можно обратиться, взяв его напрямую из прототипа
 
```js
// --------- Класс-Родитель ------------
// Конструктор родителя пишет свойства конкретного объекта
function Animal(name) {
    this.name = name;
    this.speed = 0;
}

// Методы хранятся в прототипе
Animal.prototype.run = function() {
    console.log(this.name + " бежит!")
}

// --------- Класс-потомок -----------
// Конструктор потомка
function Rabbit(name) {
    Animal.apply(this, arguments);
}

// Унаследовать
Rabbit.prototype = Object.create(Animal.prototype);

// Желательно и constructor сохранить
Rabbit.prototype.constructor = Rabbit;

// Методы потомка
Rabbit.prototype.run = function() {
    // Вызов метода родителя внутри своего
    Animal.prototype.run.apply(this);
    alert( this.name + " подпрыгивает!" );
};

// Готово, можно создавать объекты
var rabbit = new Rabbit('Кроль');
rabbit.run();
```

**Нужно учесть**

- зачастую вызов конструктора имеет какие-то побочные эффекты, например влияет на документ

    - если конструктор родителя имеет какое-то поведение, которое нужно переопределить в потомке, то в функциональном стиле это невозможно

- в функциональном стиле в процессе создания `Rabbit` нужно обязательно вызывать `Animal.apply(this, arguments)`, чтобы получить методы родителя  и если этот `Animal.apply` кроме добавления методов говорит: «Му-у-у!», то это проблема:

**Пример**

```js
function Animal() {
    this.walk = function() {
        alert('walk')
    };

    alert( 'Му-у-у!' );
}

function Rabbit() {
    Animal.apply(this, arguments); // как избавиться от мычания, но получить walk?
}
```

Поэтому прототипный подход стоит предпочитать функциональному как более быстрый и универсальный.

## Заключение

- Прототип объекта

- obj.hasOwnProperty(prop)

- Object.create(null)

- Создание прототипов объекта через конструктор

- Встроенные "классы" в JS

- Изменение встроенных прототипов

- Класс через прототип

- Наследование Array от Object

- Наследование в наших классах

## ДЗ

**Задание 1**

- переделать предыдущее задание в прототипном стиле

- добавить новый компонент **Articles**

- для всех компонентов добавить свойство **order** которое определяет в каком порядке и после какого элемента будет отрендерен блок, **setOrder** - установить свойство position

    - если **order** одинаковый то блок ставится в порядке рендера

    - если **order** не указан то по умолчанию он равен 0

**Задание 2**

- добавить функцию `renderPage(component0, ... componentN)` - все компоненты рендерятся в порядке **order** и добавляются к **body**

- при вызове `setOrder` если **order** поменялся обновлять компоненты на странице(только те что сместились)

- не забываем про стили для нового компонента

**Запуск**

```js
var componentHeader = new Component({parent: 'header', url: 'путь к лого',  title: 'заголовок'}),
    componentMenu = new Component({parent: 'nav'}),
    componentArticles = new Component({parent: 'main'}),
    componentFooter = new Component({parent: 'footer', text: 'Корирайты'}),
    viewHeader = '<h1><img src="{url}" alt="{title}"/>  {title}</h1>',
    viewMenu = '<ul>{li}</ul>',
    viewArticle = '<section>{article}</section>',
    viewFooter = '<p><small>{text}</small</p>',
    dataMenu = [
        {
           name: 'Главная',
           url: 'www'
        },
        {
           name: 'O нас',
           url: 'www',
           items: [
               {name: 'Кто мы', url: 'www'},
               {name: 'Где мы', url: 'www'},
               {name: 'Откуда', url: 'www'}
           ]
        },
        {
           name: 'Контакты',
           url: 'www'
        }
    ],
    dataArticle = [
        {name: 'Статья 1', url: 'www', text: 'Some text for you'},
        {name: 'Статья 2', url: 'www', text: 'Some text for you'},
        {name: 'Статья 3', url: 'www', text: 'Some text for you'}
    ];

componentHeader.setView(viewHeader);
componentMenu.setView(viewMenu, dataMenu);
componentArticles.setView(viewArticle, dataArticle); //<section><article><h3>Статья 1</h3><p>Some text for you</p><p><a href="www">Read  more..</a></p></article>...</section>
componentFooter.setView(viewFooter);

renderPage(componentHeader, componentMenu, componentArticles, componentFooter);

componentMenu.setOrder(0);
componentHeader.setOrder(1);
```
