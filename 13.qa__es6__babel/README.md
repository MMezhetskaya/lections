# Lection 13

## Что такое [QUnit](http://qunitjs.com/)

> **JavaScript unit testing framework**

### Утверждения

>Утверждение - это выражение, которое прогнозирует возвращаемый результат при выполнении вашего кода. Если прогноз неверный, то утверждение имеет значение **false**, что позволяет сделать выводы о наличии ошибок.

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

### Утверждение сравнения

- первый параметр (действительное значение)

- второй параметр (ожидаемое значение)

- работает не только с примитивными типами

**Так вместо**

``` js
QUnit.test('assertions', function(assert) {
    assert.ok( 1 == 1, 'один эквивалентно одному');
});
```

**Следует использовать**

```js
QUnit.test('assertions', function(assert) {
    assert.equal( 1, 1, 'один эквивалентно одному');
    assert.equal( 2, 1, 'один эквивалентно одному');
})
```

- использует оператор `==`

### Утверждение идентичности

- те же параметры(`equal`)

- работает не только с примитивными типами, массивами и объектами

```js
QUnit.test('test', function(assert) {
    assert.deepEqual( {}, {}, 'проходит, объекты имеют одинаковый контент');
    assert.deepEqual( {a: 1}, {a: 1} , 'проходит');
    assert.deepEqual( [], [], 'проходит, массивы имеют одинаковый контент');
    assert.deepEqual( [1], [1], 'проходит');
})
```

- использует оператор `===`

```js
QUnit.test('test', function(assert) {
    assert.equal( 0, false, 'true');
    assert.deepEqual( 0, false, 'false');
    assert.equal( null, undefined, 'true');
    assert.deepEqual( null, undefined, 'false');
})
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

### Асинхронный тест

- обычный способ

```js
QUnit.test('Асинхронный тест', function(assert) {
    setTimeout(function() {
        assert.ok(true);
    }, 100)
})
```


**Выглядит так, как будто в тесте нет никаких утверждений**

- утверждение выполнилось синхронно

- к моменту вызова функции тест уже был закончен

**Правильный вариант тестирования**

```js
QUnit.test( "assert.async() test", function(assert) {
    var done = assert.async();

    setTimeout(function() {
        assert.ok( true, "Input was focused" );
        done();
    });
});

QUnit.test( "multiple call done()", function(assert) {
    var done = assert.async(3);

    assert.expect(3);

    setTimeout(function() {
        assert.ok( true, "first call done." );
        done();
    }, 500);

    setTimeout(function() {
        assert.ok( true, "second call done." );
        done();
    }, 500);

    setTimeout(function() {
        assert.ok( true, "third call done." );
        done();
    }, 500);
});

QUnit.test( "two async calls", function(assert) {
    var done1 = assert.async(),
        done2 = assert.async();

    assert.expect(2);

    setTimeout(function() {
        assert.ok( true, "test resumed from async operation 1" );
        done1();
    }, 500);

    setTimeout(function() {
        assert.ok( true, "test resumed from async operation 2" );
        done2();
    }, 150);
});
```

## ES6 & babel

> Стандарт [ES-2015](http://www.ecma-international.org/publications/standards/Ecma-262.htm) был принят в июне 2015. Пока что большинство браузеров реализуют его частично, текущее состояние реализации различных возможностей можно посмотреть [здесь](https://kangax.github.io/compat-table/es6/).

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

## Автоматизация рабочих процессов

### [Gulp](https://gulpjs.com/)

- [Сборщик Gulp](https://github.com/Zlodej43sm/frontend__worker__gulp)

### [Webpack](https://webpack.js.org)

- [Сборщик Webpack](https://github.com/Zlodej43sm/frontend__worker__webpack)

## Заключение

- QUnit

- ES6

- Babel

- Webpack

- Gulp

## ДЗ

- доделайть предыдущее ДЗ

- ES6

- сборщик

- тесты

## Справочники
- [Qunit](http://qunitjs.com/)
- [ES-2015](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
- [Babel.JS](http://babeljs.io/)
- [ES6 список фич](http://es6-features.org/#Constants)
- [Gulp](https://gulpjs.com/)
- [Сборщик Gulp](https://github.com/Zlodej43sm/frontend__worker__gulp)
- [Webpack](https://webpack.js.org)
- [Сборщик Webpack](https://github.com/Zlodej43sm/frontend__worker__webpack)