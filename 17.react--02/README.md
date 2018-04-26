# React l.02
 
## State

- **this.props** - только чтение

- **[this.state](https://reactjs.org/docs/state-and-lifecycle.html)** - динамика

**Применим:**

- обновим **my_news**

```jsx
let my_news = [
    {
        author: "Саша Печкин",
        text: "В четверг, четвертого числа...",
        bigText: "в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж."
    },
    {
        author: "Просто Вася",
        text: "Считаю, что $ должен стоить 37 гривен!",
        bigText: "А евро раздавать бесплатно!"
    },
    {
        author: "Гость",
        text: "Бесплатно. Скачать. Лучший сайт - http://localhost:3000",
        bigText: "На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение"
    }
];
```

- отобразим полный текст новости

```jsx
class Article extends React.Component {
    render() {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText;

        return (
            <article className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <p className="news__big-text">{bigText}</p>
            </article>
        )
    }
}

Article.propTypes = {
    data: PropTypes.shape({
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        bigText: PropTypes.string.isRequired
    })
};
```

- добавим ссылку "подробнее"

```jsx
class Article extends React.Component {
    render() {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText;

        return (
            <article className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href="#" className="news__readmore">Подробнее</a>
                <p className="news__big-text">{bigText}</p>
            </article>
        )
    }
}
```

О-да!!! База есть

### Начальное состояние(initial state)

**Note:** при определении изменяемого свойства в компоненте, необходимо указать начальное состояние(initial state)

**Наш подход**

- constructor -> this.state

- render -> this.state

- styles

```jsx
class Article extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: false
        };
    }

    render() {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible,
            styles = {
                lnk: {
                    display: !visible ? "block" : "none"
                },
                txtFull: {
                    display: visible ? "block" : "none"
                }
            };

        return (
            <article className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href="#" className="news__readmore" style={styles.lnk}>Подробнее</a>
                <p className="news__big-text" style={styles.txtFull}>{bigText}</p>
            </article>
        )
    }
}
```

## Events(onClick)

**Наш подход**

- function -> readmoreClick

- method -> setState

```jsx
class Article extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: false
        };
    }

    readmoreClick(e) {
        e.preventDefault();
        
        this.setState(
            {
                visible: true
            }
        );
    }

    render() {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible,
            styles = {
                lnk: {
                    display: !visible ? "block" : "none"
                },

                txtFull: {
                    display: visible ? "block" : "none"
                }
            };

        return (
            <article className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href="#" onClick={this.readmoreClick.bind(this)} className="news__readmore" style={styles.lnk}>Подробнее</a>
                <p className="news__big-text" style={styles.txtFull}>{bigText}</p>
            </article>
        )
    }
}
```

- все [events](https://facebook.github.io/react/docs/events.html)

- больше про **setState**

```jsx
this.setState(
    {
        visible: true
    },
    function() {
      alert("Состояние изменилось");
    }
);
```

```jsx
this.state = {
    visible: true,
    rating: 0,
    another_one_prop: "qweqwe"
}

this.setState(
    {
        visible: true,
        another_one_prop: "привет"
    },
    function() {
      alert("Состояние изменилось");
    }
);
```

### state для Гуру

- нельзя вызывать **setState** в **render**

```jsx
...

    render() {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible,
            styles = {
                lnk: {
                    display: !visible ? "block" : "none"
                },

                txtFull: {
                    display: visible ? "block" : "none"
                }
            };

        console.log("render", this);

        return (
            <article className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href="#" onClick={this.readmoreClick.bind(this)} className="news__readmore" style={styles.lnk}>Подробнее</a>
                <p className="news__big-text" style={styles.txtFull}>{bigText}</p>
            </article>
        )
    }
```

- **render** - дорогостоящая операция

    - внимательно относитесь к тому, где вы вызываете **setState**

- если перерисовывается родительский компонент, то будут перерисованы все дочерние компоненты

```jsx
class News extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            counter: 0
        };
    }

    onTotalNewsClick() {
        this.setState(
            {
                counter: ++this.state.counter
            }
        );
    }

    render() {
        let newsData = this.props.data,
            newsTemplate = newsData.map((item, idx) => {
                return (
                    <Article data={item} key={idx} />
                )
            }),
            newsLength = newsTemplate.length;

        return (
            <section className="news" onClick={this.onTotalNewsClick.bind(this)}>
                {!!newsLength ? newsTemplate  : "Новостей нет"}

                <NewsCount total={newsLength}/>
            </section>
        )
    }
}
```

**Использовали именно префиксную запись ++, а не постфиксную?**

**setState()** - не изменяет **this.state** немедленно

- создает очередь изменений состояния

    - доступ к **this.state** после вызова метода, потенциально может вернуть имеющееся (что равносильно - бывшее) значение

**Note:** **state** у компонентов используется не часто

**[flux](https://facebook.github.io/flux/)** - коммьюнити стало перемещаться на сторону **stateless** подхода, когда **state** не используется вообще (за исключением редких моментов).

## Работа с input

- удалим лишние **console.log**, удалим обработчик **onTotalNewsClick**.

- создадим компонент **TestInput**

```jsx
class App extends React.Component {
    render() {
        return (
            <div className="app">
                <h1>Всем привет, я компонент App! Я умею отображать новости.</h1>

                <TestInput />

                <News data={my_news} /> {/* data={my_news} текст комментария */}
            </div>
        );
    }
}

class TestInput extends React.Component {
    render() {
        return (
            <input className="test-input" value="введите значение" />
        );
    }
}
```

**Упс, ошибка!**

- передать функцию обработчик, которая будет изменять

    - какую-то переменную состояния

- создать начальное состояние

- переменная состояния компонента, в качестве **value** у инпута

```jsx
class TestInput extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            myValue: ""
        }
    }

    onChangeHandler(e) {
        this.setState(
            {
                myValue: e.target.value
            }
        )
    }

    onBtnClickHandler(e) {
        alert(this.state.myValue);
    }

    render() {
        return (
            <p>
                <input
                    className="test-input"
                    value={this.state.myValue}
                    onChange={this.onChangeHandler.bind(this)}
                    placeholder="введите значение"
                />

                <button onClick={this.onBtnClickHandler.bind(this)}>Показать alert</button>
            </p>
        );
    }
}
```

Готово, но как думаете, что здесь может расстроить борца за оптимизацию?

### Uncontrolled Components (неконтролируемый компонент)

Главное отличие неконтролируемого компонента от контролируемого в том, что

- нет обработчика изменений, а значит нет постоянных вызовов **setState** и перерисовок

Для того чтобы считать значение такого компонента используется функция библиотеки **ReactDOM**

- **ReactDOM.findDOMNode**

Для того, чтобы можно было найти с помощью нее элемент

- используется атрибут **ref**.

Для неконтролируемого компонента требуется указывать **defaultValue**.

- удалим обработчик **onChange**

- удалим **this.state**

- укажем **defaultValue** = пустая строка (`defaultValue = ""`) вместо **value**

- добавим атрибут **ref**, назовем его **myTestInput**


```jsx
render() {
        return (
            <p>
                <input
                    className="test-input"
                    defaultValue=""
                    placeholder="введите значение"
                    ref="myTestInput"
                />

                <button onClick={this.onBtnClickHandler.bind(this)}>Показать alert</button>
            </p>
        );
    }
```

- обновим **onBtnClickHandler**

```jsx
class TestInput extends React.Component {
    onBtnClickHandler(e) {
        alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
    }

    render() {
        return (
            <p>
                <input
                    className="test-input"
                    defaultValue=""
                    placeholder="введите значение"
                    ref="myTestInput"
                />

                <button onClick={this.onBtnClickHandler.bind(this)}>Показать alert</button>
            </p>
        );
    }
}
```

## Жизненный цикл компонента

У каждого компонента, есть жизненый цикл (lifecycle):

- компонент будет примонтирован

- компонент отрисовался

- компонент будет удален

- и так далее...

### [Методы жизненного цикла](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods)

- **componentWillMount** - компонент будет примонтирован

    - в данный момент нет возможности посмотреть **DOM** элементы

- **componentDidMount** - компонент примонтировался

**Любимая фраза "давайте представим задачу":**

Мы отрисовали компонент, в котором есть **input**, и хотим чтобы фокус установился в него.

```jsx
class TestInput extends React.Component {
    onBtnClickHandler(e) {
        alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.myTestInput).focus();
    }

    render() {
        return (
            <p>
                <input
                    className="test-input"
                    defaultValue=""
                    placeholder="введите значение"
                    ref="myTestInput"
                />

                <button onClick={this.onBtnClickHandler.bind(this)}>Показать alert</button>
            </p>
        );
    }
}
```

- **componentWillReceiveProps** - компонент получает новые **props**

    - метод не вызывается в момент первого **render**.

```jsx
componentWillReceiveProps(nextProps) {
    this.setState({
        likesIncreasing: nextProps.likeCount > this.props.likeCount
    });
}
```

- **shouldComponentUpdate** - должен ли компонент обновиться?

    - на самом деле, обычно реакт сам отлично разбирается

    - но иногда ручное управление позволяет существенно ускорить работу в "узких местах"

-  **componentWillUpdate** - вызывается прямо перед **render**, когда новые **props** и **state** получены

    - нельзя вызывать **setState**.

- **componentDidUpdate** - вызывается сразу после **render**

    - не вызывается в момент первого **render** компонента

- **componentWillUnmount** - вызывается сразу перед тем, как компонент будет удален из **DOM**

## Работа с формой

Превратим наш **input** в форму добавления новости.

- переименуем `<TestInput />` в `<Add />`

```jsx
class Add extends React.Component {
    onBtnClickHandler(e) {
        e.preventDefault();
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    defaultValue=""
                    placeholder="Ваше имя"
                    ref="author"
                />

                <textarea
                    defaultValue=""
                    placeholder="Текст новости"
                    ref="text"
                />

                <label>
                    <input type="checkbox" defaultChecked={false} ref="checkrule" />Я согласен с правилами
                </label>

                <button
                    onClick={this.onBtnClickHandler}
                    ref="alert_button">
                    Показать alert
                </button>
            </form>
        );
    }
}
```

- отключим "показать alert", если не отмечен чекбокс

Вариант без **state**:

```jsx
...
onCheckRuleClick(e) {
  ReactDOM.findDOMNode(this.refs.alert_button).disabled = !e.target.checked;
}
...
<input type="checkbox" defaultChecked={false} ref="checkrule" onChange={this.onCheckRuleClick.bind(this)}/>Я согласен с правилами
...
<button
    disabled
    onClick={this.onBtnClickHandler}
    ref="alert_button">
    Показать alert
</button>
```

Вариант со **state**:

```
Пора бы и попробовать самим! 
```

## Заключение

- Что такое **state**

- Познакомились с **Uncontrolled Components**

- Как выглядит жизненный цикл компонента

- Поработали с формой и её элементами

## ДЗ

Самостоятельно переписать приложение:

- семантика

- добавить стили и классы(BEM)

- разбить компоненты на отдельные js файлы(логически)

- добавить валидацию для полей формы(если все поля заполненны кнопка **Показать alert** активна)

- добавить новость первой в список новостей, при **form submit** если все поля валидны или при клике на **Показать alert**.
 
- для взаимодействия между компонентами используйте **[EventEmitter](https://github.com/Olical/EventEmitter)**
 
- отрефакторите приложение, полностью!!!

## Справочники
- [PropTypes](https://www.npmjs.com/package/prop-types)
- [Events](https://facebook.github.io/react/docs/events.html)
- [flux](https://facebook.github.io/flux/)
- [Методы жизненного цикла](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods)
- [EventEmitter](https://github.com/Olical/EventEmitter)
- [sass-loader](https://github.com/webpack-contrib/sass-loader)