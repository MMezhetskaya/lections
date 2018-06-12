# Lection 23

## Продолжим о TypeScript

### Переменные

- **var**

- **let**

- **const**

### Работа с типами данных

- **объединения**

```js
let id : number | string;

id = "1345dgg5";
console.log(id); // 1345dgg5

id = 234;
console.log(id);  // 234
```

- **проверка типа**

    - **typeof**

```js
let sum: any;

sum = 1200;
sum = "тысяча двести";

let result: number = sum / 12;
console.log(result); // NaN - строку нельзя разделить на число

```

- **псевдонимы типов**

    - **type**

```js
type stringOrNumberType = number | string;

let sum: stringOrNumberType = 36.6;

if (typeof sum === "number") {
    console.log(sum / 6);
}
```

- **type assertion**

    - модель преобразования значения переменной к определенному типу

**Пример**

- одна переменная может представлять широкий тип(any)

    - но надо использовать переменную как

        - значение строго определенного типа

**Две формы приведения**

- использование угловых скобок

```js
let someAnyValue: any = "hello world!";
let strLength: number = (<string>someAnyValue).length;
console.log(strLength); // 12

let someUnionValue: string | number = 1;
strLength = (<number>someUnionValue) + 9;
console.log(strLength); // 10
```

- оператора **as**

```js
let someAnyValue: any = "hello world!";
let strLength: number = (someAnyValue as string).length;
console.log(strLength); // 12

let someUnionValue: string | number = "hello work";
strLength = (someUnionValue as string).length;
console.log(strLength); // 10
```

### Функции

```js
// определение функции
function add(a: number, b: number): number {
    return a + b;
}
// вызов функции
let result1 = add(1, 2);
console.log(result1);
```

- **void**

**Параметры**

- **необязательные**

    - передаются только параметры которые определенны

```js
function getName(firstName: string, lastName?: string): string {
    if (lastName) {
        return `${firstName} ${lastName}`;
    } else {
        return firstName;
    }
}
```

- **по умолчанию**

```js
function defaultSurname(): string{
    return "Smith";
}

function getName(firstName: string, lastName: string=defaultSurname()) {
    return `${firstName} ${lastName}`;
}
```

- **неопределенный набор**

    - набор однотипных параметров

```js
function addNumbers(firstNumber: number, ...numberArray: number[]): number {
    let result = firstNumber;

    for (let i = 0; i < numberArray.length; i++) {
        result += numberArray[i];
    }

    return result;
}

let num1 = addNumbers(3, 7, 8);
console.log(num1); // 18

let num2 = addNumbers(3, 7, 8, 9, 4);
console.log(num2); // 31
```

#### Перегрузка функций

Можно определить несколько версий функции

- имя одно

- разные типы параметров

- разное количество параметров

- разные возвращаемые типы результатов

**Пример**

- опеределяем все версии функции

- с общей сигнатурой

    - подходит под все ранее определенные варианты

```js
function add(x: string, y: string): string;
function add(x: number, y: number): number;
function add(x: any, y: any): any {
    return x + y;
}

let result1 = add(5, 4);
console.log(result1);   // 9

let result2 = add("5", "4");
console.log(result2);   // 54
```

#### Тип

- **представление**

```js
function sum (x: number, y: number): number {
    return x + y;
};

function subtract (a: number, b: number): number {
    return a - b;
};

let op: (x:number, y:number) => number;

op = sum;
console.log(op(2, 4));  // 6

op = subtract;
console.log(op(6, 4));  // 2
```

- **стрелочные функции**

```js
let sum = (x: number, y: number) => x + y;

let result = sum(15, 35); // 50
console.log(result);
```

### Интерфейсы

- определяет свойства и методы

    - объект должен реализоват

```js
interface IUser {
    id: number;
    name: string;
}

let employee: IUser = {
    id: 1,
    name: "Tom"
}

console.log("id: " + employee.id);
console.log("name: " + employee.name);
```

- необязательные свойства

```js
interface IUser {
    id: number;
    name: string;
    age?: number;
}

let employee: IUser = {
    id: 1,
    name: "Alice",
    age: 23
}

let manager: IUser = {
    id: 2,
    name: "Tom"
}
```

- свойства только для чтения

```js
interface Point {
    readonly x: number;
    readonly y: number;
}

let p: Point = { x: 10, y: 20 };
console.log(p);
// p.x = 5; // Ошибка - свойство доступно только для чтения
```

- определение методов

```js
interface IUser {
    id: number;
    name: string;
    getFullName(surname: string): string;
}

let employee: IUser = {
    id: 1,
    name: "Alice",
    getFullName : function (surname: string): string {
        return `${this.name}  ${this.surname}`;
    }
}

let fullName = employee.getFullName("Tompson");
```

- интерфейсы классов, **implements**

```js
interface IUser {
    id: number;
    name: string;
    getFullName(surname: string): string;
}

class User implements IUser {
    id: number;
    name: string;
    age: number;
    constructor(userId: number, userName: string, userAge: number) {
        this.id = userId;
        this.name = userName;
        this.age = userAge;
    }
    getFullName(surname: string): string {
        return `${this.name} ${surname}`;
    }
}

let tom = new User(1, "Tom", 23);
```

**является как объектом User, так и объектом IUser:**

```js
let tom :IUser = new User(1, "Tom", 23);
//или
let tom :User = new User(1, "Tom", 23);
```

### Наследование интерфейсов

```js
interface IMovable {
    speed: number;
    move(): void;
}

interface ICar extends IMovable {
    fill(): void;
}

class Car implements ICar {
    speed: number;
    move(): void {
        console.log(`Машина едет со скоростью ${this.speed} км/ч`);
    }
    fill(): void {
        console.log("Заправляем машину топливом");
    }
}

let auto = new Car();
auto.speed = 60;
auto.fill();
auto.move();
```

### Интерфейсы функций

- содержат определение типа функции

    - реализованы объектом

        - представляет функцию данного типа

```js
interface FullNameBuilder {
    (name: string, surname: string): string;
}

let simpleBuilder: FullNameBuilder;

simpleBuilder = function (name:string, surname: string): string {
    return `Mr. ${name} ${surname}`;
}

let fullName = simpleBuilder("Homer", "Simpson");
console.log(fullName); // Mr. Homer Simpson
```

### Интерфейсы массивов

```js
interface StringArray {
    [index: number]: string;
}

let phones: StringArray;

phones = ["iPhone 7", "HTC 10", "HP Elite x3"];

let myPhone: string = phones[0];

console.log(myPhone);
```

- второй вариант

```js
interface Dictionary {
    [index: string]: string;
}

let colors: Dictionary = {};

colors["red"] = "#ff0000";
colors["green"] = "#00ff00";
colors["blue"] = "#0000ff";

console.log(colors["red"]);
```

### Гибридные интерфейсы

```js
interface PersonInfo {
    (name: string, surname: string):void;
    fullName: string;
    password: string;
    authenticate(): void;
}

function personBuilder(): PersonInfo {
    let person = <PersonInfo>function (name: string, surname: string): void {
        person.fullName = `${name} ${surname}`;
    };

    person.authenticate = function () {
        console.log(`${person.fullName} входит в систему с паролем ${person.password}`);
    };

    return person;
}

let tom = personBuilder();
tom("Tom", "Simpson");
tom.password = "qwerty";
tom.authenticate();
```

- тип функции в роли конструктора объекта

    - конструктор имеет тип `(name: string, surname: string):void;`

- функция  `personBuilder` реализует функцию конструктора

    - может использовать другие свойства и методы

## Основы Angular

## Heroes Editor

### Компонент `heroes`

**Задача**

![Tour of Heroes в действии](../22.angular--01/toh-anim.gif "Tour of Heroes в действии")

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

### Класс `Hero`

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

### [Pipes](https://next.angular.io/guide/pipes)

**Что делает?**

- принимает данные

    - преобразует в желаемый результат

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

**Что это и зачем?**

> **Метаданные** - информация указывающая как части приложения подходят друг другу, и какие другие файлы и библиотеки требуется приложению.

Метаданные находятся в декораторах

- **@Component**

- **@NgModule**

- самый важный **@NgModuledecorator** аннотирует класс **AppModule** верхнего уровня


```angularjs
import { FormsModule } from '@angular/forms';  // <-- NgModel lives here

...

imports: [
  BrowserModule,
  FormsModule
],

...
```

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

## Список героев

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

```angularjs
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

## Заключение

- Основы **TypeScript**

- использовали **CLI** для создания **HeroesComponent**

- добавили отображение **HeroesComponent**

- применили **UppercasePipe** для форматирование имени

- использовали двухстороннюю привязку - **ngModel** директива

- импортировали **FormsModule** в **AppModule**, для того что-бы **Angular** смог распознать и применить директиву **ngModel**

- узнали о важности объявления компонентов в  **AppModule** и оценили, что **CLI** объявила об этом для вас

- **ngFor**

## ДЗ

**null**

[<< prev](../22.angular--01) | [next >>](../24.angular--03)

## Справочники

- [angular-cli документация](https://github.com/angular/angular-cli/wiki)

- [angular pipes](https://next.angular.io/guide/pipes)

- [NgModel](https://next.angular.io/api/forms/NgModel)

- [NgModules](https://next.angular.io/guide/ngmodules)

- [ngFor](https://next.angular.io/guide/template-syntax#ngFor)