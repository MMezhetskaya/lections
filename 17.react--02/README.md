## React l.02
 
## State

- this.props - только чтение

- this.state - динамика

Сладкая практика:

1. Обновим **my_news**  
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
2. Отобразим полный текст новости  
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
3. Добавим ссылку - "подробнее"  
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


## Заключение

## ДЗ

## Справочники
- [PropTypes](https://www.npmjs.com/package/prop-types)
- [Events](https://facebook.github.io/react/docs/events.html)