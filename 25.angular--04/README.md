# Lection 25

## Отображение сообщения

**Что надо сделать?**

Добавить `MessagesComponent`, который отображает сообщения приложения

- создать `MessageService` для отправления сообщений

- добавить `MessageService` в `HeroService`

- отобразить сообщение в случае если `HeroService ` успешно получил список героев

### Создание MessagesComponent

```bash
ng generate component messages
```

- **/src/app/app.component.html**

```js
...

<app-messages></app-messages>

...
```

### Создание MessageService

```bash
ng generate service message
```

- **/src/app/app.module.ts**

```js
...
import { MessageService } from './message.service';
...


  providers: [
    // no need to place any providers due to the `providedIn` flag...
    ...
    MessageService
  ]

...

```

- **/src/app/message.service.ts**

```js
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
```

### Inject в HeroService

- **/src/app/hero.service.ts**

```js
...

import { MessageService } from './message.service';

...

  constructor(private messageService: MessageService) { }

...
```

*классический "service-in-service" cценарий

### Отправление сообщения с HeroService

- **/src/app/hero.service.ts**

```js
...

getHeroes(): Observable<Hero[]> {
  // Todo: send the message _after_ fetching the heroes
  this.messageService.add('HeroService: fetched heroes');
  return Observable.of(HEROES);
}

...
```

### Отображения сообщения

- **/src/app/messages/messages.component.ts**

```js
...

import { MessageService } from '../message.service';

...

  constructor(public messageService: MessageService) {}

...
```

- **/src/app/messages/messages.component.css**

```css
/* MessagesComponent's private CSS styles */
h2 {
  color: red;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: lighter;
}
body {
  margin: 2em;
}
body, input[text], button {
  color: crimson;
  font-family: Cambria, Georgia;
}

button.clear {
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
}
button:hover {
  background-color: #cfd8dc;
}
button:disabled {
  background-color: #eee;
  color: #aaa;
  cursor: auto;
}
button.clear {
  color: #888;
  margin-bottom: 12px;
}

```

### Привязка к MessageService

- **/src/app/messages/messages.component.html**

```js
<div *ngIf="messageService.messages.length">

  <h2>Messages</h2>
  <button class="clear"
          (click)="messageService.clear()">clear</button>
  <div *ngFor='let message of messageService.messages'> {{message}} </div>

</div>
```

**Разберём**

- template привязывается напрямую к `messageService`

- `*ngIf` показывает сообщения только если они есть

- `*ngFor` выводит блок для каждого сообщения

- привязываем событие `click` для кнопки

    - вызов метода `MessageService.clear()`

## Routing

**Задача**

- добавить **Dashboard**

- возможность переключения между **Heroes** и **Dashboard**

- при клике на имя героя переключать на подробную инфо выбранного героя

- возможность прямого перехода по ссылке на страницу подробного инфо героя

![App navigation](./nav-diagram.png "App navigation")

### Добавляем AppRoutingModule

```bash
ng generate module app-routing --flat --module=app;
```

*`--flat` кладет файлы в `src/app`

*`--module=app` зарегистрировать в импортах `AppModule`

- **src/app/app-routing.module.ts**

```angularjs
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
```

### Добавляем routes

**Что за ... ?**

> **Routes** - оповещает **router** о том что показывать при смене **URL** или действии пользователя

**Angular Route** -  2 свойства:

-  `path` - строка **URL**

- `component` - должен быть создан/вызван по текущему **route**

**Обновим**

- **src/app/app-routing.module.ts**

```angularjs
...

import { HeroesComponent }      from './heroes/heroes.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];

...
```

- инициализируем `router` и начнем слушать изменения `location`(**src/app/app-routing.module.ts**)

```angularjs
...

imports: [ RouterModule.forRoot(routes) ],

...
```


### Добавим RouterOutlet

- **/src/app/app.component.html**

```angularjs
<h1>{{title}}</h1>
<router-outlet></router-outlet>
<app-messages></app-messages>
```

- **(http://localhost:4200/heroes)[http://localhost:4200/heroes]***

**Добавим ссылку на страницу героев**

- **src/app/app.component.html**

```angularjs
...

<nav>
  <a routerLink="/heroes">Heroes</a>
</nav>

...
```

## Страница Dashboard

- создадим компонент

```bash
ng generate component dashboard
```

- **src/app/dashboard/dashboard.component.html**

```html
<h3>Top Heroes</h3>
<div class="grid grid-pad">
  <a *ngFor="let hero of heroes" class="col-1-4">
    <div class="module hero">
      <h4>{{hero.name}}</h4>
    </div>
  </a>
</div>

```

- **src/app/dashboard/dashboard.component.ts**

```angularjs
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
```

- **src/app/dashboard/dashboard.component.css**

```css
/* DashboardComponent's private CSS styles */
[class*='col-'] {
  float: left;
  padding-right: 20px;
  padding-bottom: 20px;
}
[class*='col-']:last-of-type {
  padding-right: 0;
}
a {
  text-decoration: none;
}
*, *:after, *:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
h3 {
  text-align: center; margin-bottom: 0;
}
h4 {
  position: relative;
}
.grid {
  margin: 0;
}
.col-1-4 {
  width: 25%;
}
.module {
  padding: 20px;
  text-align: center;
  color: #eee;
  max-height: 120px;
  min-width: 120px;
  background-color: #607D8B;
  border-radius: 2px;
}
.module:hover {
  background-color: #EEE;
  cursor: pointer;
  color: #607d8b;
}
.grid-pad {
  padding: 10px 0;
}
.grid-pad > [class*='col-']:last-of-type {
  padding-right: 20px;
}
@media (max-width: 600px) {
  .module {
    font-size: 10px;
    max-height: 75px; }
}
@media (max-width: 1024px) {
  .grid {
    margin: 0;
  }
  .module {
    min-width: 60px;
  }
}
```

### Добавим Dashboard route

- **src/app/app-routing.module.ts**

```angularjs
...

import { DashboardComponent }   from './dashboard/dashboard.component';

...

{ path: 'dashboard', component: DashboardComponent },

...

```

- выставим **URL** по умолчанию (**src/app/app-routing.module.ts**)

```angularjs
...

{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },

...
```

- добавим ссылку на Dashboard (**src/app/app.component.html**)

```angularjs
...

 <a routerLink="/dashboard">Dashboard</a>

...
```

## Страница героя

**Доступна в 3х случаях**

- клик по герою(Dashboard)

- клик по герою(Heroes list)

- по прямой ссылке

**Удалим детали героя из HeroesComponent**

- **src/app/heroes/heroes.component.html**

```angularjs
<h2>My Heroes</h2>

<ul class="heroes">
  <li *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
```

### Router для героя

- `~/detail/{hero id}`, ссылка на героя

- **src/app/app-routing.module.ts**

```angularjs
...
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

...

{ path: 'detail/:id', component: HeroDetailComponent },

...
```

- добавим ссылку на героя (**src/app/dashboard/dashboard.component.html**)

```angularjs
<a *ngFor="let hero of heroes" class="col-1-4"
    routerLink="/detail/{{hero.id}}">
    ...
</a>
```

- **src/app/heroes/heroes.component.html**

```angularjs
...

<ul class="heroes">
  <li *ngFor="let hero of heroes">
    <a routerLink="/detail/{{hero.id}}">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </a>
  </li>
</ul>
```

**Рефакторим?**

- **src/app/heroes/heroes.component.ts**

```angularjs
...

export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
}
```

### Routable HeroDetailComponent

**План действия**

- **route** который вызывает/создает `HeroDetailComponent`

- вытянуть **id** героя из **route**

- получить с сервера данные героя по **id** используя `HeroService`

**Поехали**

- **src/app/hero-detail/hero-detail.component.ts**

```angularjs
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
  }

}
```

**Что это было?**

- **ActivatedRoute**, содержит данные о `route`  для данного инстанса (**HeroDetailComponent**)

- **HeroService**, получает дату с сервера

- **[location](https://next.angular.io/api/common/Location)**, сервис **Angular** для взаимодействия с **BOM**

**Извлекаем параметр id**

- **src/app/hero-detail/hero-detail.component.ts**

```angularjs
...

ngOnInit(): void {
  this.getHero();
}

getHero(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
}

...
```

**Добавляем HeroService.getHero()**

- **src/app/hero.service.ts**

```angularjs
...

getHero(id: number): Observable<Hero> {
  // TODO: send the message _after_ fetching the hero
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(HEROES.find(hero => hero.id === id));
}

...
```

**Добавляем кнопку назад**

- **src/app/hero-detail/hero-detail.component.html**

```angularjs
...

<button (click)="goBack()">go back</button>

...
```

- **src/app/hero-detail/hero-detail.component.ts**

```angularjs
...

goBack(): void {
  this.location.back();
}

...
```

**Обновим стили**

- **src/app/app.component.css**

```css
/* AppComponent's private CSS styles */
h1 {
  font-size: 1.2em;
  color: #999;
  margin-bottom: 0;
}
h2 {
  font-size: 2em;
  margin-top: 0;
  padding-top: 0;
}
nav a {
  padding: 5px 10px;
  text-decoration: none;
  margin-top: 10px;
  display: inline-block;
  background-color: #eee;
  border-radius: 4px;
}
nav a:visited, a:link {
  color: #607D8B;
}
nav a:hover {
  color: #039be5;
  background-color: #CFD8DC;
}
nav a.active {
  color: #039be5;
}
```

- **src/app/heroes/heroes.component.css**

```css
/* HeroesComponent's private CSS styles */
.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 15em;
}
.heroes li {
  position: relative;
  cursor: pointer;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  border-radius: 4px;
}

.heroes li:hover {
  color: #607D8B;
  background-color: #DDD;
  left: .1em;
}

.heroes a {
  color: #888;
  text-decoration: none;
  position: relative;
  display: block;
  width: 250px;
}

.heroes a:hover {
  color:#607D8B;
}

.heroes .badge {
  display: inline-block;
  font-size: small;
  color: white;
  padding: 0.8em 0.7em 0 0.7em;
  background-color: #607D8B;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  min-width: 16px;
  text-align: right;
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}
```

- **src/app/hero-detail/hero-detail.component.css**

```css
/* HeroDetailComponent's private CSS styles */
label {
  display: inline-block;
  width: 3em;
  margin: .5em 0;
  color: #607D8B;
  font-weight: bold;
}
input {
  height: 2em;
  font-size: 1em;
  padding-left: .4em;
}
button {
  margin-top: 20px;
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer; cursor: hand;
}
button:hover {
  background-color: #cfd8dc;
}
button:disabled {
  background-color: #eee;
  color: #ccc;
  cursor: auto;
}
```


## Заключение

- Routing

- Страница Dashboard

- Страница героя

## ДЗ

## Справочники

- [location](https://next.angular.io/api/common/Location)