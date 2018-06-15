# Lection 24

## Основы TypeScript

### Миксины

- не позволяет использовать напрямую множественное наследование

    - можем реализовать множество интерфейсов в классе

        - но унаследовать его можем только от одного класса

>Функциональность миксинов частично позволяют унаследовать свойства и методы сразу двух и более классов.

**Пример**

```js
class Animal {

    feed():void {
        console.log("кормим животное");
    }
}

class Transport {

    speed: number=0;
    move(): void {
        if (this.speed == 0) {
            console.log("Стоим на месте");
        }
        else if (this.speed > 0) {
            console.log("Перемещаемся со скоростью " + this.speed + " км/ч");
        }
    }
}

class Horse implements Animal, Transport {
    speed: number=0;
    feed: () => void;
    move: () => void;
}

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

applyMixins(Horse, [Animal, Transport]);

let pony: Horse = new Horse();
pony.feed();
pony.move();
pony.speed = 4;
pony.move();
```

## Список и детали героев

### [NgModel](https://next.angular.io/api/forms/NgModel)

**Что делает?**

- создает экземпляр **FormControl** из модели

    - связывает с элементом управления формой

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

```js
import { FormsModule } from '@angular/forms';  // <-- NgModel lives here

...

imports: [
  BrowserModule,
  FormsModule
],

...
```

**Что это и зачем?**

> **Метаданные** - информация указывающая как части приложения подходят друг другу, и какие другие файлы и библиотеки требуется приложению.

Метаданные находятся в декораторах

- **@Component**

- **@NgModule**

- самый важный **@NgModuledecorator** аннотирует класс **AppModule** верхнего уровня

### Обьявление компонентов

- каждый компонент должен быть объявлен

    - `HeroesComponent`, обьявлен не был

        - Почему приложение работает?

            - **Angular CLI** самостоятельно обьявил `HeroesComponent` в `AppModule` когда генерировал компонент

                - **src/app/app.module.ts**

### [NgModules](https://next.angular.io/guide/ngmodules)

- настраивает инжектор и компилятор

    - помогает организовать связанные вещи вместе

- класс, отмеченный декоратором **@NgModule**

    - принимает объект метаданных

        - описывает, как скомпилировать шаблон компонента

        - как создать инжектор во время выполнения

    - идентифицирует

        - собственные компоненты модуля

        - директивы и каналы

## Список и детали героев

**Задача**

- отобразить список героев

- при клике на героя

    - оторазить информацию о героя

### Макет списка

- создадим список героев **src/app/mock-heroes.ts**

```angularjs
import { Hero } from './hero';

export const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
```

- импортируем список **src/app/heroes/heroes.component.ts**

```angularjs
...

import { HEROES } from '../mock-heroes';

...

export class HeroesComponent implements OnInit {
  ...

  heroes = HEROES;

  ...

}

```

## [ngFor](https://next.angular.io/guide/template-syntax#ngFor) или отображение макета списка

- отредактируем **src/app/heroes/heroes.component.html**

```js
<h2>My Heroes</h2>
<ul class="heroes">
  <li *ngFor="let hero of heroes">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>

...
```

**Детальнее**

- `<li>` узловой элемент

- `heroes` список из класса `HeroesComponent`

- `hero` текущий герой

### Стили для списка

- посмотрим **src/app/heroes/heroes.component.ts**

- откроем **src/app/heroes/heroes.component.css**

```css
/* HeroesComponent's private CSS styles */
.selected {
  background-color: #CFD8DC !important;
  color: white;
}
.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 15em;
}
.heroes li {
  cursor: pointer;
  position: relative;
  left: 0;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  border-radius: 4px;
}
.heroes li.selected:hover {
  background-color: #BBD8DC !important;
  color: white;
}
.heroes li:hover {
  color: #607D8B;
  background-color: #DDD;
  left: .1em;
}
.heroes .text {
  position: relative;
  top: -3px;
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
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}
```

### Angular [event-binding](https://next.angular.io/guide/template-syntax#event-binding)

- **src/app/heroes/heroes.component.html**

```angularjs
...

// onSelect() метод HeroesComponent
<li *ngFor="let hero of heroes" (click)="onSelect(hero)">

...
```

- **src/app/heroes/heroes.component.ts**

```angularjs
...

export class HeroesComponent implements OnInit {
  ...

  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ...

}

```


- **src/app/heroes/heroes.component.html**

```angularjs
<h2>My Heroes</h2>
<ul class="heroes">
  <li *ngFor="let hero of heroes" (click)="onSelect(hero)">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>

<h2>{{selectedHero.name | uppercase}} Details</h2>
<div><span>id: </span>{{selectedHero.id}}</div>
<div>
  <label>
    name: <input [(ngModel)]="selectedHero.name" placeholder="name">
  </label>
</div>
```

- откроем консоль

- клик на любого героя из списка

**Почему так?**

- на начальном этапе `selectedHero === undefined`

### [NgIf](https://next.angular.io/api/common/NgIf)

**Как пофиксить?**

- показывать `selectedHero` только если он существует

**Решение**

- **src/app/heroes/heroes.component.html**

```angularjs
...

<div *ngIf="selectedHero">

  <h2>{{ selectedHero.name | uppercase }} Details</h2>
  <div><span>id: </span>{{selectedHero.id}}</div>
  <div>
    <label>name:
      <input [(ngModel)]="selectedHero.name" placeholder="name">
    </label>
  </div>

</div>
```

### Angular [class-binding](https://next.angular.io/guide/template-syntax#class-binding)

- выделим выбранного героя

    - класс `.selected`, стили были добавлены ранее

- **src/app/heroes/heroes.component.html**

```angularjs
...

<li *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
  ...
</li>

...
```

**Правила хорошего тона!**

- reusable

- строго отвечают своему предназначению

## Создание HeroDetailComponent

**Что будем делать**

- разделим компонент

    - компонент списка героев

    - компонент описания героя

**Go go go!**

- создадим `hero-detail`

```
ng generate component hero-detail
```

- перенесём с **src/app/heroes/heroes.component.html** в **src/app/heroes/hero-detail.component.html**

```angularjs
<div *ngIf="hero">

  <h2>{{ hero.name | uppercase }} Details</h2>
  <div><span>id: </span>{{hero.id}}</div>
  <div>
    <label>name:
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </label>
  </div>

</div>
```

*selectedHero -> hero

- **src/app/hero-detail/hero-detail.component.ts**

```angularjs
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor() { }

  ngOnInit() {
  }

}

```

### [Свойства Input и Output](https://next.angular.io/guide/template-syntax#inputs-outputs)

## Отображение HeroDetailComponent

- **src/app/heroes/heroes.component.html**

```
...

<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```

### [property-binding](https://next.angular.io/guide/template-syntax#property-binding)

## Services

**Что такое services?**

- специальные объекты или функции

    - выполняющие некоторые общие для всего приложения задачи

**Зачем?**

- компоненты не должны работать напрямую с датой

    - представлении данных

    - делегировании доступа к данным

**Что сделаем**

- создадим `HeroService` - все классы приложения имеют доступ к героям

    - будем использовать **[Angular dependency injection](https://next.angular.io/guide/dependency-injection)**

- создадим `MessageService` и добавим его в

    - `HeroService` - отправление сообщения

    - `MessagesComponent` - отображение сообщения

### [Angular dependency injection](https://next.angular.io/guide/dependency-injection)

## Создаем HeroService

- cервис `hero`

```
ng generate serice hero --module=app
```

- добавит `HeroService` в **dependency injection** системы прежде чем **Angular** сможет использовать его в `HeroesComponent`

    - **src/app/app.module.ts**

- **src/app/hero.service.ts**

```angularjs
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({providedIn: 'root'})
export class HeroService {
  getHeroes(): Hero[] {
    return HEROES;
  }

  constructor() { }

}
```

*`HeroService` может получать дату отовсюду web service, local storage, или data source

### [Providers](https://next.angular.io/guide/providers)

## HeroesComponent

- **src/app/heroes/heroes.component.ts**

```angularjs
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  constructor() { }

  ngOnInit() {
  }

}

```

- добавим `HeroService` в конструктор класса

    - параметр одновреммено определяет `private heroService` свойство и определяет его как  `HeroService` injection

    - при создании `HeroesComponent`, **Dependency Injection** устанавливает `heroService` как одиночный экземпляр `HeroService`

```angularjs
...

constructor(private heroService: HeroService) { }

...
```

- создадим функцию для получения героев из сервиса

```angularjs
...

getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
}

...
```

- вызовем её на `ngOnInit`

```
...

ngOnInit() {
  this.getHeroes();
}

...
```

## Observable data

**Что не так?**

- `HeroService.getHeroes()` получение данных идет синхронно

```js
this.heroes = this.heroService.getHeroes();
```

- не будет работать в реальном приложении

    - получение данных с сервера операция асинхронная

- `HeroService.getHeroes()` в реальности ждёт ответа от сервера

    - должен быть асинхронным


## [RxJS](http://reactivex.io/rxjs/)

**Способы "общения" компонентов**

Идея предельно простая и давно хорошо себя зарекомендовавшая.

- публикация и подписка на именованные события

    - один из компонентов посылает событие в "эфир"

    - остальные слушают этот "эфир" и ловят те сообщения, которые им нужны

![Subscribe & subscriber](./events_sub.png "Subscribe & subscriber")

**Плюсы**

- "бесплатно" получить слабое связывание компонентов

**Недостаток**

- при росте числа компонентов и соответственно числа событий становится сложно уследить

    - за именами событий

    - за тем, кому какие события нужны для правильной работы.

- появляются

    - пространства имен

    - имена событий из чего-то типа **Событие1** превращаются в **Состояние_приложения1.Компонент2.Событие1**.

- невозможно делать при такой организации

    - компоновать события.

**Пример**

Требование "сделай что-то когда событие Б возникнет после двух событий A" выливается в тонну локальных переменных, хранящих последние данные из событий и счетчики самих событий.

**Облегчают**

`promise` - позволяют организовать очередность событий и практически являются первым шагом в организации потоков данных


**Ещё способ**

- протянуть между ними "провода"

    - связанны только те компоненты, которым есть что "сказать"

![RX events](./rx_events.png "RX events")

- каждый компонент соединен с другими, "потоками", по которым передается сигнал

- какие данные нужны компоненту для работы

    - от каких компонентов приходят потоки

    - как преобразуются данные по пути

- именовать события при такой организации не нужно

    - в имени нуждается поток, который несет данные

- задача компоновки событий сводится к компоновке содержащих их потоков

**Реализация потоков**

[RxJS](http://reactivex.io/rxjs/) - представляет собой модульную библиотеку, позволяющую создавать и компоновать потоки данных.

**Для общего развития**

> Подход, используемый в **Rx**, появился в **.NET** и оттуда был портирован во многие популярные языки.

**Ключевые понятия**

- создаваемые в **Rx** потоки реализуют паттерн **Observable** и наследуются от одноименного интерфейса

    - каждый поток можно "слушать"

        - при помощи метода **subscribe**, который принимает в качестве аргумента **Observer**

```js
observableStream.subscribe(someObserver);
```

- в самом простом случае **Observer** это функция, которая принимает единственный аргумент – переданное сообщение из потока

```js
function someObserver(streamEvent) {
    console.log('Received ' + streamEvent);
}
```

**Преимущества**

Все, что происходит в приложении, может быть представлено в виде потока данных:

- нажатия клавиш

- движения мыши

- данные с сервера

- сложное логическое что-то, которое случилось в одном из компонентов

Нет разницы откуда приходят события и что это за события, для компонента это просто потоки данных

![RxJS](./rxjs.png "RxJS")

## Observable HeroService

**Что будем использовать?**

- `Observable` один из ключевых классов **[RxJS](http://reactivex.io/rxjs/)**

- **./src/app/hero.service.ts**, сэмулируем  получение данных от сервера используя **RxJS** `Observable.of()`

```bash
npm install rxjs --save-dev
```

```js
import { Observable } from 'rxjs';

...

  getHeroes(): Observable<Hero[]> {
    return Observable.of(HEROES);
  }

...
```

- `of(HEROES)` возвращает `Observable<Hero[]>` - единственное значение список героев

## Subscribe в HeroesComponent

`HeroService.getHeroes` возвращал `Hero[]` сейчас `Observable<Hero[]>`

- **./src/app/heroes/heroes.component.ts**

```js
...

getHeroes(): void {
  this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
}

...
```

## Заключение

- отобразили список героев

- познакомились с event-binding

- ngFor

- ngIf

- class-binding


## ДЗ

**null**

[<< prev](../23.angular--02) | [next >>](../25.angular--04)

## Справочники

- [NgModules](https://next.angular.io/guide/ngmodules)

- [ngFor](https://next.angular.io/guide/template-syntax#ngFor)

- [event-binding](https://next.angular.io/guide/template-syntax#event-binding)

- [class-binding](https://next.angular.io/guide/template-syntax#class-binding)

- [NgIf](https://next.angular.io/api/common/NgIf)

- [Свойства Input и Output](https://next.angular.io/guide/template-syntax#inputs-outputs)

- [property-binding](https://next.angular.io/guide/template-syntax#property-binding)

- [Angular dependency injection](https://next.angular.io/guide/dependency-injection)

- [RxJS](http://reactivex.io/rxjs/)

- [providers](https://next.angular.io/guide/providers)

- [RxJS](http://reactivex.io/rxjs/)