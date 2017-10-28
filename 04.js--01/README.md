# Lection 01

### Поехали!!!!
#### Так что же такое JS?
- предыстория (ECMAScript)
- что такое скрипты?
- как работает (интерпретатор)?
    - Компиляция
    - Интерпретация
- среда выполнения

### Что (не)умеем
- контекст выполнения
- браузер
- безопасность
- песочница

### В чём же уникальность?
- Полная интеграция с HTML/CSS.
- Поддерживается всеми распространёнными браузерами.

### Спецификация и справочники
- [ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
- [Mozilla Developer Network](https://developer.mozilla.org/en-US/)
- [MSDN](http://msdn.microsoft.com/)

### IDE
- Integrated Development Environment, что просто редактор?
    - Подсветку синтаксиса
    - Автодополнение
    - Фолдинг 
- Лёгкие редакторы

### Мои предпочтения
- PHPStorm/WebStorm
- Из быстрых Sublime Text/Notepad++

### А как же ошибки!
- Chrome/Firefox/Internet Explorer
    - Trident — проприетарный движок Microsoft Internet Explorer; используется многими программами для Microsoft Windows (например, мини-браузерами в программах Winamp и RealPlayer).
    - Gecko — открытый движок проекта Mozilla; используется в большом числе программ, основанных на коде Mozilla (браузере Firefox, почтовом клиенте Thunderbird, наборе программ SeaMonkey).
    - KHTML — разработан в рамках проекта KDE, используется в браузере Konqueror и послужил основой для WebKit.
    - WebKit — движок для браузера Apple Safari, включенного в операционную систему Mac OS X, и браузера Google Chrome. Встроен в библиотеку Qt.
    - Presto — проприетарный движок, разработанный Opera Software; являлся базой для браузера Opera до перехода на Blink, а также лицензирован для использования рядом сторонних компаний.
    - Blink — движок браузера Google Chrome с 28 версии и Opera c 15 версии. Является ответвлением WebKit.
    - Edge — новый движок от компании Microsoft для её нового браузера Microsoft Edge. Является ответвлением Trident.
    
- консоль 
```js
var a = function(b) {
        return 3 + b;
    };

console.log(a(7));

```

```js
var a = function(b) {
        debugger;
        return 3 + b;
    };

a();
```

## Ура добрались, основы JS

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

![Alt text](./examples/i/defer_async.png "Flex axis")

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

## Структура кода
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

### Переменные

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

### Шесть типов данных, typeof
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

### Основные операторы
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

### Взаимодействие с пользователем: alert, prompt, confirm 
- alert
- prompt
- confirm

## Справочники
- [ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
- [Mozilla Developer Network](https://developer.mozilla.org/en-US/)
- [MSDN](http://msdn.microsoft.com/)
- [Приоритеты](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)


