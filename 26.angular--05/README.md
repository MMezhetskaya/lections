# Lection 26

## HTTP

**Что будем делать ?**

- познакомимся с [HttpClient](https://next.angular.io/api/common/http/HttpClient)

- `HeroService` получит данные используя **HTTP** запрос

- все действия добавить/редактировать/удалить через **HTTP**

- поиск героя по имени

### Включим HTTP сервисы

[HttpClient](https://next.angular.io/api/common/http/HttpClient)

> [HttpClient](https://next.angular.io/api/common/http/HttpClient) - **Angular's** механизм взаимодействия с сервером посредством **HTTP**

**Что бы включить HttpClient, необходимо**

- открыть корневой `AppModule`

- сделать импорт `HttpClientModule` из `@angular/common/http`

- добавить его в массив `@NgModule.imports`

### Имитируем сервер данных

- установим [In-memory Web API module](https://github.com/angular/in-memory-web-api)

- после установки модуля будем делать реальные запросы используя **HttpClient**

- обычно применяется когда **API** еще не готово

**Поехали**

- установим модуль

```bash
npm install angular-in-memory-web-api --save
```

- **src/app/app.module.ts**, импорт класса

```angularjs
...


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  ...
  imports: [
    ...

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],

...
```

- создадим **src/app/in-memory-data.service.ts**

```angularjs
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
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
    return {heroes};
  }
}
```

- удалим **src/app/mock-heroes.ts**

## Заключение

## ДЗ

- поднимите приложение на сервере

- подключите БД

- попробуйте провести все **CRUD** операции через реальную БД

## Справочники

- [HttpClient](https://next.angular.io/api/common/http/HttpClient)

- [In-memory Web API module](https://github.com/angular/in-memory-web-api)