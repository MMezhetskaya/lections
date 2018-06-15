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

### Преобразование типов

**Пример**

```angularjs
class User {
    name: string;

    constructor(userName: string) {
        this.name = userName;
    }
}

class Employee extends User {
    company: string;

    constructor(employeeCompany: string, userName: string) {
        super(userName);
        this.company = employeeCompany;
    }
}

// от призводного типа Employee к базовому типу User
function getUserName(user: User): string {
    return user.name;
}

function userFactory(name: string): User {
    return new Employee("не установлено", name);
}

let alice: Employee = new Employee("Microsoft", "Alice");
let userName = getUserName(alice);
console.log(userName);  // Alice

let tom = userFactory("Tom");
userName = getUserName(tom);
console.log(userName);  // Tom
```

**Тут вроде все ясно?**

```angularjs
let alice: User = new Employee("Microsoft", "Alice");
console.log(alice.company);
```


```angularjs
let alice: User = new Employee("Microsoft", "Alice");

let aliceEmployee: Employee = <Employee>alice; // преобразование к типу Employee
console.log(aliceEmployee.company);

// или так
console.log((<Employee>alice).company);
```

**А интерфейсы?**

```angularjs
interface IUser {
    name: string;
}
class User {
    name: string;
    constructor(userName: string) {
        this.name = userName;
    }
}
class Employee extends User {
    company: string;
    constructor(employeeCompany: string, userName: string) {
        super(userName);
        this.company = employeeCompany;
    }
}

function getUserName(user: IUser): string {
    return user.name;
}

let alice: User = new Employee("Microsoft", "Alice");
console.log(getUserName(alice));

console.log(getUserName({ name: "Tom" }));
console.log(getUserName({ name: "Bob", company:"Microsoft" }));
```

- как решить проблему?

- **instanceOf**

### Обобщения

**TypeScript является строго типизированным языком?**

- не можем использовать результат функции как объект того типа, который передан в функцию

```angularjs
function getId(id: any): any {
    return id;
}

let result = getId(5);
console.log(result);
```

- типизирована определенным типом T

    - при выполнении функции вместо Т будет подставляться конкретный тип

        - на этапе компиляции конкретный тип не известен

```angularjs
function getId<T>(id: T): T {
    return id;
}
```

```angularjs
function getId<T>(id: T): T {

    return id;
}

let result1 = getId<number>(5);
console.log(result1);
let result2 = getId<string>("abc");
console.log(result2);
```

- обобщенные массивы

```angularjs
function getString<T>(arg: Array<T>): string {
    let result = "";
    for (let i = 0; i < arg.length; i++) {
        if (i > 0)
            result += ",";
        result += arg[i].toString();
    }
    console.log(result);
    return result;
}

let result = getString<number>( [1, 2, 34, 5]);
console.log(result);
```

#### Обобщенные классы и интерфейсы

```angularjs
class User<T> {
    private _id: T;
    constructor(id:T) {
        this._id=id;
    }
    getId(): T {

        return this._id;
    }
}

let tom = new User<number>(3);
console.log(tom.getId()); // возвращает number

let alice = new User<string>("vsf");
console.log(alice.getId()); // возвращает string

```


```
let tom = new User<number>(3);
console.log(tom.getId());
tom = new User<string>("vsf");
```

**Note:** если типизировали объект определенным типом, то сменить данный тип уже не получится

#### Ограничения обобщений

- необходимо использовать обобщения

    - принимать любой тип в функцию или класс вместо параметра T нежелательно

**Например**

```js
interface IUser {
    getInfo();
}

class User implements IUser {
    _id: number;
    _name: string;
    constructor(id:number, name:string) {
        this._id = id;
        this._name = name;
    }
    getInfo() {
        console.log("id: " + this._id + "; name: " + this._name);
    }
}

class Employee extends User {
    _company: string;
    constructor(id: number, name: string, company: string) {
        super(id, name);
        this._company = company;
    }
    getInfo() {
        console.log("id: " + this._id + "; name: " + this._name+"; company:"+this._company);
    }
}
```

- создадим класс, выводящий информацию о пользователях

    - предполагая, что в качестве параметра будет передаваться объект IUser

    - чтобы нельзя было передать объекты любого типа

        - устанавливается ограничения **extends**

```js
class UserInfo<T extends IUser>{
    getUserInfo(user: T): void{
        user.getInfo();
    }
}
```

#### New

- новый объект в коде обобщений

    - надо указать

        - что обобщенный тип T имеет конструктор

```js
function UserFactory<T>(): T {
    return new T();
}
```

- так да

```js
function userFactory<T>(type: { new (): T; }): T {
    return new type();
}

class User {
    constructor() {
        console.log("создан объект User");
    }
}

let user: User = userFactory(User);
```

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

```js
<h2>{{hero.name}} Details</h2>
<div><span>id: </span>{{hero.id}}</div>
<div><span>name: </span>{{hero.name}}</div>
```

- модифицируем `hero.name` используя [angular pipes](https://next.angular.io/guide/pipes)

```js
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

```js
import { FormsModule } from '@angular/forms';  // <-- NgModel lives here

...

imports: [
  BrowserModule,
  FormsModule
],

...
```

## Заключение

- Основы **TypeScript**

- Немного **angular**

## ДЗ

**null**

[<< prev](../22.angular--01) | [next >>](../24.angular--03)

## Справочники

- [angular-cli документация](https://github.com/angular/angular-cli/wiki)

- [angular pipes](https://next.angular.io/guide/pipes)

- [NgModel](https://next.angular.io/api/forms/NgModel)