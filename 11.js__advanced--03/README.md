### Статические свойства и методы

Методы и свойства, которые не привязаны к конкретному экземпляру объекта, называют «статическими». Их записывают прямо в саму функцию-конструктор.

 - Свойства
 
```javascript
function Article() {
  Article.count++;
}

Article.count = 0; // статическое свойство - переменная
Article.DEFAULT_FORMAT = "html"; // статическое свойство - константа”
```

Они хранят данные, специфичные не для одного объекта, а для всех статей целиком.

 - Методы
 
Article.showCount():

```javascript
function Article() {
  Article.count++;

  //...
}
Article.count = 0;

Article.showCount = function() {
  alert( this.count ); // (1)
}

// использование
new Article();
new Article();
Article.showCount(); // (2)
```
 
### Фабричные методы

Рассмотрим ситуацию, когда объект нужно создавать различными способами.

Допустим, нам нужно создавать объекты User: анонимные new User() и с данными new User({name: 'Вася', age: 25}).

Можно, конечно, создать полиморфную функцию-конструктор User:

```javascript
function User(userData) {
  if (userData) { // если указаны данные -- одна ветка if
    this.name = userData.name;
    this.age = userData.age;
  } else { // если не указаны -- другая
    this.name = 'Аноним';
  }

  this.sayHi = function() {
    alert(this.name)
  };
  // ...
}

// Использование

var guest = new User();
guest.sayHi(); // Аноним

var knownUser = new User({
  name: 'Вася',
  age: 25
});
knownUser.sayHi(); // Вася
```

Подход с использованием фабричных методов был бы другим. Вместо разбора параметров в конструкторе – делаем два метода: User.createAnonymous и User.createFromData.

```javascript
function User() {
  this.sayHi = function() {
    alert(this.name)
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

// Использование

var guest = User.createAnonymous();
guest.sayHi(); // Аноним

var knownUser = User.createFromData({
  name: 'Вася',
  age: 25
});
```

 - Лучшая читаемость кода. Как конструктора – вместо одной большой функции несколько маленьких, так и вызывающего кода – явно видно, что именно создаётся.
 - Лучший контроль ошибок, т.к. если в createFromData ничего не передали, то будет ошибка, а полиморфный конструктор создал бы анонимного посетителя.
 - Удобная расширяемость. Например, нужно добавить создание администратора, без аргументов. Фабричный метод сделать легко: User.createAdmin = function() { ... }. А для полиморфного конструктора вызов без аргумента создаст анонима, так что нужно добавить параметр – «тип посетителя» и усложнить этим код.

Статические свойства и методы объекта удобно применять в следующих случаях:

 - Общие действия и подсчёты, имеющие отношения ко всем объектам данного типа. В примерах выше это подсчёт количества.
 - Методы, не привязанные к конкретному объекту, например кол-во вызовов.
 - Фабричные методы. 

### Явное указание this: call, apply

this – это текущий объект при вызове «через точку» и новый объект при конструировании через new.

### Метод call

Синтаксис метода call:

```javascript
func.call(context, arg1, arg2, ...)
```

Вызов func.call(context, a, b...) – то же, что обычный вызов func(a, b...), но с явно указанным this(=context).

```javascript
function showFullName() {
  alert( this.firstName + " " + this.lastName );
}
```

```javascript
function showFullName() {
  alert( this.firstName + " " + this.lastName );
}

var user = {
  firstName: "Василий",
  lastName: "Алибабаевич"
};

// функция вызовется с this=user
showFullName.call(user) // "Василий Алибабаевич”

```

 - Аргументы

```javascript
var user = {
  firstName: "Василий",
  surname: "Алибабаевич",
  patronym: "Иванович"
};

function showFullName(firstPart, lastPart) {
  alert( this[firstPart] + " " + this[lastPart] );
}

// f.call(контекст, аргумент1, аргумент2, ...)
showFullName.call(user, 'firstName', 'surname') // "Василий Алибабаевич"
showFullName.call(user, 'firstName', 'patronym') // "Василий Иванович"
```

### «Одалживание метода»

При помощи call можно легко взять метод одного объекта, в том числе встроенного, и вызвать в контексте другого.

Это называется «одалживание метода» (на англ. method borrowing).

Используем эту технику для упрощения манипуляций с arguments.

Как мы знаем, arguments не массив, а обычный объект, поэтому таких полезных методов как push, pop, join и других у него нет. Но иногда так хочется, чтобы были…

```javascript
function printArgs() {
  arguments.join = [].join; // одолжили метод (1)

  var argStr = arguments.join(':'); // (2)

  alert( argStr ); // сработает и выведет 1:2:3
}

printArgs(1, 2, 3);
```

Почему вызов сработает?

Здесь метод join массива скопирован и вызван в контексте arguments. Не произойдёт ли что-то плохое от того, что arguments – не массив? Почему он, вообще, сработал?

Ответ на эти вопросы простой. В соответствии со спецификацией, внутри join реализован примерно так:

```javascript
function join(separator) {
  if (!this.length) return '';

  var str = this[0];

  for (var i = 1; i < this.length; i++) {
    str += separator + this[i];
  }

  return str;
}
```

Как видно, используется this, числовые индексы и свойство length. Если эти свойства “есть, то все в порядке. А больше ничего и не нужно. В качестве this подойдёт даже обычный объект:

```javascript
var obj = { // обычный объект с числовыми индексами и length
  0: "А",
  1: "Б",
  2: "В",
  length: 3
};

obj.join = [].join;
alert( obj.join(';') ); // "A;Б;В”
```

Представим на минуту, что вместо arguments у нас – произвольный объект. У него тоже есть числовые индексы, length и мы хотим вызвать в его контексте метод [].join. То есть, ситуация похожа на arguments, но (!) вполне возможно, что у объекта есть свой метод join.

```javascript
function printArgs() {
  var join = [].join; // скопируем ссылку на функцию в переменную

  // вызовем join с this=arguments,
  // этот вызов эквивалентен arguments.join(':') из примера выше
  var argStr = join.call(arguments, ':');

  alert( argStr ); // сработает и выведет 1:2:3
}

printArgs(1, 2, 3);
```

```javascript
function printArgs() {
  // вызов arr.slice() скопирует все элементы из this в новый массив
  var args = [].slice.call(arguments);
  alert( args.join(', ') ); // args - полноценный массив из аргументов
}

printArgs('Привет', 'мой', 'мир'); // Привет, мой, мир
```

### Метод apply

Вызов функции при помощи func.apply работает аналогично func.call, но принимает массив аргументов вместо списка.

```javascript
func.call(context, arg1, arg2);
// идентичен вызову
func.apply(context, [arg1, arg2]);
```

```javascript
showFullName.call(user, 'firstName', 'surname');

showFullName.apply(user, ['firstName', 'surname']);
```

```javascript
Math.max(1, 5, 2)
```

```javascript
var arr = [1, 3, 7];

// получить максимум из элементов arr
alert( Math.max.apply(null, arr) ); // 7

Math.max(1,2,3);
Math.max.apply(Math, [1,2,3]);
```

### Привязка контекста и карринг: "bind”

Функции в JavaScript никак не привязаны к своему контексту this, с одной стороны, здорово – это позволяет быть максимально гибкими, одалживать методы и так далее.

Пример потери контекста
```javascript
var user = {
  firstName: "Вася",
  sayHi: function() {
    alert( this.firstName );
  }
};

setTimeout(user.sayHi, 1000); // undefined (не Вася!)

var f = user.sayHi;

setTimeout(f, 1000); // контекст user потеряли
```

```javascript
var user = {
  firstName: "Вася",
  sayHi: function() {
    alert( this.firstName );
  }
};

setTimeout(function() {
  user.sayHi(); // Вася
}, 1000);
```


```javascript
var user = {
  firstName: "Вася",
  sayHi: function() {
    alert( this.firstName );
  }
};

setTimeout(user.sayHi.bind(user), 1000);
```

Синтаксис встроенного bind:

```javascript
var wrapper = func.bind(context[, arg1, arg2...])
```

func  - Произвольная функция
context - Контекст, который привязывается к func
arg1, arg2, …  аргументы

```javascript
function bind(func, context) {
  return function() { // (*)
    return func.apply(context, arguments);
  };
}
```

Методы bind и call/apply близки по синтаксису, но есть важнейшее отличие.

Методы call/apply вызывают функцию с заданным контекстом и аргументами.

А bind не вызывает функцию. Он только возвращает «обёртку», которую мы можем вызвать позже, и которая передаст вызов в исходную функцию, с привязанным контекстом.

 - Карринг

Карринг (currying) или каррирование – термин функционального программирования, который означает создание новой функции путём фиксирования аргументов существующей.

Например, есть функция умножения двух чисел mul(a, b):

```javascript
function mul(a, b) {
  return a * b;
};
```

```javascript
// double умножает только на два
var double = mul.bind(null, 2); // контекст фиксируем null, он не используется

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

Говорят, что double является «частичной функцией» (partial function) от mul.

Выигрыш состоит в том, что эта самостоятельная функция, во-первых, имеет понятное имя (double), а во-вторых, повторные вызовы позволяют не указывать каждый раз первый аргумент, он уже фиксирован благодаря bind.

Вывод:
 - Функция сама по себе не запоминает контекст выполнения.

 - Чтобы гарантировать правильный контекст для вызова obj.func(), нужно использовать функцию-обёртку, задать её через анонимную функцию:

```javascript
setTimeout(function() {
  obj.func();
})
```

…Либо использовать bind:

```javascript
setTimeout(obj.func.bind(obj));
```

- Вызов bind часто используют для привязки функции к контексту, чтобы затем присвоить её в обычную переменную и вызывать уже без явного указания объекта.

- Вызов bind также позволяет фиксировать первые аргументы функции («каррировать» её), и таким образом из общей функции получить её «частные» варианты – чтобы использовать их многократно без повтора одних и тех же аргументов каждый раз.

### Функции-обёртки, декораторы

Декоратор – приём программирования, который позволяет взять существующую функцию и изменить/расширить ее поведение.

Декоратор получает функцию и возвращает обертку, которая делает что-то своё «вокруг» вызова основной функции.

```javascript
function bind(func, context) {
  return function() {
    return func.apply(context, arguments); //(*)
  };
}
```

Этот приём называется «форвардинг вызова» (от англ. forwarding): текущий контекст и аргументы через apply передаются в функцию f, так что изнутри f всё выглядит так, как была вызвана она напрямую, а не декоратор.


```javascript
function f(x) {} // любая функция

var timers = {}; // объект для таймеров

// отдекорировали
f = timingDecorator(f, "myFunc");

// запускаем
f(1);
f(2);
f(3); // функция работает как раньше, но время подсчитывается

alert( timers.myFunc ); // общее время выполнения всех вызовов f
```

```javascript
var timers = {};

// прибавит время выполнения f к таймеру timers[timer]
function timingDecorator(f, timer) {
  return function() {
    var start = performance.now();

    var result = f.apply(this, arguments); // (*)

    if (!timers[timer]) timers[timer] = 0;
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
alert( fibonacci(10) ); // 55
alert( fibonacci(20) ); // 6765
// ...

// в любой момент можно получить общее количество времени на вызовы
alert( timers.fibo + 'мс' );
```

Декораторы способны упростить рутинные, повторяющиеся задачи, вынести их из кода функции.

```javascript
function sum(a, b) {
  return a + b;
}

// передадим в функцию для сложения чисел нечисловые значения
alert( sum(true, { name: "Вася", age: 35 }) ); // true[Object object]
```

```javascript
// вспомогательная функция для проверки на число
function checkNumber(value) {
  return typeof value == 'number';
}

// декоратор, проверяющий типы для f
// второй аргумент checks - массив с функциями для проверки
function typeCheck(f, checks) {
  return function() {
    for (var i = 0; i < arguments.length; i++) {
      if (!checks[i](arguments[i])) {
        alert( "Некорректный тип аргумента номер " + i );
        return;
      }
    }
    return f.apply(this, arguments);
  }
}

function sum(a, b) {
  return a + b;
}

// обернём декоратор для проверки
sum = typeCheck(sum, [checkNumber, checkNumber]); // оба аргумента - числа

// пользуемся функцией как обычно
alert( sum(1, 2) ); // 3, все хорошо

// а вот так - будет ошибка
sum(true, null); // некорректный аргумент номер 0
sum(1, ["array", "in", "sum?!?"]); // некорректный аргумент номер 1
```

Один раз пишем декоратор и дальше просто применяем этот функционал везде, где нужно.

```javascript
function checkPermissionDecorator(f) {
  return function() {
    if (isAdmin()) {
      return f.apply(this, arguments);
    }
    alert( 'Недостаточно прав' );
  }
};

function save() { ... }

save = checkPermissionDecorator(save);
// Теперь вызов функции save() проверяет права
```

Декоратор – это обёртка над функцией, которая модифицирует её поведение. При этом основную работу по-прежнему выполняет функция.

Декораторы можно не только повторно использовать, но и комбинировать!

### Заключение

### ДЗ

Переделать предыдущее задание в прототипном стиле + добавить новый компонент Articles, и для всех компонентов добавить 
свойство order которое определяет в каком порядке и после какого элемента будет отрендерен блок, если order 
одинаковый то блок ставится после блока с таким же order, если order не указан то по умолчанию он равен 0.

Класс Component содержит список всех созданных потомков(при delete потомок удаляется из списка), при вызове 
метода Component.renderPage() все потомки рендерятся в порядке order и добавляются к body. 
Так же при вызове Component.renderPage(component01, ... componentN) с аргументами отрендерятся только компоненты 
указанные в аргументе

При клике на пункт меню, рендерится блок соответсвующий странице обновляя текущий parent новым блоком

1) Создайте класс Component, компонент имеет методы:

 - setView - установить html view
 - setOrder - установить свойство position
 - render - отрендерить текущий  html view с параметрами
 - delete - удалить текуий компонент
 
2) Наследуя от класса Component создайте 4 компонента:

 - componentHeader
 - componentMenu - расширяет базовый метод render, добавляя renderSubItem - рендерит пункты  подменю и вставляет их в 
 родительский пункт меню 
 - componentArticles - расширяет базовый метод render, добавляя renderArticle - рендерит статьи и добавляет в компонент body
 - componentFooter
 
3) Методы и как работает:

```javascript
    var componentHeader = new Component({parent: 'header', url: 'путь к лого',  title: 'заголовок'}),
        componentMenu = new Component({parent: 'nav'}),
        componentArticles = new Component({parent: 'main'}),
        componentAbout = new Component({parent: 'main'}),
        componentContact = new Component({parent: 'main'}),
        componentFooter = new Component({parent: 'footer', text: 'Корирайты'});

    componentArticles.setView(
        '<section>{article}</section>',
         [
             {name: 'Статья 1', url: 'www', text: 'Some text for you'},
             {name: 'Статья 2', url: 'www', text: 'Some text for you'},
             {name: 'Статья 3', url: 'www', text: 'Some text for you'}
         ]
     );

    componentMenu.setView(
        '<ul>{li}</ul>',
         [
             {name: 'Главная', url: '#'},
             {
                 name: 'O нас',
                 items: [
                     {name: 'Кто мы', url: 'componentAbout'}
                 ]
             },
             {name: 'Контакты', url: 'componentContact'}
         ]
     );
    
    componentContact.setView(
        '<ul><form>...<form></ul>'
     );
    
    componentAbout.setView(//<li><a href="www" tagret="_blank">Name0 Surname0 (18), City<a></li>
        '<ul>{li}</ul>',
         [
             {name: 'Name0', surname: 'Surname0', age: '18', profile: 'www', from: 'City'},
             {name: 'Name1', surname: 'Surname1', age: '18', profile: 'www', from: 'City'},
             {name: 'Name2', surname: 'Surname2', age: '18', profile: 'www', from: 'City'}
         ]
     );
    
    componentHeader.setView('<h1><img src="{url}" alt="{title}"/>  {title}</h1>');
    componentFooter.setView('<p><small>{text}</small</p>');
    
    // Default - Component.renderPage(componentHeader, componentMenu, componentArticles, componentFooter);
    // Homepage - Component.renderPage(componentArticles);
    // About - Component.renderPage(componentAbout);
    // Contact - Component.renderPage(componentContact);
```

Подсказки.

replace, appendChild, innerHTML, forEach, map, sort, for (;;;), apply, prototype, addEventListener, click