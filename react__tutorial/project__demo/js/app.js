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

window.ee = new EventEmitter();

class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            news: my_news
        }
    }

    componentDidMount() {
        window.ee.addListener('News.add', function(item) {
            this.setState(
                {
                    news: item.concat(this.state.news)
                }
            );
        }.bind(this));
    }

    componentWillUnmount() {
        window.ee.removeListener('News.add');
    }

    render() {
        console.log(0);

        return (
            <div className="app">
                <h1>Всем привет, я компонент App! Я умею отображать новости.</h1>

                <Add />

                <News data={this.state.news} /> {/* data={my_news} текст комментария */}
            </div>
        );
    }
}

class Add extends React.Component {
    onFormSubmit(e) {
        e.preventDefault();

        let item = {},
            fieldTxt = ReactDOM.findDOMNode(this.refs.text),
            isValid = false;

        item.author = ReactDOM.findDOMNode(this.refs.author).value;
        item.text = fieldTxt.value;
        item.bigText = '...';
        isValid = !!item.author && !!item.text && ReactDOM.findDOMNode(this.refs.checkrule).checked;

        if (isValid) {
            window.ee.emit('News.add', [item]);
            fieldTxt.value = '';
        }
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    }

    onCheckRuleClick(e) {
        ReactDOM.findDOMNode(this.refs.form_submit).disabled = !e.target.checked;
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit.bind(this)}>
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
                    <input
                        type='checkbox'
                        defaultChecked={false}
                        ref='checkrule'
                        onChange={this.onCheckRuleClick.bind(this)}/>
                    Я согласен с правилами
                </label>

                <button type='submit' ref="form_submit" disabled>
                    Добавить новость
                </button>
            </form>
        );
    }
}

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
                {!!newsLength ? newsTemplate  : 'Новостей нет'}

                <NewsCount total={newsLength}/>
            </section>
        )
    }
}

News.propTypes = {
    data: PropTypes.array.isRequired
};

class NewsCount extends React.Component {
    render() {
        let total = this.props.total;

        return (
            <p className={`news__count ${!!total ? '' : 'none'}`}>
                Всего новостей {total}
            </p>
        )
    }
}

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

Article.propTypes = {
    data: PropTypes.shape({
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        bigText: PropTypes.string.isRequired
    })
};


ReactDOM.render(
    <App />,
    document.getElementById('root')
);