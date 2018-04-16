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

[ES6 список фич](http://es6-features.org/#Constants)

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