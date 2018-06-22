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

        if (this.speed > 0) {
            console.log(`Перемещаемся со скоростью ${this.speed} км/ч`);
        }
    }
}

class Horse implements Animal, Transport {
    speed: number = 0;
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

**Ограничения**

- миксин может унаследовать только

    - свойства и методы, которые непосредственно определены в применяемом классе

- если родительские классы определяют метод с одним и тем же именем

    - то миксин наследует только ...

### Модули

#### Пространства имен

**Цель**

- организация больших программ

**Что внутри**

- группы классов, интерфейсов, функций, других пространств имен

    - могут использоваться в общем контексте

```js
namespace Personnel {
    export class Employee {
        constructor(public name: string) {
        }
    }
}

let alec = new Personnel.Employee("Alec");
console.log(alec.name);    // Alec
```

- определяются в отдельных файлах

    -  **personnel.ts**

```js
namespace Personnel {
    export class Employee {
        constructor(public name: string) {
        }
    }

    export class Manager {
        constructor(public name: string) {
        }
    }
}
```

- **app.ts**

```js
/// <reference path="personnel.ts" />

let tom = new Personnel.Employee("Tom")
console.log(tom.name);

let alec = new Personnel.Manager("Alec");
console.log(alec.name);
```

**Вложенные пространства имен**

```js
namespace Data{
    export namespace Personnel {
        export class Employee {

            constructor(public name: string){
            }
        }
    }
    export namespace Clients {
        export class VipClient {

            constructor(public name: string){
            }
        }
    }
}

let tom = new Data.Personnel.Employee("Tom")
console.log(tom.name);

let sam = new Data.Clients.VipClient("Sam");
console.log(sam.name);
```

**Псевдонимы**

```js
namespace Data{
    export namespace Personnel {
        export class Employee {
            constructor(public name: string){
            }
        }
    }
}

import employee = Data.Personnel.Employee;
let tom = new employee("Tom")
console.log(tom.name);
```

#### Модули

-  **devices.ts**

```js
interface Device{
    name: string;
}

class Phone implements Device {
    name: string;
    constructor(n:string){
        this.name = n;
    }
}

function Call(phone: Phone) : void{
    console.log("Make a call by", phone.name);
}
export {Device, Phone, Call as Devices};
```

- **app.ts**

```js
import {Phone, Call} from "./devices";
let iphone: Phone = new Phone("iPhone X");
Call(iphone);
```

**module** vs **namespace**

В TS-руководстве есть 2 типа модулей:

- внутренний(пространства имен)

    - код во внутреннем модуле написан в Typescript

- внешний(модуль)

    - написан в Javascript.

**Note:** чтобы согласовать с новой терминологией ECMAScript 2015, было решено переименовать их в пространства имен и модули

**Пример**


```js
window.NamespaceA
window.NamespaceA.NamespaceB
window.NamespaceA.NamespaceB.NamespaceC
window.NamespaceA.NamespaceB.NamespaceC.ClassD
```

а если с модулями?

    - должны использовать "волшебство"

### Заголовочные файлы

**Цель**

- для установки связи с внешними файлами скриптов javascript

- файлы с расширением .d.ts

    - описывают синтаксис и структуру функций и свойств

    - не предоставляют реализацию

    - роль оберток над библиотеками javascript


- **файл с глобвальной переменной**

```html
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>TypeScript HTML App</title>
</head>
<body>
    <h1>TypeScript HTML App</h1>

    <div id="content"></div>
    <script>
        const globalVar = "hello TS";
    </script>
    <script src="app.js"></script>
</body>
</html>
```

- **app.js**

```js
class Utility {
    static displayGlobalVar() {

        console.log(globalVar);
    }
}

window.onload = () => {

    Utility.displayGlobalVar();

};
```

- **globals.d.ts**

```js
declare const globalVar: string;
```

- **app.js**

```js
/// <reference path="globals.d.ts" />

class Utility {
    static displayGlobalVar() {
        console.log(globalVar);
    }
}
window.onload = () => {
    Utility.displayGlobalVar();
};
```

- **более сложные объекты**

```js
const points = [
    { X: 10, Y: 34 },
    { X: 24, Y: 65 },
    { X: 89, Y: 12 }
];
```

```js
// globals.d.ts

interface IPoint {
    X: number;
    Y: number;
}

declare const points: IPoint[];
```

### Декораторы

> Декларати́вное программи́рование — это парадигма программирования, в которой задаётся спецификация решения задачи, то есть описывается, что представляет собой проблема и ожидаемый результат **@ Wwiki**

**Цель**

- инструменты декларативного программирования

    - позволяют добавить к классам и их членам метаданные

    - тем самым изменить их поведение без изменения их кода

**Note:** на текущий момент декораторы являются экпериментальной функциональностью языка TypeScript

#### Декораторы классов

- представляет функцию, которая принимает один параметр

```js
function classDecoratorFn(constructor: Function){ }
```

```js
function sealed(constructor: Function) {
    console.log("sealed decorator");
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class User {
    name: string;
    constructor(name: string){
        this.name = name;
    }
    print():void{
        console.log(this.name);
    }
}

Object.defineProperty(User, 'age', {
    value: 17
});
```

#### Декоратор метода

- представляет функцию, которая принимает три параметра

    - функция конструктора класса для статического метода, либо прототип класса для обычного метода

    - название метода

    - объект интерфейса PropertyDescriptor

```js
interface PropertyDescriptor{
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get? (): any;
    set? (v: any): void;
}
```

```js
function deprecated(target: any, propertyName: string, descriptor: PropertyDescriptor){
    console.log("Method is deprecated");
}
```

**Пример**

```js
function readonly (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false;
};

class User {

    name: string;
    constructor(name: string){
        this.name = name;
    }

    @readonly
    print():void{
        console.log(this.name);
    }
}
const tom = new User("Tom");
tom.print = function(){console.log("print has been changed");}
tom.print();  // Tom
```

#### Параметры и выходной результат метода

- позволяет манипулировать параметрами и возвращаемым результатом метода

```js
// обычное логирование

function log(target: Object, method: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;

    descriptor.value = function(...args){
        console.log(JSON.stringify(args));

        const returnValue = originalMethod.apply(this, args);

        console.log(`${JSON.stringify(args)} => ${returnValue}`)

        return returnValue;
    }
}

class Calculator{

    @log
    add(x: number, y: number): number{
        return x + y;
    }
}

let calc = new Calculator();
let z = calc.add(4, 5);
z = calc.add(6, 7);
```

#### Декораторы параметров методов

- представляет функцию, которая принимает три параметра

```js
function MyParameterDecorator(target: Object, propertyKey: string, parameterIndex: number){
    // код декоратора
}
```

- представляет

    - конструктор класса (метод статический)

    - прототип класса (метод нестатический)

- имя параметра

- порядковый индекс параметра в списке параметров

**Пример**

```js
// добавляет в прототип класса новое свойство metadataKey
// - свойство представляет массив, который содержит индексы декорированных параметров

function logParameter(target: any, key : string, index : number) {
    const metadataKey = `__log_${key}_parameters`;

    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
    } else {
        target[metadataKey] = [index];
    }
}

// для чтения метаданных из свойства metadataKey
// - перебирает все параметры метода
// - находит значения параметров по индексам, которые определены декоратором параметров
// - выводит в консоль названия и значения декорированных параметров
function logMethod(target, key, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {

        const metadataKey = `__log_${key}_parameters`;
        const indices = target[metadataKey];

        if (Array.isArray(indices)) {
            for (var i = 0; i < args.length; i++) {

                if (indices.indexOf(i) !== -1) {
                    const arg = args[i];
                    const argStr = JSON.stringify(arg) || arg.toString();
                    console.log(`${key} arg[${i}]: ${argStr}`);
                }
            }
            const result = originalMethod.apply(this, args);
            return result;
        }
        else {
            const a = args.map(a => (JSON.stringify(a) || a.toString())).join();
            const result = originalMethod.apply(this, args);
            const r = JSON.stringify(result);

            console.log(`Call: ${key}(${a}) => ${r}`);
            return result;
        }
    }
    return descriptor;
}

class User {

    private name: string;
    constructor(name: string){
        this.name = name;
    }
    @logMethod
    setName(@logParameter name: string){
        this.name = name;
    }
    print():void{
        console.log(this.name);
    }
}

const tom = new User("Tom");
tom.setName("Bob");
tom.setName("Sam");
```

#### Декораторы свойств

- представляет функцию, которая принимает два параметра

```js
function MyPropertyDecorator(target: Object, propertyKey: string){
    // код декоратора
}
```

- представляет

    - конструктор класса (метод статический)

    - прототип класса (метод нестатический)

- имя свойства

```js
function format(target: Object, propertyKey: string){

    let _val = this[propertyKey];   // получаем значение свойства

    // геттер
    const getter = function () {
        return `Mr./Ms. ${_val}`;
    };

    // сеттер
    const setter = function (newVal) {
        _val = newVal;
    };

    // удаляем свойство
    if (delete this[propertyKey]) {

        // И создаем новое свойство с геттером и сеттером
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
}

class User {

    @format
    name: string;
    constructor(name: string){
        this.name = name;
    }
    print():void{
        console.log(this.name);
    }
}
let tom = new User("Tom");
tom.print();
tom.name = "Tommy";
tom.print();
```

#### Декоратор метода доступа

```js
function decorator(target: Object, propertyName: string, descriptor: PropertyDescriptor){
    // код декоратора
}
```

- представляет

    - конструктор класса (метод статический)

    - прототип класса (метод нестатический)

- имя метода

- объект PropertyDescriptor

**Пример**

```js
function validator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldSet = descriptor.set;

    descriptor.set = function(value: string) {
        if (value === "admin") {
            throw new Error("Invalid value");
        }

        oldSet.call(this, value);
    }
}
class User {

    private _name: string;
    constructor(name: string){
        this.name = name;
    }

    public get name(): string {
        return this._name;
    }
    @validator
    public set name(n: string) {
        this._name = n;
    }
}
let tom = new User("Tom");
tom.name= "admin";
console.log(tom.name);
```

#### Фабрики декораторов

- функция, которая возвращает функцию декоратора

```js
function regex(pattern: string){
    const expression = new RegExp(pattern);

    return function regex(target: Object, propertyName: string){
        const propertyValue = this[propertyName];

        // геттер
        const getter = function () {
            return propertyValue;
        };

        // сеттер
        const setter = function (newVal) {
            let isValid: boolean = expression.test(newVal);

            if(isValid === false){
                throw new Error(`Value ${newVal} does not match ${pattern}`);
            } else {
                console.log(`${newVal} is valid`);
            }
        };
        // удаляем свойство
        if (delete this[propertyName]) {

            // И создаем новое свойство с геттером и сеттером
            Object.defineProperty(target, propertyName, {
                get: getter,
                set: setter
            });
        }
    }
}

class Account{

    @regex("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
    email: string;

    @regex("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")
    phone: string;

    constructor(email: string, phone: string){
        this.email = email; this.phone = phone;
    }
}

let acc = new Account("bir@gmail.com", "+23451235678");
acc.email = "bir_iki_yedi";
```

![Мои поздравления](./finally--00.jpg "Мои поздравления")

# Обратно к Angular

## Список и детали героев

### [NgModel](https://next.angular.io/api/forms/NgModel)

**Что делает?**

- создает экземпляр **FormControl** из модели

    - связывает с элементом управления формой

- добавим редактирование свойства `name` **src/app/heroes/heroes.component.html**

```html
...

<div>
  <label>
    name: <input [(ngModel)]="hero.name" placeholder="name">
  </label>
</div>
```

**Note:** `[(ngModel)] ` - синтаксис двусторонней привязки

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

```js
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

```js
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

```html
<h2>My Heroes</h2>
<ul class="heroes">
  <li *ngFor="let hero of heroes">
    <span class="badge">{hero.id}</span> {hero.name}
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

- TypeScript

- NgModel

- NgModules

- ngFor

## ДЗ

**null**

[<< prev](../23.angular--02) | [next >>](../25.angular--04)

## Справочники

- [NgModel](https://next.angular.io/api/forms/NgModel)

- [NgModules](https://next.angular.io/guide/ngmodules)

- [ngFor](https://next.angular.io/guide/template-syntax#ngFor)