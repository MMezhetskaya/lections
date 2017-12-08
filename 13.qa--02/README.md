## Что такое QUnit

QUnit, разработанный командой jQuery, является великолепной рабочей средой для тестирования вашего кода JavaScript. В данном уроке мы познакомимся с QUnit.

Модульное тестирование или юнит-тестирование (англ. unit testing) — процесс в программировании, позволяющий проверить на корректность отдельные модули исходного кода программы. Идея состоит в том, чтобы писать тесты для каждой нетривиальной функции или метода. Это позволяет достаточно быстро проверить, не привело ли очередное изменение кода к регрессии, то есть к появлению ошибок в уже оттестированных местах программы, а также облегчает обнаружение и устранение таких ошибок.

Определение процитировано из Википедии. Просто сделайте тесты для каждого функционального блока вашего кода, и если все тесты будут пройдены, то можно быть уверенным в отсутствии ошибок  (главным образом зависит от того, насколько тщательно разработаны тесты).


```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>QUnit Example</title>
    <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.4.1.css">
</head>
<body>
<div id="qunit"></div>
<div id="qunit-fixture"></div>
<script src="https://code.jquery.com/qunit/qunit-2.4.1.js"></script>
<script src="js/qunit_test.js"></script>
</body>
</html>
```

```javascript
QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});
```

## Зачем следует тестировать свой код

Если вы никогда не писали модульных тестов раньше, то, вероятно,  просто размещали свой код сразу на веб сервере, запускали его, следили за проявлением ошибок и пытались устранить их по мере обнаружения. Такой метод работы рождает много проблем.

Во-первых, это очень нудное и скучное занятие. Проверка в действительности является весьма сложной работой, потому что надо быть уверенным, что все было нажато. А в данном процессе есть очень большая вероятность, что один-два момента могут быть пропущены.

Во-вторых, все, что делается для такого тестирования, не может быть использовано повторно. При таком методе очень сложно найти регрессии. Что такое регрессии? Представьте, что вы написали некий код и протестировали его, исправили все ошибки, которые нашли, и поместили код на сайте. Затем пользователь прислал отзыв о новых ошибках и запрос на новые функции. Вы возвращаетесь к коду, исправляете ошибки и добавляете новые функции. При этом может возникнуть ситуация, когда старые ошибки проявляются снова, что называется "регрессией". Вам снова приходится все проверять. И есть шанс, что вы не найдете свои старые ошибки. В любом случае пройдет время, прежде чем вы догадаетесь, что  проблема вызвана "регрессией". При использовании модульного тестирования вы пишите тест. Как только код модифицируется, вы снова фильтруете его через тест. Eсли регрессия проявляется, то какие-нибудь тесты не пройдут, и вы легко определите, какая часть кода содержит ошибку. Так как вы знаете, что изменили, то ошибку будет легко исправить.

Другим преимуществом модульного тестирования (особенно для веб разработок) является то, что легко протестировать кросс-браузерную совместимость. Нужно просто запустить тесты в различных браузерах. Если обнаружатся проблемы в браузере, то вы сможете исправить их и запустить тест снова. В итоге вы будете уверены, что все целевые браузеры поддерживаются, так как все они прошли тестирование.

## Как протестировать код Javascript с помощью QUnit

Итак, как же непосредственно писать тесты модулей в QUnit? Первым шагом нужно установить среду тестирования:

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

Код, который будет тестироваться, помещается в файл test.js, а тесты помещаются в qunit_test.js. Чтобы запустить тесты, нужно просто открыть HTML  файл в браузере. Теперь пришло время написать какой-нибудь тест.

```javascript
// протестируем данную функцию
function isEven(val) {
    return val % 2 === 0;
}
```

Строительным блоком модульного тестирования является утверждение.

"Утверждение - это выражение, которое прогнозирует возвращаемый результат при выполнении вашего кода. Если прогноз неверный, то утверждение имеет значение false, что позволяет сделать выводы о наличии ошибок."

Для выполнения утверждений их нужно поместить в блок теста:

```javascript
QUnit.test('isEven()', function(assert) {
    assert.ok(isEven(0), 'Ноль - четное число');
    assert.ok(isEven(2), 'Два - тоже');
    assert.ok(isEven(-4), 'И отрицательное четыре - тоже четное число');
    assert.ok(!isEven(1), 'Один - нечетное число');
    assert.ok(!isEven(-7), 'Как и отрицательное семь - нечетное число');
    assert.ok(isEven(3), 'Три - четное число');

});
```

### Другие утверждения

ok() не является единственным утверждением, которое поддерживает QUnit. Существуют и другие типы утверждений, которые удобно использовать при составлении тестов для ваших проектов:

### Утверждение сравнения

Утверждение сравнения equals() предполагает, что первый параметр (который является действительным значением) эквивалентен второму параметру (который является ожидаемым значением). Данное утверждение очень похоже на ok(), но выводит оба значения - действительное и предполагаемое, что существенно облегчает отладку кода. Также как и ok(), equals() в качестве третьего параметра может принимать сообщение для вывода.

Так вместо

```javascript
QUnit.test('assertions', function(assert) {
    assert.ok( 1 == 1, 'один эквивалентно одному');
});
```

Следует использовать:

```javascript
QUnit.test('assertions', function(assert) {
    assert.equal( 1, 1, 'один эквивалентно одному');
});
```

Обратите внимание, что в конце строки выводится предполагаемое значение.

А если значения не равны:

```javascript
QUnit.test('assertions', function(assert) {
    assert.equal( 2, 1, 'один эквивалентно одному');
})
```

Такая запись дает больше информации.

Утверждение сравнения использует оператор “==” для проверки параметров, поэтому оно не может работать с массивами или объектами:

```javascript
QUnit.test('test', function(assert) {
    assert.equal( {}, {}, 'ошибка, это разные объекты');
    assert.equal( {a: 1}, {a: 1} , 'ошибка');
    assert.equal( [], [], 'ошибка, это разные массивы');
    assert.equal( [1], [1], 'ошибка');
})
```

Для таких случаев в QUnit есть утверждение идентичности.

### Утверждение идентичности

Утверждение идентичности deepEqual() использует те же параметры, что и deepEqual(), но работает не только с примитивными типами, а и с массивами и объектами. Утверждения из предыдущего примера пройдут проверку, если изменить из на утверждения идентичности:

```javascript
QUnit.test('test', function(assert) {
    assert.deepEqual( {}, {}, 'проходит, объекты имеют одинаковый контент');
    assert.deepEqual( {a: 1}, {a: 1} , 'проходит');
    assert.deepEqual( [], [], 'проходит, массивы имеют одинаковый контент');
    assert.deepEqual( [1], [1], 'проходит');
})
```

Заметьте, что deepEqual() использует оператор ‘===’ для сравнения, поэтому его удобно использовать для сравнения специальных значений:

```javascript
QUnit.test('test', function(assert) {
    assert.equal( 0, false, 'true');
    assert.deepEqual( 0, false, 'false');
    assert.equal( null, undefined, 'true');
    assert.deepEqual( null, undefined, 'false');
})
```

## Структура утверждений

Размещать все утверждения в одном тесте - очень плохая идея. Такой тест будет сложно поддерживать и можно запутаться в оценке результатов его выполнения. Поэтому нужно структурировать тест, размещая утверждения в отдельные блоки, каждый из которых будет нацелен на определенную группу функций.

Можно организовывать отдельные модули с помощью вызова функции module:

```javascript
QUnit.module('Модуль A');
QUnit.test('Тест', function() {});
QUnit.test('Еще один тест', function() {});


QUnit.module('Модуль B');
QUnit.test('Тест', function() {});
QUnit.test('Еще один тест', function() {});
```

## Асинхронный тест

В предыдущем примере все утверждения вызывались синхронно, то есть выполнялись одно за другим. В реальном мире существует множество асинхронных функций, таких как запросы AJAX или функции setTimeout() и setInterval(). Как нам тестировать такой тип функций? QUnit имеет специальный тип тестов, который называется "асинхронный тест" и предназначен для асинхронного тестирования:

Сначала попробуем написать тест обычным способом:

```javascript
QUnit.test('Асинхронный тест', function(assert) {
    setTimeout(function() {
        assert.ok(true);
    }, 100)
})
```

Выглядит так, как будто в тесте нет никаких утверждений. Потому что утверждение выполнилось синхронно, но к моменту вызова функции тест уже был закончен.

Правильный вариант тестирования нашего примера:

```javascript
QUnit.test( "assert.async() test", function( assert ) {
    var done = assert.async();

    setTimeout(function() {
        assert.ok( true, "Input was focused" );
        done();
    });
});

QUnit.test( "multiple call done()", function( assert ) {
    assert.expect( 3 );
    var done = assert.async( 3 );

    setTimeout(function() {
        assert.ok( true, "first call done." );
        done();
    }, 500 );

    setTimeout(function() {
        assert.ok( true, "second call done." );
        done();
    }, 500 );

    setTimeout(function() {
        assert.ok( true, "third call done." );
        done();
    }, 500 );
});

QUnit.test( "two async calls", function( assert ) {
    assert.expect( 2 );

    var done1 = assert.async();
    var done2 = assert.async();
    
    setTimeout(function() {
        assert.ok( true, "test resumed from async operation 1" );
        done1();
    }, 500 );
    setTimeout(function() {
        assert.ok( true, "test resumed from async operation 2" );
        done2();
    }, 150);
});
```

## Сборка с [Webpack](https://webpack.js.org)

По шагам:

 1) ` mkdir my_project ` 
 2) ` cd my_project ` 
 3) ` npm init ` 
 4) ` npm install --save-dev webpack `
 5) ` npm install --save-dev extract-text-webpack-plugin `
 6) ` npm install --save-dev node-sass `
 7) ` npm install --save-dev css-loader `
 8) ` npm install --save-dev style-loader `
 9) ` npm install --save-dev sass-loader `
 10) ` touch webpack.config.js `
 11) ```javascript
        var path = require('path'),
            ExtractTextPlugin = require('extract-text-webpack-plugin');
        
        module.exports = {
            context: path.join(__dirname),
        
            entry: {
                bundle: './js',
                styles: './styles'
            },
        
            output: {
                path: path.join(__dirname) + '/public/compiled',
                filename: 'js/[name].js'
            },
        
            watch: true,
        
            watchOptions: {
                aggregateTimeout: 100
            },
        
            resolve: {
                extensions: ['.js', '.scss', '.css']
            },
        
            module: {
                rules: [
                    {
                        test: /\.(scss|css)$/,
                        loader: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: [
                                {
                                    loader: 'css-loader'
                                },
                                {
                                    loader: 'sass-loader'
                                }
                            ]
                        })
                    }
                ]
            },
        
            plugins: [
                new ExtractTextPlugin('css/[name].css')
            ]
        };
     ``` 
    
[Сборщик Gulp](https://github.com/Zlodej43sm/frontend__worker__webpack)


### Заключение

### ДЗ

Взять тесты с предыдущего ДЗ противоположной комманды разработчиков, и переписать их используя QUnit, при этом дополнить их если видите необходимость.

### Справочники
- [Qunit](http://qunitjs.com/)
- [Webpack](https://webpack.js.org)
- [Сборщик Webpack](https://github.com/Zlodej43sm/frontend__worker__webpack)