# React l.02
 
## State

- this.props - только чтение

- this.state - динамика

Сладкая практика:

1. Обновим **my_news** <space><space>
```js
let my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 37 гривен!',
        bigText: 'А евро раздавать бесплатно!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];
```
2. Отобразим полный текст новости <space><space>
```js
class Article extends React.Component {
    render() {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText;

        return (
            <article className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <p className='news__big-text'>{bigText}</p>
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
3. Добавим ссылку - "подробнее" <space><space>
```js
class Article extends React.Component {
    render() {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText;

        return (
            <article className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href="#" className='news__readmore'>Подробнее</a>
                <p className='news__big-text'>{bigText}</p>
            </article>
        )
    }
}
```

О-да!!! База есть.

### Начальное состояние(initial state)

Если вы определяете какое-то изменяемое свойство в компоненте, необходимо указать начальное состояние(initial state).

- constructor -> this.state

- render -> this.state

- styles


```js
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
                    display: !visible ? 'block' : 'none'
                },

                txtFull: {
                    display: visible ? 'block' : 'none'
                }
            };

        return (
            <article className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href="#" className='news__readmore' style={styles.lnk}>Подробнее</a>
                <p className='news__big-text' style={styles.txtFull}>{bigText}</p>
            </article>
        )
    }
}
```

## Events(onClick)

- function -> readmoreClick

- method -> setState

```js
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
                    display: !visible ? 'block' : 'none'
                },

                txtFull: {
                    display: visible ? 'block' : 'none'
                }
            };

        return (
            <article className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href="#" onClick={this.readmoreClick.bind(this)} className='news__readmore' style={styles.lnk}>Подробнее</a>
                <p className='news__big-text' style={styles.txtFull}>{bigText}</p>
            </article>
        )
    }
}
```

- Все [Events](https://facebook.github.io/react/docs/events.html)

- Больше про **setState**

```js
this.setState(
    {
        visible: true
    },
    function() {
      alert('Состояние изменилось');
    }
);
```

```js

this.state = {
    visible: true,
    rating: 0,
    another_one_prop: 'qweqwe'
}

this.setState(
    {
        visible: true,
        another_one_prop: 'привет'
    },
    function() {
      alert('Состояние изменилось');
    }
);
```

### state для Гуру 

1. Нельзя вызывать setState в render <space><space>
```js
render() {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible,
            styles = {
                lnk: {
                    display: !visible ? 'block' : 'none'
                },

                txtFull: {
                    display: visible ? 'block' : 'none'
                }
            };

        console.log('render',this);

        return (
            <article className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href="#" onClick={this.readmoreClick.bind(this)} className='news__readmore' style={styles.lnk}>Подробнее</a>
                <p className='news__big-text' style={styles.txtFull}>{bigText}</p>
            </article>
        )
    }
```

2. Render - дорогостоящая операция, поэтому внимательно относитесь к тому, где вы вызываете setState, и что это за собой влечет.

3. Если перерисовывается родительский компонент, то будут перерисованы и все дочерние компоненты. <space><space>
```js
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
                {!!newsLength ? newsTemplate  : 'Новостей нет'}

                <NewsCount total={newsLength}/>
            </section>
        )
    }
}
```

Почему же, было важно использовать именно префиксную запись ++, а не постфиксную? 

**setState()** - не изменяет **this.state** немедленно, а создает очередь изменений состояния. Доступ к **this.state** после вызова метода, потенциально может вернуть имеющееся (что равносильно - бывшее) значение.

Вообще state у компонентов используется не часто. С появлянием **[flux](https://facebook.github.io/flux/)** - подхода, коммьюнити стало перемещаться на сторону stateless подхода, когда state не используется вообще (за исключением редких моментов).

## Работа с input

1. Удалим лишние **console.log'и**, удалим обработчик **onTotalNewsClick**.

2. Затем создадим компонент - **TestInput** <space><space>
```js
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
            <input className='test-input' value='введите значение' />
        );
    }
}
```

Упс, ошибка!

- Передать функцию обработчик, которая будет изменять какую-то переменную состояния.

- Создать начальное состояние

- Переменная состояния компонента, в качестве value у инпута

```js
class TestInput extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            myValue: ''
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
                    className='test-input'
                    value={this.state.myValue}
                    onChange={this.onChangeHandler.bind(this)}
                    placeholder='введите значение'
                />

                <button onClick={this.onBtnClickHandler.bind(this)}>Показать alert</button>
            </p>
        );
    }
}
```

Готово, но как думаете, что здесь может расстроить борца за оптимизацию?

### Uncontrolled Components (неконтролируемый компонент)

Главное отличие неконтролируемого компонента от контролируемого в том, что у него нет обработчика изменений, а значит нет постоянных вызовов **setState** и перерисовок.

Для того чтобы считать значение такого компонента используется функция библиотеки **ReactDOM** - **ReactDOM.findDOMNode**, а для того, чтобы можно было найти с помощью нее элемент, используется атрибут **ref**.

Для неконтролируемого компонента требуется указывать **defaultValue**.

1. Удалим обработчик **onChange**

2. Удалим **this.state**

3. Укажем **defaultValue** = пустая строка (defaultValue='') вместо **value**

4. Добавим атрибут **ref**, назовем его **myTestInput** <space><space>
```js
render() {
        return (
            <p>
                <input
                    className='test-input'
                    defaultValue=''
                    placeholder='введите значение'
                    ref='myTestInput'
                />

                <button onClick={this.onBtnClickHandler.bind(this)}>Показать alert</button>
            </p>
        );
    }
```

5. Обновим onBtnClickHandler <space><space>
```js
class TestInput extends React.Component {
    onBtnClickHandler(e) {
        alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
    }

    render() {
        return (
            <p>
                <input
                    className='test-input'
                    defaultValue=''
                    placeholder='введите значение'
                    ref='myTestInput'
                />

                <button onClick={this.onBtnClickHandler.bind(this)}>Показать alert</button>
            </p>
        );
    }
}
```

## Жизненный цикл компонента

У каждого компонента, есть жизненый цикл (lifecycle): компонент будет примонтирован, компонент отрисовался, компонент будет удален и так далее...

### [Методы жизненного цикла](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods)

- **componentWillMount** - компонент будет примонтирован. В данный момент у нас нет возможности посмотреть DOM элементы.

- **componentDidMount** - компонент примонтировался.

Любимая фраза "давайте представим задачу":

Мы отрисовали компонент, в котором есть **input**, и хотим чтобы фокус установился в него.

```js
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
                    className='test-input'
                    defaultValue=''
                    placeholder='введите значение'
                    ref='myTestInput'
                />

                <button onClick={this.onBtnClickHandler.bind(this)}>Показать alert</button>
            </p>
        );
    }
}
```

- **componentWillReceiveProps** - компонент получает новые **props**. Этод метод не вызывается в момент первого render'a. В официальной документации очень хороший пример, смотрим его: <space><space>
```js
componentWillReceiveProps(nextProps) {
  this.setState({
    likesIncreasing: nextProps.likeCount > this.props.likeCount
  });
}
```

- **shouldComponentUpdate** - должен ли компонент обновиться? На самом деле, обычно реакт сам отлично разбирается. Но иногда ручное управление позволяет существенно ускорить работу в "узких местах". С этим методом нужно работать очень аккуратно.

-  **componentWillUpdat** - вызывается прямо перед **render**, когда новые **props** и **state** получены. В этом методе нельзя вызывать **setState**.

- **componentDidUpdate** - вызывается сразу после **render**. Не вызывается в момент первого render'а компонента.

- **componentWillUnmount** - вызывается сразу перед тем, как компонент будет удален из DOM

## Работа с формой

Превратим наш **input** в форму добавления новости.

1. Переименуем **<TestInput />** в **<Add />**, попутно обновив код <space><space>
```js
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
                    type='text'
                    defaultValue=''
                    placeholder='Ваше имя'
                    ref='author'
                />

                <textarea
                    defaultValue=''
                    placeholder='Текст новости'
                    ref='text'
                />

                <label>
                    <input type='checkbox' defaultChecked={false} ref='checkrule' />Я согласен с правилами
                </label>

                <button
                    onClick={this.onBtnClickHandler}
                    ref='alert_button'>
                    Показать alert
                </button>
            </form>
        );
    }
}
```

2. Отключим кнопку "показать alert", если не отмечен чекбокс. <space><space>

Вариант без **state**:
```js
...
onCheckRuleClick(e) {
  ReactDOM.findDOMNode(this.refs.alert_button).disabled = !e.target.checked;
}
...
<input type='checkbox' defaultChecked={false} ref='checkrule' onChange={this.onCheckRuleClick.bind(this)}/>Я согласен с правилами
...
<button
    disabled
    onClick={this.onBtnClickHandler}
    ref='alert_button'>
    Показать alert
</button>
```

Вариант со **state**: <space><space>

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

 - используя семантику 
 
 - добавить стили и классы(BEM) используя SASS(добавить [sass-loader](https://github.com/webpack-contrib/sass-loader) в webpack.config)
 
 - разбить компоненты на отдельные js файлы(логически)
 
 - добавить валидацию для полей формы(если все поля заполненны кнопка **Показать alert** активна)
 
 - добавить новость первой в список новостей, при **form submit** если все поля валидны или при клике на **Показать alert**.
 
 - для взаимодействия между компонентами используйте **[EventEmitter](https://github.com/Olical/EventEmitter)**
 
 - Отрефакторите приложение, полностью!!!

## Справочники
- [PropTypes](https://www.npmjs.com/package/prop-types)
- [Events](https://facebook.github.io/react/docs/events.html)
- [flux](https://facebook.github.io/flux/)
- [Методы жизненного цикла](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods)
- [EventEmitter](https://github.com/Olical/EventEmitter)
- [sass-loader](https://github.com/webpack-contrib/sass-loader)