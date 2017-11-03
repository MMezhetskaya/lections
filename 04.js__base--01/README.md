# Lection 04

### Поехали!!!!
#### Так что же такое JS?
- предыстория (ECMAScript)
- что такое скрипты?
- как работает (интерпретатор)?
    - Компиляция
    - Интерпретация
- среда выполнения

### Что (не)умеет
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
    - резерв var, class, return, export и др.
    - Нет транслиту. Только английский.
    - Использовать короткие имена только для переменных местного значения
    - camelCase
    - Имя переменной должно максимально чётко соответствовать хранимым в ней данным.
    - 'Лишняя' переменная – добро, а не зло.

### Шесть типов данных, typeof
- примитивы
    - number
    
        ```js
            var n = 123;
            n = 12.12;
        ```
    
        - Infinity 'alert( 1 / 0 ); // Infinity'
        - NaN 'alert( "нечисло" * 2 )'
    - string
    
    ```js
        var n = 'String 0';
        n = "String 1";
    ```
    
    - boolean
        ```js
            var isReady = true;
            isReady = false;
        ```
        - true
        - false
     
    - null
    - undefined
    ```js
        var n; //undefined
        n = null;
    ```
    В явном виде undefined обычно не присваивают, так как это противоречит его смыслу. Для записи в переменную «пустого» или «неизвестного» значения используется null.

- object
```js
    var myGroup = { name: "Best of the best" };
```

- typeof
```js
    var x;

    typeof x;
    typeof(x);
    
    typeof undefined // "undefined"
    
    typeof 0 // "number"
    
    typeof true // "boolean"
    
    typeof "foo" // "string"
    
    typeof {} // "object"
    
    typeof null // "object"  (1)
    
    typeof function(){} // "function"  (2)
```
(1) официально признанная ошибка в языке
(2) подвид объектов

### Основные операторы
- Операнд 
```js
5 * 2
```

- Унарный
```javascript
var x = 1;
x = -x;
```
- Бинарный
```javascript
var x = 1, y = 3;
alert( y - x );
```
- Сложение строк, бинарный +
Если хотя бы один аргумент является строкой, то второй будет также преобразован к строке!
```js
alert( '1' + 2 ); // "12"
alert( 2 - '1' ); // 1
alert( 6 / '2' ); // 3
```
- Преобразование к числу, унарный плюс +
```js
var apples = "2";
var oranges = "3";

alert( apples + oranges ); // "23", так как бинарный плюс складывает строки
```

```js
var apples = "2";
var oranges = "3";

alert( +apples + +oranges ); // 5, число, оба операнда предварительно преобразованы в числа
```

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

- [Взятие остатка %](https://ru.wikipedia.org/wiki/%D0%94%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81_%D0%BE%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%BE%D0%BC)

- Инкремент/декремент: ++, --
Инкремент/декремент можно применить только к переменной. Код 3++ даст ошибку. 
    - префиксная форма ++i
    ```js
        var i = 1;
        var a = ++i; // (*)
        
        alert(a); // 2
    ```
    
    - постфиксная форма i++
    ```js
        var i = 1;
        var a = i++; // (*)
        
        alert(a); // 1
    ```
    
- Побитовые операторы
Побитовые операторы рассматривают аргументы как 32-разрядные целые числа и работают на уровне их внутреннего двоичного представления.
    - AND(и) ( & )
    - OR(или) ( | )
    - XOR(побитовое исключающее или) ( ^ )
    - NOT(не) ( ~ )
    - LEFT SHIFT(левый сдвиг) ( << )
    - RIGHT SHIFT(правый сдвиг) ( >> )
    - ZERO-FILL RIGHT SHIFT(правый сдвиг с заполнением нулями) ( >>> )
    
- Сокращённая арифметика с присваиванием
```js
var n = 2;
n = n + 5;
n = n * 2;
```

```js
var n = 2;
n += 5; // теперь n = 7 (работает как n = n + 5)
n *= 2; // теперь n = 14 (работает как n = n * 2)

alert( n ); // 14
```

```js
var n = 2;
n *= 3 + 5;

alert( n ); // 16  (n = 2 * 8)
```

- Оператор запятая
```javascript
    var a = (5, 6);

    alert( a );
    
    for (a, b = 3, c = a*b; a < 10; a++) {}
```

- Операторы сравнения
    - Больше/меньше: a > b, a < b 
    - Больше/меньше или равно: a >= b, a <= b
    - Равно a == b. Для сравнения используется два символа равенства '='. Один символ a = b означал бы присваивание
    - «Не равно». В математике он пишется как ≠, в JavaScript – знак равенства с восклицательным знаком перед ним !=
    
- Логические значения
    - true – имеет смысл «да», «верно», «истина»
    - false – означает «нет», «неверно», «ложь» 
    
    ```js
    alert( 2 > 1 ); // true, верно
    alert( 2 == 1 ); // false, неверно
    alert( 2 != 1 ); // true
  
    var a = true; // присваивать явно
    
    var b = 3 > 4; // или как результат сравнения
    alert( b ); // false
    
    alert( a == b ); // (true == false) неверно, выведет false
    ```
    
- Сравнение строк
Аналогом «алфавита» во внутреннем представлении строк служит кодировка, у каждого символа – свой номер (код). JavaScript использует кодировку [Unicode](https://ru.wikipedia.org/wiki/%D0%AE%D0%BD%D0%B8%D0%BA%D0%BE%D0%B4)
```js
alert( 'a' > 'A' ); // true
'a'.charCodeAt(0);
alert( "3" > "14" ); //true
alert( +"3" > +"14" ); //false
```

- Сравнение разных типов
При сравнении значений разных типов, используется числовое преобразование. Оно применяется к обоим значениям.
```js
alert( '2' > 1 ); // true, сравнивается как 2 > 1
alert( '01' == 1 ); // true, сравнивается как 1 == 1
alert( false == 0 ); // true, false становится числом 0
alert( true == 1 ); // true, так как true становится числом 1.
```


- Строгое равенство '===' | '!=='
В обычном операторе == есть «проблема» – он не может отличить 0 от false:
```js
 alert( 0 == false ); // true
```
   
Та же ситуация с пустой строкой:
```js
alert( '' == false ); // true
```

Это естественное следствие того, что операнды разных типов преобразовались к числу.
   
- Сравнение с null и undefined
Значения null и undefined равны == друг другу и не равны чему бы то ни было ещё. Это жёсткое правило буквально прописано в спецификации языка.
При преобразовании в число null становится 0, а undefined становится NaN
```js
alert( null > 0 ); // false
alert( null == 0 ); // false
alert(null >= 0); // true
``` 
Сравнение честно приводит к числу, получается ноль. А при проверке равенства значения null и undefined обрабатываются особым образом: они равны друг другу, но не равны чему-то ещё.

Значение undefined вообще нельзя сравнивать:
```js
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

### Взаимодействие с пользователем: alert, prompt, confirm 
Модальное - означает, что посетитель не может взаимодействовать со страницей

- alert
alert(сообщение)
```js
alert( "Привет" );
```

- prompt
result = prompt(title, default);
```js
var years = prompt('Сколько вам лет?', 100);

alert('Вам ' + years + ' лет!')

```
- confirm
result = confirm(question);
```js
var isAdmin = confirm("Вы - администратор?");

alert( isAdmin );
```
## Заключение
- Однопотоковый интерпритируемый язык
- Возможности зависят от окружения, в котором запущен JavaScript.
- Полная интеграция с HTML/CSS. Поддерживается всеми распространёнными браузерами и включён по умолчанию.
- Отладка, консоль
- Подключение
- Структура кода
- Переменные
- Шесть типов данных, typeof
- Основные операторы
- Взаимодействие с пользователем: alert, prompt, confirm 

## ДЗ
Создайте страницу которая будет спрашивать возвраст, проверять его, и если больше 18 выводить окно с вопросом готовы ли посетить сайт. В случае если пользователь нажимает "да" то выводить сообщение - 'ваш возвраст {введеное значение}', если "нет" то выводить сообщение "Досвидание".

## Справочники
- [Git ссылка на лекцию](https://github.com/Zlodej43sm/lections/tree/master/03.layout_styles_watcher)
- [ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
- [Mozilla Developer Network](https://developer.mozilla.org/en-US/)
- [MSDN](http://msdn.microsoft.com/)
- [Приоритеты](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
- [Взятие остатка %](https://ru.wikipedia.org/wiki/%D0%94%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81_%D0%BE%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%BE%D0%BC)
- [Unicode](https://ru.wikipedia.org/wiki/%D0%AE%D0%BD%D0%B8%D0%BA%D0%BE%D0%B4)


