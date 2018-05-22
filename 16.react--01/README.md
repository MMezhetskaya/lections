# Lection l.16

## React p.01

## Подготовка

- скачать [React.js](https://reactjs.org/)

- структура проекта

```
/root
+-- /node_modules
|   +-- /react
|      +-- /umd
|          +-- react.development.js
|   +-- /react-dom
|      +-- /umd
|          +-- react-dom.development.js
+-- /js
|   +-- app.js
+-- index.html
+-- package.json
+-- server.js
```

- установить **React Developer Tools**

**Локальный сервер**

- **package.json**

```bash
npm init;
```

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

- поднимем на **node.js** && **express**

```bash
npm install --save-dev express;
```

- **server.js**

```js
const express = require( "express");

let app = express();

app.set( "port ", (process.env.PORT || 3000));

app.use( "/ ", express.static(__dirname));

app.listen(app.get( "port "), function() {
    console.log( "Server started: http://localhost: " + app.get( "port ") + "/ ");
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

- **node server.js** или **npm start**

## Подключаем react

- установим **react** и **react-dom**

```bash
npm i --save react react-dom;
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
        
        <script src="node_modules/react/umd/react.development.js"></script>
        <script src="node_modules/react-dom/umd/react-dom.development.js"></script>
        <script src="js/app.js"></script>
    </body>
</html>
```

- **js/app.js**

```js
ReactDOM.render(
    React.createElement( "h1 ", null, "Привет, Мир! "),
    document.getElementById( "root ")
);
```

### Вау что это было!

- использовали функцию **ReactDOM.render**

    - реакт-компонент

    - куда мы хотим добавить реакт-компонент

**Зачем мы добавили react на нашу страницу?**

- где-то слышали, что он быстрый


**Почему**

- при изменениях **DOM-дерева**, старается использовать минимально-возможные воздействия

- использует **виртуальный DOM**

    - удаляет/изменяет/добавляет элементы и т.д.

    - в реальный **DOM** за "один присест" все изменения

**Note:** операции с **DOM-деревом** самые дорогостоящие
 
### Ситаксис завоевывающий мир

- разметка в javascript-коде - **JSX**

```jsx
ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById( "root ")
);
```

- увы нужен **transpiler**

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

- что такое компонент?

```js
ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById( "root ")
);
```

- псевдо-код

```js
let photos = [ "images/cat.jpg ", "images/dog.jpg ", "images/owl.jpg "]

ReactDOM.render(
  <App>
    <Photos photos=photos />
    <LastNews />
    <Comments />
  </App>,
  document.getElementById( "root ")
);
```

- а теперь на **react**

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
    document.getElementById( "root ")
);
```

- развиваем идею

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
    document.getElementById( "root ")
);
```

### Что же имеем!

- не изменили код внутри `ReactDOM.render`

    - компонент `<App />`, содержит сейчас в себе другой компонент

        - никак не влияет на рендер всего нашего приложения

- компонент `<App /> `содержит в себе компонент `<News />`

    - так же, как если бы это был просто дочерний `<div></div>` элемент

- наш компонент `<News />` такой же примитивный, как и `App`

    - содержит всего один (обязательный!) метод `render`

## props

У каждого компонента могут быть свойства

- хранятся в **this.props**

    - передаются компоненту как атрибуты

```js
let value1 = {name: Garry, surname: Potter};

<MyComponent data={value1} eshe_odno_svoistvo={[1,2,3,4,5]} />
```

**this.props** используются только для чтения!

- продолжаем идею с новостями

```js
let my_news = [
    {
        author: "Саша Печкин ",
        text: "В четверг, четвертого числа... "
    },
    {
        author: "Просто Вася ",
        text: "Считаю, что $ должен стоить 37 гривен! "
    },
    {
        author: "Гость ",
        text: "Бесплатно. Скачать. Лучший сайт - http://localhost:3000 "
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

## prop-types

**Note:** `PropTypes` не работает с production версией `React`

- ломаем код(легкий вариант, тут все понятно)

```js
class App extends React.Component {
    render() {
        return (
            <div className="app">
                <h1>Всем привет, я компонент App! Я умею отображать новости.</h1>

                <News /> {/* удалим дату */}
            </div>
        );
    }
}
```

- проверяем страницу, анализируем

- собственно **propTypes**

```bash
npm install --save prop-types
```

```html
<script src="node_modules/prop-types/prop-types.js"></script>
```

```js
class News extends React.Component {    
    render() {
        let newsData = this.props.data,
            newsTemplate = newsData.map((item, idx) => {
                return (
                    <Article data={item} key={idx} />
                )
            }),
            newsLength = newsTemplate.length;

        return (
            <section className="news">
                {!!newsLength ? newsTemplate  : "Новостей нет "}

                <NewsCount total={newsLength}/>
            </section>
        )
    }
}

News.propTypes = {
    data: PropTypes.array.isRequired
};
```

- более интересный пример

```js
let my_news = [
    {
        author: "Саша Печкин ",
        // text: "В четверг, четвертого числа... "
    },
    {
        author: "Просто Вася ",
        text: "Считаю, что $ должен стоить 37 гривен! "
    },
    {
        author: "Гость ",
        text: "Бесплатно. Скачать. Лучший сайт - http://localhost:3000 "
    }
];

class Article extends React.Component {
    render() {
        let author = this.props.data.author,
            text = this.props.data.text;

        return (
            <article className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
            </article>
        )
    }
}

Article.propTypes = {
    data: PropTypes.shape({
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })
};
```

- Пройдёмся подробнее [React page prop-types](https://reactjs.org/docs/typechecking-with-proptypes.html)

## Порефакторим!?

```js
class News extends React.Component {
    render() {
        let newsData = this.props.data,
            newsTemplate = newsData.map((item, idx) => {
                return (
                    <Article data={item} key={idx} />
                )
            });

        return (
            <div className="news">
                {!!newsTemplate.length ? newsTemplate : "Новостей нет "}
            </div>
        )
    }
}
```

```js
class Article extends React.Component {
    render() {
        let author = this.props.data.author,
            text = this.props.data.text;

        return (
            <div className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
            </div>
        )
    }
}
```

## Version control workflow

**Branches**

- **master**

- **staging**

- **default**

**Deploy process**

```
//master -> youTaskBranch
git checkout master;
git checkout -b you-task-branch;

PR -> (default -> youTaskBranch)

PR -> (staging -> youTaskBranch)

PR -> (master -> youTaskBranch)
```

**Good luck!**

## Заключение

- Что такое **React**

- Разметка **JSX**

- **props** && **prop-types**

- Что такое компонент, и компонентный подход

## ДЗ

Самостоятельно переписать приложение:

- семантика

- добавить стили и классы(BEM)

- разбить компоненты на отдельные js файлы(логически)

- написать и добавить компонент показывающий общее кол-во новостей

```jsx
class News extends React.Component {
    render() {
        let newsData = this.props.data,
            newsTemplate = newsData.map((item, idx) => {
                return (
                    <Article data={item} key={idx} />
                )
            }),
            newsLength = newsTemplate.length;

        return (
            <section className="news">
                {!!newsLength ? newsTemplate  : "Новостей нет "}

                <NewsCount total={newsLength}/>
            </section>
        )
    }
}

class NewsCount extends React.Component {
    render() {
        ...
    }
}
```

## Справочники

- [React.js](https://reactjs.org/)

- [prop-types](https://www.npmjs.com/package/prop-types)

- [React page prop-types](https://reactjs.org/docs/typechecking-with-proptypes.html)