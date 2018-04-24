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

```angularjs
...

import { HttpClientModule } from '@angular/common/http';
...

@NgModule({
  ...

  imports: [
    ...
    HttpClientModule,
    ...
  ],

  ...
})

...
```

### Имитируем сервер данных

- установим [In-memory Web API module](https://github.com/angular/in-memory-web-api)

- после установки модуля будем делать реальные запросы используя **HttpClient**

- обычно применяется когда **API** еще не готово

**Поехали**

- установим модуль

```bash
npm install angular-in-memory-web-api@0.5.4 --save
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

### Импорт HTTP символов

- **src/app/hero.service.ts**

```angularjs
...

import { HttpClient, HttpHeaders } from '@angular/common/http';

...
export class HeroService {

  constructor(
    /* Inject HttpClient into the constructor in a private property called http */
    private http: HttpClient,
    private messageService: MessageService) { }

  /* Define the heroesUrl with the address of the heroes resource on the server */
  private heroesUrl = 'api/heroes';  // URL to web api

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  ...
}
```

### Получение списка героев используя HttpClient

- **src/app/hero.service.ts**

```angularjs
/** GET heroes from the server */
getHeroes (): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
}
```

### Обработка ошибок

**Зачем?**

- сервер не всегда работает так как нам надо

**Что делать?**

- ловить ошибки в `HeroService.getHeroes()`

    - делать что-то с ними

- **src/app/hero.service.ts**

```angularjs
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        /* handleError - reports the error and then returns an innocuous result */
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return Observable.of(result as T);
    };
  }
}

```

**Что изменилось?**

- создаёт **URL** запроса с желаемым **id** героя

- получаем данные о герое

    - наблюдаемый из объектов `Hero`, а не наблюдаемый массив героев

### Редактирование героя

- нет сохранения при редактировании

**Добавим**

- **src/app/hero-detail/hero-detail.component.html**

```angularjs

...

<button (click)="save()">save</button>

...

```

- **src/app/hero-detail/hero-detail.component.ts**

```angularjs

...

save(): void {
   this.heroService.updateHero(this.hero)
     .subscribe(() => this.goBack());
}

...

```

- **src/app/hero.service.ts**

```angularjs

...

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

...

/** PUT: update the hero on the server */
updateHero (hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

...

```

### Добавление нового героя

- **src/app/heroes/heroes.component.html**

```angularjs

...

<div>
  <label>Hero name:
    <input #heroName />
  </label>
  <!-- (click) passes input value to add() and then clears the input -->
  <button (click)="add(heroName.value); heroName.value=''">
    add
  </button>
</div>

...

```

- **src/app/heroes/heroes.component.ts**

```angularjs

...

add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
}

...

```

- **src/app/hero.service.ts**

```angularjs

...

/** POST: add a new hero to the server */
addHero (hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
    tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

...

```

**Note:** ожидаем что **id** сгенерируется на сервере

### Удаление героя

- **src/app/heroes/heroes.component.html**

```angularjs

...

<ul class="heroes">
  <li *ngFor="let hero of heroes">
    <a routerLink="/detail/{{hero.id}}">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </a>
    <button class="delete" title="delete hero"
    (click)="delete(hero)">x</button>
  </li>
</ul>

...
```

- **src/app/heroes/heroes.component.ts**

```angularjs

...

delete(hero: Hero): void {
  this.heroes = this.heroes.filter(h => h !== hero);
  this.heroService.deleteHero(hero).subscribe();
}

...

```

- **src/app/hero.service.ts**

```angularjs

...

/** DELETE: delete the hero from the server */
deleteHero (hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

...

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

button {
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
  font-family: Arial;
}

button:hover {
  background-color: #cfd8dc;
}

button.delete {
  position: relative;
  left: 194px;
  top: -32px;
  background-color: gray !important;
  color: white;
}
```

## Поиск

- **src/app/hero.service.ts**

```angularjs

...

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

...

```

**Добавим на страницу Dashboard**

## Заключение

## ДЗ

- поднимите приложение на сервере

- подключите БД

- попробуйте провести все **CRUD** операции через реальную БД

## Справочники

- [HttpClient](https://next.angular.io/api/common/http/HttpClient)

- [In-memory Web API module](https://github.com/angular/in-memory-web-api)