### Замыкания, область видимости
Глобальность. Глобальными называют переменные и функции, которые не находятся внутри какой-то функции. То есть, иными словами, если переменная или функция не находятся внутри конструкции function, то они – «глобальные».
 
```js
var a = 5; // объявление var создаёт свойство window.a
alert( window.a ); // 5
```

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