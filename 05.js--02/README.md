# Lection 01

##Привет JS

### Поехали!!!!
####Так что же такое JS?
- предыстория (ECMAScript)
- что такое скрипты?
- как работает (интерпретатор)?
    - Компиляция
    - Интерпретация
- среда выполнения

###Что (не)умеем
- контекст выполнения
- браузер
- безопасность
- песочница

###В чём же уникальность?
- Полная интеграция с HTML/CSS.
- Поддерживается всеми распространёнными браузерами.

###Спецификация и справочники
- [ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
- [Mozilla Developer Network](https://developer.mozilla.org/en-US/)
- [MSDN](http://msdn.microsoft.com/)

###IDE
- Integrated Development Environment, что просто редактор?
    - Подсветку синтаксиса
    - Автодополнение
    - Фолдинг 
- Лёгкие редакторы

###Мои предпочтения
- PHPStorm/WebStorm
- Из быстрых Sublime Text/Notepad++

### А как же ошибки!
- Chrome/Firefox/Internet Explorer
- консоль

##Ура добрались, основы JS

- Как подключить:
```html
<!DOCTYPE HTML>
<html>

<head>
  <!-- Тег meta для указания кодировки -->
  <meta charset="utf-8">
  <script src="./scripts.js"></script>
  <script src="./scripts_01.js"></script>
</head>

<body>

  <p>Начало документа...</p>
  <script>
    alert( 'Привет, Мир!' );
  </script>

  <p>...Конец документа</p>

</body>

</html>
```
- defer/async
```html
<head>
    <!-- Тег meta для указания кодировки -->
    <meta charset="utf-8">
   
</head>

<body>

<p>Начало документа...</p>
<script defer src="./scripts.js"></script>
<script defer src="./scripts_01.js"></script>
<p>...Конец документа</p>

</body>

</html>
```

##Структура кода
- строки 
```javascript
alert('Привет');
alert('Мир');
```
- разделитель ";"
```javascript
alert('Привет')
alert('Мир')
[1, 2, 3].forEach();
```
- комментарии "//, /**/"
```javascript
/*
* 1 line
* 2 line
*/
alert('Привет');

// one line
alert('Мир');
```
- директива use strict
- ECMAScript 5 

###Переменные

- Имя может состоять из: букв, цифр, символов $ и _
- Первый символ не должен быть цифрой, или -
- Регистр

```javascript
var myName = 'Alec';
```
- Константы
```javascript
var IS_ACTIVE = true;

var status = IS_ACTIVE;
```
- Правила именования

###Шесть типов данных, typeof
- примитивы
    - number
        - Infinity
        - NaN
    - string
    - boolean
        - true
        - false
    - null
    - undefined

- object

- typeof

###Основные операторы
- Операнд
- Унарный
```javascript
var x = 1;
x = -x;
```
- Бинарный
```javascript
var x = 1, y = 3;
console.log( y - x )
```
- Сложение строк, бинарный +
- Преобразование к числу, унарный плюс +
- [Приоритеты](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
```javascript
    var x = 2 * 2 + 1;
    var a, b, c;
    
    a = b = c = 2 + 2;
```
- Присваивание
```javascript
    var a = 1;
    var b = 2;
    
    var c = 3 - (a = b + 1); 
    
    var n = 2;
    n *= 3 + 5;
```
- Взятие остатка %
- Инкремент/декремент: ++, --
    - постфиксная форма i++
    - префиксная форма ++i
- Побитовые операторы
    - AND(и) ( & )
    - OR(или) ( | )
    - XOR(побитовое исключающее или) ( ^ )
    - NOT(не) ( ~ )
    - LEFT SHIFT(левый сдвиг) ( << )
    - RIGHT SHIFT(правый сдвиг) ( >> )
    - ZERO-FILL RIGHT SHIFT(правый сдвиг с заполнением нулями) ( >>> )
- Оператор запятая
```javascript
    var a = (5, 6);
      
  alert( a );
```
- Операторы сравнения и логические значения
    - Сравнение строк
    - Сравнение разных типов
    - Строгое равенство
- Оператор if, else, else if
- Оператор ? (тернарный оператор)
- Логические операторы ||, &&, !

###Циклы while, for

- Итерация
- Цикл do…while
```javascript
while (условие) {
  // код, тело цикла
}
```

- Цикл for
```javascript
for (;;) {
  // код, тело цикла
}
```
- for..in
- break
- continue
- Метки для break/continue
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

### Функции. Фуууух конец!!!
- Что это?
- Объявление
- Аргументы по умолчанию, arguments
- Возврат значения
- Выбор имени функции
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


