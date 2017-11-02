# Lection 05

### Условные конструкции
- if 
Оператор if (...) вычисляет и преобразует выражение в скобках к логическому типу.
Число 0, пустая строка "", null и undefined, а также NaN являются false,
Остальные значения – true.

```js
var age = prompt('Сколько вам лет?', '');

if (age <= 18) {
  alert( 'Вам нет 18!!!' );
}
```

- else

```js
var age = prompt('Сколько вам лет?', '');

if (age <= 18) {
  alert( 'Вам нет 18!!!' );
} else {
    alert( 'Вам все можно' );
}
```

-  else if

```js
var age = prompt('Сколько вам лет?', '');

if (age <= 18) {
  alert( 'Вам нет 18!!!');
} else if(age <= 21) {
    alert( 'Вам почти все можно');
} else {
    alert( 'Вам все можно');
}
```

- Оператор ? (тернарный оператор)
условие ? значение1 : значение2

```js
var access;
var age = prompt('Сколько вам лет?', '');

if (age > 18) {
  access = true;
} else {
  access = false;
}

alert(access);
```

```js
var access;
var age = prompt('Сколько вам лет?', '');

access = age > 18 ? true : false;
```

### Логические операторы
- ||

```js
result = a || b;
```

```js
var hour = 12,
  isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'Офис до 10 или после 18 или в выходной закрыт' );
}
```

```js
var x,
    isCondition = false;

isCondition || (x = 1);

alert(x); // 1
```

- &&

```js
var hour = 12,
  minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'Время 12:30' );
}
```

- !

```js
alert( !!"строка" ); // true
alert( !!null ); // false
```

### Преобразование типов для примитивов
Всего есть три преобразования:
 1. Строковое преобразование.
 2. Числовое преобразование.
 3. Преобразование к логическому значению.

- Строковое
Строковое преобразование происходит, когда требуется представление чего-либо в виде строки.

```js
var a = true;

alert( a ); // "true"
alert( String(null) === "null" ); // true
alert( 1 + "null"); // "1null"
```

- Числовое
Численное преобразование происходит в математических функциях и выражениях, а также при сравнении данных различных типов (кроме сравнений ===, !==).
Number(val) || +.

```js
var a = +"123"; // 123
var a = Number("123"); // 123, тот же эффект

alert( "\n" == false );
alert( "1" == true );
```

- Логическое
Преобразование к true/false происходит в логическом контексте, таком как if(value), и при применении логических операторов

undefined, null - false
Числа - Все true, кроме 0, NaN -- false.
Строки - Все true, кроме пустой строки "" -- false
Объекты - Всегда true

```js
alert( 0 == "\n0\n" );
```

### Циклы while, for, switch
Для многократного повторения одного участка кода – предусмотрены циклы(интерация).

- Цикл while

```javascript
while (условие) {
  // код, тело цикла
}

var i = 0;
while (i < 3) {
  alert( i );
  i++;
}
```

- Цикл do...while

```js
do {
  // тело цикла
} while (условие);

var i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

- Цикл for

```javascript
for (начало; условие; шаг) {
  // код, тело цикла
}

for (var i = 0; i < 3; i++) {
  alert( i );
}
```

- for...in

```js
var myObject = {
    age: 18,
    heigth: 178,
    weigth: 78
}

for (var key in myObject) {
    
}
```

- break
Выйти из цикла можно не только при проверке условия но и, вообще, в любой момент. Эту возможность обеспечивает директива break

```js
var sum = 0;

while (true) {

  var value = +prompt("Введите число", '');

  if (!value) break; // (*)

  sum += value;

}
alert( 'Сумма: ' + sum );
```

- continue
Директива continue прекращает выполнение текущей итерации цикла.

```js
for (var i = 0; i < 10; i++) {

  if (i % 2 == 0) continue;

  alert(i);
}
```

- Метки для break/continue

```js
outer: for (var i = 0; i < 3; i++) {

  for (var j = 0; j < 3; j++) {

    var input = prompt('Значение в координатах '+i+','+j, '');

    // если отмена ввода или пустая строка -
    // завершить оба цикла
    if (!input) break outer; // (*)

  }
}
alert('Готово!');
```

```javascript
outer: for (var i = 0; i < 3; i++) {

  for (var j = 0; j < 3; j++) {

    var input = prompt('Значение в координатах '+i+','+j, '');

    // если отмена ввода или пустая строка -
    // завершить оба цикла
    if (!input) break outer; // (*)

  }
}
alert('Готово!');
```
- switch
Конструкция switch заменяет собой сразу несколько if.
Она представляет собой более наглядный способ сравнить выражение сразу с несколькими вариантами.

```js
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}

var arg = prompt("Введите arg?")
switch (arg) {
  case '0':
  case '1':
    alert( 'Один или ноль' );

  case '2':
    alert( 'Два' );
    break;

  case 3:
    alert( 'Никогда не выполнится' );

  default:
    alert('Неизвестное значение: ' + arg)
}
```

### Функции.
Зачастую нам надо повторять одно и то же действие во многих частях программы. Чтобы не повторять один и тот же код во многих местах, придуманы функции. Функции являются основными «строительными блоками» программы.

- Объявление

```js
function showMessage() {
  alert( 'Привет всем присутствующим!' );
}
```

- Локальные/глобальные переменные

```js
function showMessage() {
  var msg = 'Привет';
  
  alert( msg + ' всем присутствующим!' );
}

var msg = 'Привет';
function showMessage() {
  var msg = 'Привет';
  
  alert( msg + ' всем присутствующим!' );
}
```

- Аргументы по умолчанию, arguments(параметры)

```js
function showMessage(m, t) {
  var msg = 'Внимание, важность ' + (t || 0) + ' ' + m;
  alert( msg );
}

showMessage('проверка', 1, 3)
```

- Возврат значения

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Родители разрешили?');
  }
}

var age = prompt('Ваш возраст?');

if (checkAge(age)) {
  alert( 'Доступ разрешен' );
} else {
  alert( 'В доступе отказано' );
}
```

- Выбор имени функции
Имя функции следует тем же правилам, что и имя переменной. Основное отличие – оно должно быть глаголом, т.к. функция – это действие.


- Функциональные выражения
    - Function Declaration
    - Объявление Function Expression
    ```javascript
    var f = function(параметры) {
      // тело функции
    };
    ```
    - Анонимные функции
    ```javascript
        function ask(question, yes, no) {
          if (confirm(question)) yes()
          else no();
        }
        
        ask(
          "Вы согласны?",
          function() { alert("Вы согласились."); },
          function() { alert("Вы отменили выполнение."); }
        );
    ```
    - new Function
    ```javascript
        var sum = new Function('a,b', ' return a+b; ');
        
        var result = sum(1, 2);
        alert( result ); // 3
    ```


