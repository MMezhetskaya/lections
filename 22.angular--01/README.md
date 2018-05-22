# Lection l.22

## Angular p.01

## Курс молодого бойца или [TypeScripts](http://www.typescriptlang.org/)

>**TypeScript** — язык программирования, представленный Microsoft в 2012 году и позиционируемый как средство разработки веб-приложений, расширяющее возможности JavaScript [@Wiki](https://ru.wikipedia.org/wiki/TypeScripts)

**Что за зверь?**

- **TypeScript** является обратно совместимым с **JS**

- **TypeScript** отличается от **JS** 

    - явное статическогое назначение типов
    
    - поддержка использования полноценных классов (как в традиционных объектно-ориентированных языках)
     
    - поддержка подключения модулей
        
        - повысит скорость разработки
         
        - облегчит читаемость
         
        - рефакторинг
        
        - повторное использования кода

        - помочь осуществлять поиск ошибок на этапе разработки и компиляции
        
        - ускорит выполнение программ

### Строгая типизация

- позволяет более полно описывать свойства и методы обьектов и классов

    - проверка всех, входящих в метод или функцию, аргументов
    
```js
function checkAllMyArgsAgain(check, me, please) {
    if(check && me && please) {
        if(check instanceof CheckObject){
            console.log('Урааааа!');
        } else {
            console.log('И снова исключение...')
        }
        
        if(me){ } // И так далее.......
    }
}
```

Вариант с **TypeScript**

```typescript
function checkAllMyArgsAgain(check: CheckObject, me: MeObject, please: string): string {
    return 'Какая проверка аргументов? Вы о чем? ';
}
```

### Читабельность кода

```js
function checkMe(check, me) {
     if(check && me) {
         if(check){ ... }
         if(me){ ... }
     }
}

function andCheckMe(check, me) {
     if(check && me) {
         if(check){ ... }
         if(me){ ... }
     }
}

function andCheckMeToo(check, me) {
     if(check && me) {
         if(check){ ... }
         if(me){ ... }
     }
}
```

**vs**

```typescript
function checkMe(check: CheckObject, me: MeObject) {
     console.log('Ну круто же!');
}

function andCheckMe(check: CheckObject, me: MeObject) {
     console.log('Просто песня');
}

function andCheckMeToo(check: CheckObject, me: MeObject) {
     console.log('Писать легко и с удовольствием');
}
```

### Минусы TypeScript

- строгая типизация - ошалел что-ли жто же было плюсом!

- компилятор

- debug

- а вдруг помрет?

**Строгая типизация**

Этот пункт работает как во благо, так и во вред, потому что необходимо описывать

- все типы для всех обьектов

- классов, переменных, и иже с ними

Но куда большее зло — миграция существующих популярных **JS** решений на **TS**. Для каждой портированной либы необходимо описать `.d.ts` файл, в котором и хранятся все возвращаемые типы и описание всех методов.

Уверен, что портирование таких монстров, как **jQuery**, потребовало немало приседаний.

**Компилятор**

Он существенно уменьшает вероятность "тупой" ошибки

- типа пропущенных запятых

- неправильно написанных имен переменных

Убивается вся прелесть **JS**, когда большую часть решений можно было написать на коленках и проверить в консоли браузера.

Не стоит забывать, что время от времени, придется обновлять и сам компилятор, поскольку язык развивается и, рано или поздно, появится необходимость

- обновить существующую версию компилятора

- возможно, и самого кода

**Debug**

- наладить в **TypeScript** (придется немного попотеть)

**А вдруг помрет?**

Это интересный и серьёзный вопрос, потому как стандарты **JS** идут в ногу со временем и интегрируют в сам язык многое, что было полезно в **TS**:

- классы

- стрелочные функции, и тд.

**Судьба**

- рано или поздно, все полезные функции **TS** будут так или иначе перенесены в стандарт языка и **TS** повесит плавки на гвоздь

- а если ребята из **Microsoft** решат, что им это не нужно и полностью оставят **TS** на волю **open-source**?

    - являясь открытым продуктом, **TS** не лишиться поддержки совсем — всегда найдутся энтузиасты, но поддержка такого гиганта, как **Microsoft**, никогда не помешает

    - **Microsoft**, как основного разработчика, многие относят к минусу, потому как репутация у гиганта весьма спорная: **Skype**, **Nokia**, **Windows Phone**, **Windows Vista**, и тд

### TypeScript за 5 минут

- установка

```js
npm i -g typescript
```

- **greeter.ts**

```typescript
let user = "Jane User";

document.body.innerHTML = greeter(user);

function greeter(person) {
    return "Hello, " + person;
}
```


- компиляция

```
tsc greeter.ts
```


- обновим **greeter.ts**

```typescript
let user = "Jane User";

document.body.innerHTML = greeter(user);

function greeter(person: string) {
    return "Hello, " + person;
}
```

- попробуем **greeter.ts**

```typescript
let user = [1, 2, 3];

...
```

- **interface**, обновим **greeter.ts**

```typescript
let user = {
    firstName: "Jane",
    lastName: "User"
};

document.body.innerHTML = greeter(user);

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
```

- **class**,  обновим **greeter.ts**

```
class Student {
    fullName: string;

    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
```

### Миграция с JavaScript

- создание **tsconfig.json**

    - все скомпилированные файлы в `./build`

    - принять файлы **JS** в качестве входных данных

    - компиляция в формат

    - чтение `./src`

```json
{
    "compilerOptions": {
        "outDir": "./built",
        "allowJs": true,
        "target": "es5"
    },
    "include": [
        "./src/**/*"
    ]
}
```

#### Build Tools

- **webpack**

```
npm init & npm i --save-dev webpack awesome-typescript-loader source-map-loader
```

- **webpack.config.js**

```js
module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // Other options...
};
```

### Причем тут TypeScript тема то про Angular!

## QuickStart

- [Angular Dev Tools for Chrome](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk/related)

- **node JS & npm** - печально если еще до сих пор нет ;(

- **[angular-cli](https://github.com/angular/angular-cli)**

```
npm install -g @angular/cli
```

- создаем новый проект, с коробки

```
ng new my-app
```

- запускаем сервер

```
cd my-app
ng serve -o
```

## Angular component

**CLI** уже сделало **Angular** component, и это root component **app-root**

- **src/app/app.component.ts**

```angularjs
export class AppComponent {
  title = 'My First Angular App';
}
```

- **src/app/app.component.css**

```css
h1 {
  color: #369;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
}
```

## Структура src

- все компоненты, шаблоны, стили, изображения и все остальное

- файлы вне этой папки предназначены для поддержки, создания приложения

Файл | Назначение
--- | ---
`app/app.component.{ts,html,css,spec.ts}` | Определяет **AppComponent** вместе с шаблоном HTML, таблицей стилей CSS и Unit тестами, корневой компонент
`app/app.module.ts` | Определяет **AppModule**, корневой модуль, который сообщает **Angular**, как собирать приложение
`assets/*` | Папка, для изображения и всего остального, что нужно скопировать, когда вы создается приложение
`environments/*` | Переменные конфигурации для разной среды выполнения **development**, **production**
`favicon.ico` | Тут все очевидно
`index.html` | Тут все очевидно
`main.ts` | Главная точка входа приложения
`polyfills.ts` | Тут все очевидно
`styles.css` | Глобальные стили
`test.ts` | Главная точка входа для Unit тестов
`tsconfig.{app|spec}.json` | **TypeScript** конфигурация для **Angular** app (**tsconfig.app.json**) и для  **Unit** тестов (**tsconfig.spec.json**).

## Структура root

**Файлы помогают**

- создавать

- тестировать

- обслуживать

- документировать

- развертывать приложение

Файл | Назначение
--- | ---
`e2e/` | **end-to-end** тесты, они не должны быть внутри `src/`, потому что тесты **e2e** - это действительно отдельное приложение, которое просто так проверяет ваше основное приложение. Вот почему у них есть свой собственный **tsconfig.e2e.json**
`node_modules/` | Тут все очевидно
`.angular-cli.json` | Конфигурация для **Angular CLI**
`.editorconfig` | Настройка для редактора ([editor config](http://editorconfig.org))
`.gitignore` | Тут все очевидно
`.karma.conf.js` | **Unit** тест конфигурация, запуск `ng test`
`package.json` | Тут все очевидно
`protractor.conf.js` | **End-to-end** тест конфигурация [Protractor](http://www.protractortest.org/#/), запуск `ng e2e`
`README.md` | Базовая документация
`tsconfig.json` | Конфигурация **TypeScript** для **IDE**
`tslint.json` | Конфигурация для линтера [TSLint](https://palantir.github.io/tslint/) вместе с [Codelyzer](http://codelyzer.com/), используемая, запуск `ng lint`. Помогает поддерживать стиль кода


## Заключение

- TypeScript

- Angular

- Angular внутри

- Angular снаружи

## ДЗ

**null**

## Справочники

- [TypeScripts](https://ru.wikipedia.org/wiki/TypeScripts)

- [TypeScripts official](http://www.typescriptlang.org/)

- [Editor config](http://editorconfig.org)

- [Protractor](http://www.protractortest.org/#/)

- [TSLint](https://palantir.github.io/tslint/)

- [Codelyzer](http://codelyzer.com/)

- [Angular Dev Tools for Chrome](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk/related)