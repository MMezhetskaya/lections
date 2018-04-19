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

## Заключение

## ДЗ

## Справочники
