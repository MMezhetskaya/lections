## React l.01

### Вступление

1. Создавать компоненты, учитывая **propTypes**

2. Грамотно использовать **props** и **state** компонента 

3. Работать с формой

4. Работать с **react dev tools**

5. Рефакторить

### Подготовка

1. Скачать (React.js)[https://reactjs.org/]

```bash
npm init && npm i --save react react-dom;
```

2. Создать структуру проекта

```
+-- node_modules
|   +-- react
|      +-- umd
|          +-- react.development.js
|   +-- react-dom
|      +-- umd
|          +-- react-dom.development.js
+-- js
|   +-- app.js
+-- index.html
+-- package.json
+-- server.js
```

3. Установить **React Developer Tools**

4. Локальный сервер

- **package.json**

```json
{
  "name": "project__demo",
  "version": "1.0.0",
  "description": "React demo project",
  "main": "index.html",
  "scripts": {
    "start": "node server.js"
  },
  "author": "Alec Povolotskiy",
  "license": "MIT"
}
```

- поднимем на **node.js** || **express**

```bash
npm install --save-dev express;
```

- **server.js**

```js
const express = require('express');

let app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname));

app.listen(app.get('port'), function() {
    console.log('Server started: http://project__demo.lh:' + app.get('port') + '/');
});
```

- **index.html**

```html
<!DOCTYPE html>
<html>
    <head>
        <title>React Demo project</title>
    </head>
    
    <body>
        <div id="root">Привет, я #root</div>
    </body>
</html>
```

- **node server.js** || **npm start**

## Подключаем react

1. Обновим **index.html**

```html
<!DOCTYPE html>
<html>
    <head>
        <title>React Demo project</title>
    </head>
    
    <body>
        <div id="root">Привет, я #root</div>
        
        <script src="node_modules/react/umd/react.development.js"></script>
        <script src="node_modules/react-dom/umd/react-dom.development.js"></script>
        <script src="js/app.js"></script>
    </body>
</html>
```

2. **js/app.js**

```js
console.log(React);
console.log(ReactDOM);
```

- изменим **js/app.js**:

```js
ReactDOM.render(
    React.createElement('h1', null, 'Привет, Мир!'),
    document.getElementById('root')
);
```

### Вау что это было!

- Мы использовали функцию **ReactDOM.render**, которая принимает первым аргументом - реакт-компонент, а вторым - элемент **DOM-дерева**, куда мы хотим добавить **react**.

- Вообще, зачем мы добавили **react** на нашу страницу? Наверное, потому что где-то слышали, что он быстрый.

- **React** при изменениях **DOM-дерева**, старается использовать минимально-возможные воздействия. **React** использует **"виртуальный DOM"** (удаляет/изменяет/добавляет элементы и т.д.) для того, чтобы в реальный **DOM** за "один присест" добавить все изменения.
 Как известно, операции с **DOM-деревом** самые дорогостоящие. Поэтому "интеллектуальный" подход реакта к ним - та самая "киллер-фича".
 
### Ситаксис завоевывающий мир

- Разметка в javascript-коде - **JSX**

```js
ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);
```

- Увы нужен **transpiler**

```html
<!DOCTYPE html>
<html>
    <head>
        <title>React Demo project</title>
    </head>

    <body>
        <div id="root">Привет, я #root</div>

        <script src="node_modules/react/umd/react.development.js"></script>
        <script src="node_modules/react-dom/umd/react-dom.development.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
        <script type="text/babel" src="js/app.js"></script>
    </body>
</html>
```

## Создание компонента

- Что такое компонент? 

```js
ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);
```

- Псевдо-код

```js
let photos = ['images/cat.jpg','images/dog.jpg','images/owl.jpg']

ReactDOM.render(
  <App>
    <Photos photos=photos />
    <LastNews />
    <Comments />
  </App>,
  document.getElementById('root')
);
```

- А теперь на **react**

```js
class App extends React.Component {
    render() {
        return (
            <div className="app">
                Всем привет, я компонент App!
            </div>
        );
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```

- Развиваем идею

```js
class App extends React.Component {
    render() {
        return (
            <div className="app">
                Всем привет, я компонент App! Я умею отображать новости.

                <News />
            </div>
        );
    }
}

class News extends React.Component {
    render() {
        return (
            <div className="news">
                Новостей нет!
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```

### Что же вынесем!

1. Мы никак не изменили код внутри ReactDOM.render. Компонент <App />, содержит сейчас в себе другой компонент. Но при этом, это никак не влияет на "рендер" всего нашего приложения.

2. Компонент <App /> содержит в себе компонент <News />. Да-да! Так же, как если бы это был просто дочерний <div></div> элемент.

3. Наш компонент <News /> такой же примитивный, как и App, и содержит всего один (обязательный!) метод render.

## props

У каждого компонента могут быть свойства. Они хранятся в **this.props**, и передаются компоненту как атрибуты.

```js
let value1 = {name: Garry, surname: Potter};

<MyComponent data={value1} eshe_odno_svoistvo={[1,2,3,4,5]} />
```

**this.props** используются только для чтения!

- Продолжаем идею с новостями

```js
let my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000'
    }
];

class App extends React.Component {
    render() {
        return (
            <div className="app">
                Всем привет, я компонент App! Я умею отображать новости.

                <News data={my_news} /> {/* текст комментария */}
            </div>
        );
    }
}
```

### Круто, но хотелось бы отобразить новости!

```js
class News extends React.Component {
    render() {
        let newsData = this.props.data,
            newsTemplate = newsData.map((item, idx) => {
                return (
                    <div key={idx}>
                        <p className="news__author">{item.author}:</p>
                        <p className="news__text">{item.text}</p>
                    </div>
                )
            });

        return (
            <div className="news">
                {newsTemplate}
            </div>
        )
    }
}
```

## Порефакторим!?

```js
class News extends React.Component {
    render() {
        let newsData = this.props.data,
            newsTemplate = newsData.map((item, idx) => {
                return (
                    <div key={idx}>
                        <p className="news__author">{item.author}:</p>
                        <p className="news__text">{item.text}</p>
                    </div>
                )
            });

        return (
            <div className="news">
                {!!newsTemplate.length ? newsTemplate : 'Новостей нет'}
            </div>
        )
    }
}
```

## Заключение

## ДЗ

## Справочники
- (React.js)[https://reactjs.org/]