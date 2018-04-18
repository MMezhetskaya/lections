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

## Заключение

## ДЗ

## Справочники
