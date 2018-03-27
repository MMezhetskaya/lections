## Дописываем роуты

**Наши роуты**

```
/ - главная страница
/list - список жанров
/genre/:genre/ - список релизов данного жанра
/genre/:genre/:release - информация о релизе
/admin - страница администратора
```

**Задача:** создать компонент, который будет доступен по адресу: localhost:3000/list

- создать компонент

- добавить компонент, как новый **Route**

**Реализация**

- **src/components/List.js**

```js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class List extends Component {
    render() {
        return (
            <section>
                <h3>Genre list</h3>

                <ul>
                    <li>
                        <Link to='/genre/house/'>House</Link>
                    </li>
                    <li>
                        <Link to='/genre/dnb/'>Drum and bass</Link>
                    </li>
                    <li>
                        <Link to='/genre/hip-hop/'>Hip-hop</Link>
                    </li>
                </ul>
            </section>
        )
    }
}
```

- обновим **src/index.js**

```js
...

import List from './components/List';

...

const renderApp = (App) => {
    render(
        <AppContainer>
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/admin' component={Admin} />
                        <Route path='/genre' component={List} />
                        <Route component={NotFound} />
                    </Switch>
                </App>
            </BrowserRouter>
        </AppContainer>,
        document.getElementById('root')
    );
};

...

```

## Динамический роут

**Задача:** создать компонент , который будет доступен по адресу: localhost:3000/genre/house

**Реализация**

- перейдем на Genre -> House

- обновим **src/index.js**

```js

...

<Route exact path='/genre' component={List} />
<Route path='/genre/:genre' component={Genre} />

...

```

- обновим **src/components/Genre.js**

```js
import React, { Component } from 'react';

export default class Genre extends Component {
    render() {
        return (
            <section>
                <h2>
                    {this.props.match.params.genre ? this.props.match.params.genre : 'Genre'}
                </h2>

                <div>
                    <p>Release list</p>
                </div>
            </section>
        )
    }
}
```

* __this.props.match.params__ - динамический

**Задача:** создать компонент , который будет доступен по адресу: localhost:3000/genre/house/dida-sebastien-leger-all-day-i-dream  

**Реализация**

- **src/index.js**

```js

```

- **src/components/Genre.js**

## Заключение

## ДЗ