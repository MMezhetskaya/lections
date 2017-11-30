### Область видимости
Глобальными называют переменные и функции, которые не находятся внутри какой-то функции. То есть, иными словами, если переменная или функция не находятся внутри конструкции function, то они – «глобальные».

В JavaScript все глобальные переменные и функции являются свойствами специального объекта, который называется «глобальный объект» (global object).
 

```js
var a = 5; // объявление var создаёт свойство window.a
console.log( window.a ); // 5
```

### Порядок инициализации
Фазы:
 - инициализация Function Declaration, var
 
 - выполнение, var = undefined => var = data

```js
// На момент инициализации, до выполнения кода:
// window = { f: function, a: undefined, g: undefined }

var a = 5;
// window = { f: function, a: 5, g: undefined }

function f(arg) { /*...*/ }
// window = { f: function, a: 5, g: undefined } без изменений, f обработана ранее

var g = function(arg) { /*...*/ };
// window = { f: function, a: 5, g: function }
```

Не важно, где и сколько раз объявлена переменная
Объявлений var может быть сколько угодно:

```js
var i = 10;

for (var i = 0; i < 20; i++) {
  ...
}

var i = 5;
```

Все var будут обработаны один раз, на фазе инициализации.

### Лексическое окружение
Все переменные внутри функции – это свойства специального внутреннего объекта LexicalEnvironment, который создаётся при её запуске.

```js
function sum(a, b) { 
    var title = 'Сумма равна: ';
    debugger;
    console.log(title, a + b);
};
sum(3, 4);
```

### Доступ ко внешним переменным 
Интерпретатор, при доступе к переменной, сначала пытается найти переменную в текущем LexicalEnvironment, а затем, если её нет – ищет во внешнем объекте переменных. В данном случае им является window.

```js
[[Scope]]
var title = 'Сумма равна: ';

function sum(a, b) { 
    debugger;
    console.log(title, a + b);
};
sum(3, 4);
```

 - Каждая функция при создании получает ссылку [[Scope]] на объект с переменными, в контексте которого была создана.
 
 - При запуске функции создаётся новый объект с переменными LexicalEnvironment. Он получает ссылку на внешний объект переменных из [[Scope]].
 
 - При поиске переменных он осуществляется сначала в текущем объекте переменных, а потом – по этой ссылке.

### Всегда текущее значение

```js
[[Scope]]
var title = 'Сумма равна: ';

function sum(a, b) { 
    debugger;
    console.log(title, a + b);
};

sum(3, 4);

title = 'Уже что-то другое: ';

sum(5, 7);
```

### Вложенные функции

```js
var phrase = 'Привет';

function say() {

  function go() {
    console.log( phrase ); // найдёт переменную снаружи
  }

  go();
}

say();
```

### Возврат функции
Внутри одной функции создаётся другая и возвращается в качестве результата.

```js
function makeCounter() {
  var currentCount = 1;

  return function() { // (**)
    return currentCount++;
  };
}

var counter = makeCounter(); // (*)

// каждый вызов увеличивает счётчик и возвращает результат
console.log( counter() ); // 1
console.log( counter() ); // 2
console.log( counter() ); // 3

// создать другой счётчик, он будет независим от первого
var counter2 = makeCounter();
console.log( counter2() ); // 1
```


### Свойства функции(cтатические переменные)
 - замена внешних переменных
 - общедоступно

```js
function f() {}

f.test = 5;
console.log( f.test );
```

```js
function makeCounter() {
  function counter() {
    return counter.currentCount++;
  };
  counter.currentCount = 1;

  return counter;
}

var counter = makeCounter();
console.log( counter() ); // 1
console.log( counter() ); // 2
```

### Замыкание
Замыкание – это функция вместе со всеми внешними переменными, которые ей доступны. (Wiki)

Замыкания в JavaScript означает:
 - Все переменные и параметры функций являются свойствами объекта переменных LexicalEnvironment. Каждый запуск функции создает новый такой объект. На верхнем уровне им является «глобальный объект», в браузере – window.
 
 - При создании функция получает системное свойство [[Scope]], которое ссылается на LexicalEnvironment, в котором она была создана.
 
 - При вызове функции, куда бы её ни передали в коде – она будет искать переменные сначала у себя, а затем во внешних LexicalEnvironment с места своего «рождения».

### Счётчик-объект/Объект счётчика + функция
Прежде:
```js
function makeCounter() {
  var currentCount = 1;

  return function() { // (**)
    return currentCount++;
  };
}
```

Стало:
```js
function makeCounter() {
  var currentCount = 1;

  return { // возвратим объект вместо функции
    getNext: function() {
      return currentCount++;
    },

    set: function(value) {
      currentCount = value;
    },

    reset: function() {
      currentCount = 1;
    }
  };
}

var counter = makeCounter();

console.log( counter.getNext() ); // 1
console.log( counter.getNext() ); // 2

counter.set(5);
console.log( counter.getNext() ); // 5
```

- объект счётчика + функция

```js
function makeCounter() {
  var currentCount = 1;

  // возвращаемся к функции
  function counter() {
      return currentCount++;
    }

  // ...и добавляем ей методы!
  counter.set = function(value) {
    currentCount = value;
  };

  counter.reset = function() {
    currentCount = 1;
  };

  return counter;
}

var counter = makeCounter();

console.log( counter() ); // 1
console.log( counter() ); // 2

counter.set(5);
console.log( counter() ); // 5
```

### Приемы: Модули через замыкания

Приём программирования «модуль» имеет громадное количество вариаций. Он немного похож на счётчик, который мы рассматривали ранее, использует аналогичный приём, но на уровне выше.

Его цель – скрыть внутренние детали реализации скрипта. В том числе: временные переменные, константы, вспомогательные мини-функции и т.п.

```js
;(function() {

  // глобальная переменная нашего скрипта
  var message = "Привет";

  // функция для вывода этой переменной
  function showMessage() {
    alert( message );
  }

  // выводим сообщение
  showMessage();

})();
```

Что за синтаксис ;(function(){})(); -  «на месте» разрешено вызывать только Function Expression.

```js
;(function() {

  // глобальная переменная нашего скрипта
  var message = "Привет";

  // функция для вывода этой переменной
  function showMessage() {
    alert( message );
  }

  // выводим сообщение
  showMessage();
})();
```

Экспорт через return

```js
var myLib = (function() {

  // глобальная переменная нашего скрипта
  var message = "Привет";

  // функция для вывода этой переменной
  function showMessage() {
    alert( message );
  }

  // выводим обьект
  return  {
      publicMethod: function() {
          showMessage();
      },
      publicProp: 1
  }
})();
```

Пример популярных библиотек [jQuery](https://code.jquery.com/jquery-3.2.1.js), [lodash](https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js)

### Память в JavaScript
Определённое множество значений считается достижимым изначально, в частности:
- Значения, ссылки на которые содержатся в стеке вызова, то есть – все локальные переменные и параметры функций, которые в настоящий момент выполняются или находятся в ожидании окончания вложенного вызова.

- Все глобальные переменные.

Эти значения гарантированно хранятся в памяти. Мы будем называть их корнями.

Любое другое значение сохраняется в памяти лишь до тех пор, пока доступно из корня по ссылке или цепочке ссылок.

Важный побочный эффект в V8 (Chrome, Opera) состоит в том, что удалённая переменная станет недоступна и при отладке!

```js
function f() {
  var value = Math.random();

  function g() {
    debugger; // выполните в консоли  value; Нет такой переменной!
  }

  return g;
}

var g = f();
g();
```

### DOM события
Событие – это сигнал от браузера о том, что что-то произошло. Существует много видов событий. Посмотрим список самых часто используемых, пока просто для ознакомления:

События мыши:
 - click – происходит, когда кликнули на элемент левой кнопкой мыши
 
 - contextmenu – происходит, когда кликнули на элемент правой кнопкой мыши
 
 - mouseover – возникает, когда на элемент наводится мышь
 
 - mousedown и mouseup – когда кнопку мыши нажали или отжали
 
 - mousemove – при движении мыши

События на элементах управления:
 - submit – посетитель отправил форму <form>
 
 - focus – посетитель фокусируется на элементе, например нажимает на <input>
 
Клавиатурные события:
 - keydown – когда посетитель нажимает клавишу
 
 - keyup – когда посетитель отпускает клавишу

События документа:
 - DOMContentLoaded – когда HTML загружен и обработан, DOM документа полностью построен и доступен.

События CSS:
 - transitionend – когда CSS-анимация завершена.


Есть три способа назначения обработчиков событий:
 - Атрибут HTML: onclick="...".
```html
<input value="Нажми меня" onclick="alert('Клик!')" type="button">
```

 - Свойство: elem.onclick = function.
 
 - Специальные методы: 
    * elem.addEventListener( событие, handler[, phase])
    * удаление через removeEventListener.
    
```js
  function handler1() {
    alert('Спасибо!');
  };

  function handler2() {
    alert('Спасибо ещё раз!');
  }

  elem.onclick = function() { alert("Привет"); };
  elem.addEventListener("click", handler1); // Спасибо!
  elem.addEventListener("click", handler2); // Спасибо ещё раз!
  elem.removeEventListener("click", handler2); // Спасибо ещё раз!
```

```js
  elem.ontransitionend = function() {
    alert( "ontransitionend" ); // не сработает
  };

  elem.addEventListener("transitionend", function() {
    alert( "addEventListener" ); // сработает по окончании анимации
  });
```

Вывод:    
 - Некоторые события можно назначить только через addEventListener.

 - Метод addEventListener позволяет назначить много обработчиков на одно событие.

 - Обработчик, назначенный через onclick, проще удалить или заменить.

### Заключение

### ДЗ

**Задание 1.**

Функция - строковый буфер.

В некоторых языках программирования существует объект «строковый буфер», который аккумулирует внутри себя значения. Его функционал состоит из трех возможностей:

 - Добавить значение в буфер.
 
 - Получить текущее содержимое.
 
 - Очистить текущее содержимое.

Задача – реализовать строковый буфер на функциях в JavaScript, со следующим синтаксисом:

Создание объекта, при клике на кнопку 'Make buffer'. 

```js
var buffer = makeBuffer();
```

Вызов makeBuffer должен возвращать такую функцию buffer, которая при вызове buffer(value) добавляет значение в некоторое внутреннее хранилище, а при вызове без аргументов buffer() – возвращает его.

Вызов buffer.clear() очищает его, при клике на кнопку 'Clear buffer'.

Вызов buffer('аргумент') добавить значение к буферу, при клике на кнопку 'Add buffer', значение возьмет из поля 

```html
<input type='text' id="bufferVal" />
```

Вызов buffer() выведет текущее значение, при клике на кнопку 'Show buffer', значение выдедется в

```html
<div id="bufferResult"></div>
```

Пример:

```js
function makeBuffer() { /* ваш код */ }

var buffer = makeBuffer();

// добавить значения к буферу
buffer('Замыкания');
buffer(' Использовать');
buffer(' Нужно!');

// получить текущее значение
buffer(); // Замыкания Использовать Нужно!  
buffer.clear();
buffer(); // ""
```

Буфер должен преобразовывать все данные к строковому типу:

```js
var buffer = makeBuffer();
buffer(0);
buffer(1);
buffer(0);

console.log( buffer() ); // '010'
```

Решение не должно использовать глобальные переменные.

**Задание 2.**

У нас есть массив объектов:

```js
var users = [{
  name: "Вася",
  surname: 'Иванов',
  age: 20
}, {
  name: "Петя",
  surname: 'Чапаев',
  age: 25
}, {
  name: "Маша",
  surname: 'Медведева',
  age: 18
}];
```

Обычно сортировка по нужному полю происходит так:

```js
// по полю name (Вася, Маша, Петя)
users.sort(function(a, b) {
  return a.name > b.name ? 1 : -1;
});

// по полю age  (Маша, Вася, Петя)
users.sort(function(a, b) {
  return a.age > b.age ? 1 : -1;
});
```

Мы хотели бы упростить синтаксис до одной строки, вот так:

```js
users.sort(byField('name')); // Вася, Маша, Петя
users.sort(byField('age'));  // Маша, Вася, Петя
```

То есть, вместо того, чтобы каждый раз писать в sort function... – будем использовать byField(...)

Напишите функцию byField(field), которую можно использовать в sort для сравнения объектов по полю field, чтобы пример выше заработал.

**Задание 3.**

Напишите функцию использующая приём программирования «модуль», включающая в себя задание 1, 2. Функция возвращает методы из заданий 1, 2, по примеру ниже:

```js
var myLib = (function() { ... })();

var buffer =  myLib.makeBuffer();

users.sort(myLib.byField('name'));
```

**Задание 4.**

Создайте форму с 3мя полями имя, фамилия, возвраст и кнопкой добавить. При нажатии на кнопку добавить(submit формы) в
 коллекцию users добавиться новый юзер
 
**Задание 5.**

Создайте вторую форму с полем  - сортировать по, и кнопкой сортировать. При нажатии на кнопку сортировать(submit формы)
данные сортируются по введенному значению и выводяться в блоке div, притом каждый элемент коллекции в отдельном теге 
p и ключи оформленны жирным текстом и красным цветом.

**Подсказки.**

Прочитайте про каждый элемент из списка, шаблон html и элементы помогут при составлении кода.

 - querySelector 
 
 - innerHTML 
 
 - submit 
 
 - addEventListener 
 
 - event.preventDefault()
 
 - sort 
 
 - push
 
 - map
 
 - ```html 
    <form action="" method="">
        <p>
            <input id="{{inputId}}" type='text' />
            <label for="{{inputId}}"></label>
        </p>
            
        <p>
            <button type='submit'></button>
        </p>
    </form>
    
     <section>
        <p>
            <b>{{key}}</b> {{value}}
        </p>
        
        <p>
            <b>{{key}}</b> {{value}}
        </p>
        
        <p>
            <b>{{key}}</b> {{value}}
        </p>
     </div>
    ```

### Справочники
- [jQuery](https://code.jquery.com/jquery-3.2.1.js) 

- [lodash](https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js)