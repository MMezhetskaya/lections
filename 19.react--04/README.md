# Lection l.19. React p.04.

## Создание Reducer

- создадим **src/reducers/index.js**

```js
const initialState = {
  user: 'Unknown User'
};

export default function userState(state = initialState) {
  return state;
}
```

## Связывание данных

- подключаем **connect** в **src/containers/App.js**

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        return <div>Привет из App,  { this.props.user }!!!</div>;
    }
}


function mapStateToProps (state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(App);
```

**Note:** подключили **React** компонент к **Redux store**

- проверим **src/reducers/index.js**

```js
const initialState = {
    name: 'Redux',
    surname: 'Reactovich',
    age: 273
};

export default function userState(state = initialState) {
    return state;
}
```

- обновим **src/containers/App.js**

```js
import React, { Component } from 'react';
import { connect } from 'react-redux'

class App extends Component {
    render() {
        const { name, surname, age } = this.props.user;

        return <div>
            <p>Привет из App, {name} {surname}!</p>
            <p>Тебе уже {age} ?</p>
        </div>
    }
}

function mapStateToProps (state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(App);
```

## Комбинирование редьюсеров

**Главный вопрос, зачем ???**

- больше модульности

    - каждый кусочек кода отвечает за конкретную часть

**Можно выделить следующие reducer'ы**

- **user**

- **page**

![Our project](../18.react--03/task__scheme.png 'Our project')

**Поехали**.

- создадим **src/reducers/user.js**

```js
const initialState = {
    name: 'Аноним'
};

export default function user(state = initialState) {
    return state;
}
```

- создадим **src/reducers/page.js**

```js
const initialState = {
    year: 2016,
    photos: []
};

export default function page(state = initialState) {
    return state;
}
```

- обновим **src/reducers/index.js**

```js
import { combineReducers } from 'redux';
import page from './page';
import user from './user';

export default combineReducers({
    page,
    user
});
```

- **combineReducers**, возвращает "составной" редьюсер
 
**Итог**

- структура та-же

```json
{
    user: {             
        name: 'Аноним'  
    },                   
    page: {             
        year: 2016,     
        photos: []      
    }                   
}
```

- а где же контент, не работает да ?!

- обновим **src/containers/App.js**, ближе к реальности

```js
import React, { Component } from 'react';
import { connect } from 'react-redux'

class App extends Component {
    render() {
        const { name } = this.props.user,
            { year, photos } = this.props.page;

        return <div>
            <p>Привет, {name}!</p>
            <p>У тебя {photos.length} фото за {year} год</p>
        </div>
    }
}

function mapStateToProps (state) {
    return {
        user: state.user,
        page: state.page
    }
}

export default connect(mapStateToProps)(App);
```

**Итог**:

- модульность

- меньший объем кода в каждом файле 

- лучшая читаемость

## [Контейнеры и компоненты](https://redux.js.org/docs/basics/UsageWithReact.html)

> Разделение на **компоненты** и **контейнеры**, иначе называемые: **глупые** и **умные** компоненты, **Presentational** и **Container**.

 &nbsp; | Компонент (глупый) | Контейнер (умный)
--- | --- | ---
**Цель** | Как это выглядит (разметка, стили) | Как это работает (получение данных, обновление состояния)
**Осведомлен о Redux** | - | +
**Для считывания данных** | Читает данные из `props` | Подписан на **Redux** `state` (состояние)
**Для изменения данных** | Вызывает `callback` из `props` | Отправляет (`dispatch`) **Redux** действие (`actions`)
**Пишутся** | Вручную | Обычно, генерируются **Redux**

- что-то непонятно :(

**Перепишем все, что бы стало ясно.**

- установим **PropTypes**

```bash
npm install --save prop-types
```

- создадим **src/components/User.js**

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class User extends Component {
    render() {
        const { name } = this.props;

        return <div>
            <p>Привет, {name}!</p>
        </div>
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired
};
```

- создадим **src/components/Page.js**

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Page extends Component {
    render() {
        const { year, photos } = this.props;

        return <div>
            <p>У тебя {photos.length} фото за {year} год</p>
        </div>
    }
}

Page.propTypes = {
    year: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired
};
```

**Что дало?**

- возможность обновлять компоненты Page и User независимо друг от друга

## Создание actions

> Практически любое действие пользователя в интерфейсе = отправка действия (**dispatch actions**)

**Наше приложение**

- по клику на кнопку года

    - устанавливает заголовок

    - загружает фото этого года
    
### Установка заголовка

Данные внутри **redux**-приложения:

1. приложение получило изначальное состояние (**initial state**)

2. пользователь нажав кнопку -> отправил действие (**dispatch action**)

3. соответсвующий редьюсер обновил часть приложения, в согласии с тем, что узнал от действия

4. приложение изменилось и теперь отражает новое состояние

5. ... (все повторяется по кругу, с пункта 2)

**Это и есть однонаправленный поток данных.**

- создадим page action **src/actions/PageActions.js**

```js
export function setYear(year) {
    return {
        type: 'SET_YEAR',
        payload: year
    }
}
```

- подправим **src/reducers/page.js**

```js
const initialState = {
    year: 2016,
    photos: []
};

export default function page(state = initialState, action) {
    switch (action.type) {
        case 'SET_YEAR':
            return { ...state, year: action.payload };

        default:
            return state;
    }

}
```

- подправим **src/containers/App.js**

```js
...

import User from '../components/User';
import Page from '../components/Page';
import * as pageActions from '../actions/PageActions'

class App extends Component {
    render() {
        const { user, page } = this.props,
            { setYear } = this.props.pageActions;

        return <div>
            <User name={user.name} />
            <Page photos={page.photos} year={page.year} setYear={setYear} />
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        page: state.page
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

**Note:** [bindActionCreators](https://redux.js.org/docs/api/bindActionCreators.html)

- обновим **src/components/Page.js**

```js
...

export default class Page extends Component {
    onYearBtnClick(e) {
        this.props.setYear(+e.target.textContent)
    }

    render() {
        const { year, photos } = this.props;

        return <div>
            <p>
                <button onClick={::this.onYearBtnClick}>2016</button>
                <button onClick={::this.onYearBtnClick}>2015</button>
                <button onClick={::this.onYearBtnClick}>2014</button>
            </p>
            <h3>{year} год</h3>
            <p>У тебя {photos.length} фото.</p>
        </div>
    }
}

Page.propTypes = {
    year: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    setYear: PropTypes.func.isRequired
};
```

**Note:** `::this.onYearBtnClick === this.onYearBtnClick.bind(this)` [ES7 (experimental)](https://github.com/tc39/proposal-bind-operator)

## Константы

Если вынести все **page actions** в отдельный файл с константами, то

- удобнее писать тесты

- работать в команде

- поддерживать код

- не отходим от "соглашений" принятых в разработке **Flux/Redux** приложений

**Go go go**

- обновим **src/reducers/page.js**

```js
import { SET_YEAR } from '../constants/Page';

const initialState = {
    year: 2016,
    photos: []
};

export default function page(state = initialState, action) {
    switch (action.type) {
        case SET_YEAR:
            return { ...state, year: action.payload };

        default:
            return state;
    }

}
```

- обновим **src/actions/PageActions.js**

```js
import { SET_YEAR } from '../constants/Page';

export function setYear(year) {
    return {
        type: SET_YEAR,
        payload: year
    }
}
```

## Middleware (Усилители). Логгер

Суть **middleware** функций

- взять входные данные

    - добавить что-то

        - передать дальше

**Напишем простейший логгер, на каждое действие**

- обновим **store/configureStore.js**

```js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { logger } from './enhancers/ping';

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, applyMiddleware(logger));

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
```

- добавим сам усилитель **store/enhancers/logger.js**

```js
/*eslint-disable */
export const logger = store => next => action => {
    console.log(`Тип события: ${action.type}, данные события: ${action.payload}`)
    return next(action)
};
/*eslint-enable */
```


- **eslint-disable**, выключает проверку этого блока линтером

- **middleware**, всегда функция(целью не является прервать цепочку вызовов)

В возвращаемых функциях, благодаря **applyMiddleware** у нас становятся доступными аргументы:

- **store** - redux-store нашего приложения;

- **next** - функция-обертка, которая позволяет продолжить выполнение цепочки;

- **action** - действие, которое было вызвано (как вы помните, вызванные действия - это store.dispatch)

### Redux-logger

Долой велосипеды!

```bash
npm i --save redux-logger
```

- удалим **store/enhancers/**

- обновим **src/store/configureStore.js**

```js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';

export default function configureStore(initialState) {
    const logger = createLogger(),
        store = createStore(rootReducer, initialState, applyMiddleware(logger));

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
```

## Асинхронные actions

**Давайте представим синхронное действие:**

1. пользователь кликнул на кнопку

2. **dispatch action {type: ТИП_ДЕЙСТВИЯ, payload: доп.данные}**

3. интерфейс обновился

**Давайте представим асинхронное действие:**

1. пользователь кликнул на кнопку

2. **dispatch action {type: ТИП_ДЕЙСТВИЯ_ЗАПРОС}**

3. запрос выполнился успешно

    - **dispatch action {type: ТИП_ДЕЙСТВИЯ_УСПЕШНО, payload: доп.данные}**

4. запрос выполнился неудачно

    - **dispatch action {type: ТИП_ДЕЙСТВИЯ_НЕУДАЧНО, error: true, payload: доп.данные ошибки}**
    
```
switch(тип_действия)
    case ТИП_ДЕЙСТВИЯ_ЗАПРОС:
        покажи preloader
    case ТИП_ДЕЙСТВИЯ_УСПЕШНО:
        скрой preloader, покажи данные
    case ТИП_ДЕЙСТВИЯ_НЕУДАЧНО:
        скрой preloader, покажи ошибку
```


### Что надо сделать?

1. по клику на кнопку с номером года

    - меняется год в заголовке
  
    - ниже (где должны быть фото), появляется текст "Загрузка..."

2. после удачной загрузки*

    - убрать текст "Загрузка..."

    - отобразить строку "У тебя ХХ фото" (зависит, от длины массива, переданного в action.payload)

**Note:** вместо реального метода загрузки, использовать `setTimeout`


- изменим **src/constants/Page.js**

```js
export const GET_PHOTOS_REQUEST = 'GET_PHOTOS_REQUEST';
export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
```

- добавим новый усилитель [redux-thunk](https://github.com/gaearon/redux-thunk), в **src/store/configureStore.js**

```bash
npm i redux-thunk --save
```

```js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
    const logger = createLogger(),
        store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(thunk, logger)
        );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
```

- изменим action creator **src/actions/PageActions.js**

```js
import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS
} from '../constants/Page';

export function getPhotos(year) {
    return (dispatch) => {
        dispatch({
            type: GET_PHOTOS_REQUEST,
            payload: year
        });

        setTimeout(() => {
            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: [1,2,3,4,5]
            })
        }, 1000)
    }
}
```

- изменим reducer **src/reducers/page.js**

```js
import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS
} from '../constants/Page';

const initialState = {
    year: 2016,
    photos: [],
    fetching: false
};

export default function page(state = initialState, action) {

    switch (action.type) {
        case GET_PHOTOS_REQUEST:
            return { ...state, year: action.payload, fetching: true };

        case GET_PHOTOS_SUCCESS:
            return { ...state, photos: action.payload, fetching: false };

        default:
            return state;
    }

}
```

- обновим **src/containers/App.js**

```js
import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import User from '../components/User';
import Page from '../components/Page';
import * as pageActions from '../actions/PageActions';

class App extends Component {
    render() {
        const { user, page } = this.props,
            { getPhotos } = this.props.pageActions;

        return <div>
            <User name={user.name} />
            <Page photos={page.photos} year={page.year} getPhotos={getPhotos} fetching={page.fetching} />
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        page: state.page
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

- обновим **src/components/Page.js**

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Page extends Component {
    onYearBtnClick(e) {
        this.props.getPhotos(+e.target.innerText)
    }

    render() {
        const { year, photos, fetching } = this.props;

        return <div>
            <p>
                <button onClick={::this.onYearBtnClick}>2016</button>
                <button onClick={::this.onYearBtnClick}>2015</button>
                <button onClick={::this.onYearBtnClick}>2014</button>
            </p>
            <h3>{year} год</h3>
            {
                fetching ?
                    <p>Загрузка...</p> :
                    <p>У тебя {photos.length} фото.</p>
            }
        </div>
    }
}

Page.propTypes = {
    year: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    getPhotos: PropTypes.func.isRequired
};
```

- всегда возвращали новое состояние (новый объект, **src/reducers/page.js**)

- строго следовали однонаправленному потоку данных в приложении:
    
    1. юзер кликнул 
    
    2. возникло действие 
    
    3. редьюсер изменил 
    
    4. компонент отобразил

## Заключение

- reducers

- Комбинирование редьюсеров

- Контейнеры и компоненты

- Создание actions

- Константы

- Middleware (Усилители)

- Асинхронные actions

## ДЗ

Обновить приложение согласно новой структуре

## Справочники

- [Контейнеры и компоненты](https://redux.js.org/docs/basics/UsageWithReact.html)

- [bindActionCreators](https://redux.js.org/docs/api/bindActionCreators.html)

- [ES7 (experimental)](https://github.com/tc39/proposal-bind-operator)

- [redux-thunk](https://github.com/gaearon/redux-thunk)