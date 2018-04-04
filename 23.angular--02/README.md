# Lection 23

## Основы Angular

**Как?**

- напишем небольшое приложение

**Что узнаем?**

- как использовать встроенные директивы **Angular**

- научимся создавть **Angular** компоненты

- использовать одностороннюю привязку данных только для чтения

- обновлять модели с двух сторонней привязкой

- привязывать методы к пользовательским событиям

- форматировать данные используя **pipes**

- использовать **routing** для навигации между различными видами и их компонентами


## Что будем строить?

### Tutorial: Tour of Heroes

**Dashboard view**

![Dashboard view](heroes-dashboard-1.png "Dashboard view")

- две ссылки над списком героев ("Dashboard", "Heroes")

    - "Dashboard view"(активная)

    - "Heroes view"

**Hero Details view**

![Hero Details view](hero-details-1.png "Hero Details view")

- при выборе героя открывается "Hero Details view"

    - можем изменить имя героя

    - "back" возвращает на "Dashboard view"

**Heroes view**

![Heroes view](heroes-list-2.png "Heroes view")

- при выборе героя

    - отображается информация о герое(read only)

    - кнопка "View Details"

        - ведет на "Hero Details view" для выбранного героя

**Tour of Heroes view**

![Tour of Heroes view](nav-diagram.png "Tour of Heroes view")

**"Tour of Heroes" в действии**

![Tour of Heroes в действии](toh-anim.gif "Tour of Heroes в действии")

## Подготовка среды разработки

- если не установлено, то установить **Angular CLI**

```
npm i -g @angular/cli
```

- создаем новое приложение ([angular-cli документация](https://github.com/angular/angular-cli/wiki))

```
ng new angular-tour-of-heroes
```

- запуск приложения

```
cd angular-tour-of-heroes
// собираем приложение и запускаем сервер
ng serve --open
```

### Angular компоненты

- **src/app/app.component.ts**, свойство класса

```angularjs
...

title = 'Tour of Heroes';

...
```

- **src/app/app.component.html**, шаблон

```angularjs
...

<h1>{{title}}</h1>

...
```

### Редактируем стили

- **src/styles.css**

```css
/* Application-wide Styles */
h1 {
  color: #369;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
}
h2, h3 {
  color: #444;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: lighter;
}
body {
  margin: 2em;
}
body, input[text], button {
  color: #888;
  font-family: Cambria, Georgia;
}
/* everywhere else */
* {
  font-family: Arial, Helvetica, sans-serif;
}
```

### Чему научились

- создавать пустой проект используя **Angular CLI**

- увидели как работает отображение данных

- вывели данные в шаблон

## Компонент `heroes`

**Задача**

Создадим компонент `heroes` - редактирование героя

```
ng generate component heroes
```

- посмотрим детальнее **src/app/heroes/heroes.component.ts**

- добавим свойство `hero` для `HeroesComponent` **src/app/heroes/heroes.component.ts**

```typescript
hero = 'Windstorm';
```

- выведем свойство `hero` **src/app/heroes/heroes.component.html**

```typescript
{{hero}}
```

- отобразим компонент `heroes` **src/app/app.component.html**

```angularjs
<h1>{{title}}</h1>
<app-heroes></app-heroes>
```

## Класс `Hero`

- **src/app/hero.ts**

```angularjs
export class Hero {
  id: number;
  name: string;
}
```

- **src/app/heroes/heroes.component.ts**

```angularjs
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() { }

  ngOnInit() {
  }

}
```

- **src/app/heroes/heroes.component.html**

```angularjs
<h2>{{hero.name}} Details</h2>
<div><span>id: </span>{{hero.id}}</div>
<div><span>name: </span>{{hero.name}}</div>
```

- модифицируем `hero.name` используя [angular pipes](https://next.angular.io/guide/pipes)

```angularjs
<h2>{{hero.name | uppercase}} Details</h2>
<div><span>id: </span>{{hero.id}}</div>
<div><span>name: </span>{{hero.name}}</div>
```

- добавим редактирование свойства `name` **src/app/heroes/heroes.component.html**

```angularjs
<div>
    <label>
        name: <input [(ngModel)]="hero.name" placeholder="name">
    </label>
</div>
```

*`[(ngModel)] ` - синтаксис двусторонней привязки

- **src/app/app.module.ts**

Angular needs to know how the pieces of your application fit together and what other files and libraries the app requires. This information is called metadata

Some of the metadata is in the @Component decorators that you added to your component classes. Other critical metadata is in @NgModule decorators.

The most important @NgModuledecorator annotates the top-level AppModule class.

The Angular CLI generated an AppModule class in src/app/app.module.ts when it created the project. This is where you opt-in to the FormsModule.

```angularjs
import { FormsModule } from '@angular/forms';  // <-- NgModel lives here

...

imports: [
  BrowserModule,
  FormsModule
],

...
```

### [NgModel](https://next.angular.io/api/forms/NgModel)

### [Pipes](https://next.angular.io/guide/pipes)


## Обьявление компонентов

- каждый компонент должен быть объявлен

    - `HeroesComponent`, обьявлен не был

        - Почему приложение работает?

            - **Angular CLI** самостоятельно обьявил `HeroesComponent` в `AppModule` когда генерировал компонент

                - **src/app/app.module.ts**

### [NgModules](https://next.angular.io/guide/ngmodules)


## Заключение

- использовали **CLI** для создания **HeroesComponent**

- добавили отображение **HeroesComponent**

- применили **UppercasePipe** для форматирование имени

- использовали двухстороннюю привязку - **ngModel** директива

- импортировали **FormsModule** в **AppModule**, для того что-бы **Angular** смог распознать и применить директиву **ngModel**

- узнали о важности объявления компонентов в  **AppModule** и оценили, что **CLI** объявила об этом для вас

## ДЗ

**null**

## Справочники

- [angular-cli документация](https://github.com/angular/angular-cli/wiki)

- [angular pipes](https://next.angular.io/guide/pipes)

- [NgModel](https://next.angular.io/api/forms/NgModel)

- [NgModules](https://next.angular.io/guide/ngmodules)