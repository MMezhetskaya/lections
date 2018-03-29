# Lection 09

##  Класс

>Классом в объектно-ориентированной разработке называют шаблон/программный код, предназначенный для создания объектов
 и методов.

- Класc/конструктор в JS

```js
function MyClass(name) {
    this.name = name;
    
    this.myMethod = function() {}
}
```

```js
function MyClass(name) {
    this.name = name;
}

MyClass.prototype.myMethod = function() {}
```

```js
var myClass = new MyClass('Имя');
```

## Инкапсуляция
 
### Внутренний и внешний интерфейс 

>Один из важнейших принципов ООП – отделение внутреннего интерфейса от внешнего.

**Внутренний интерфейс(приватный)**

- свойства и методы, доступ к которым может быть осуществлен только из других методов объекта

- локальные переменные, включая параметры конструктора, можно считать приватными свойствами

**Внешний интерфейс(публичный)** 

- свойства и методы, доступные снаружи

```js
// создать кофеварку
var coffeeMachine = new CoffeeMachine(100);

// залить воды
coffeeMachine.waterAmount = 200;

function CoffeeMachine(power) {
    this.waterAmount = 0; // количество воды в кофеварке
    
    console.warn('Создана кофеварка мощностью: ' + power + ' ватт');
}
```

### Функциональный стиль

**Задача**

Создать чайник:

- запуск  

- расчёт времени для кипячения

- уведомлять по окончании процесса

```js
function ElectricKettle(power) {
    this.waterAmount = 0;

    // расчёт времени для кипячения
    function _getBoilTime() {
        return 1000; // точная формула расчета будет позже
    }
    
    // что делать по окончании процесса
    function _onReady() {
        alert('Water boiled!');
    }
    
    this.on = function() {
        // setTimeout - встроенная функция,
        // она запустит onReady через getBoilTime() миллисекунд
        setTimeout(_onReady, _getBoilTime());
    };
}
```

```js
function ElectricKettle(power) {
    var WATER_HEAT_CAPACITY = 4200; // физическая константа - удельная теплоёмкость воды
           
    this.waterAmount = 0;
    
    // расчёт времени для кипячения
    function getBoilTime() {
        return this.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }
    
    // что делать по окончании процесса
    function onReady() {
        alert('Water boiled!');
    }
    
    this.on = function() {
        setTimeout(onReady, getBoilTime());
    };
}
```

```js
var electricKettle = new ElectricKettle(100);

electricKettle.waterAmount = 200;

electricKettle.on();
```

Отделение и защита внутреннего интерфейса, да - **ИНКАПСУЛЯЦИЯ**.

**Пример**

Выходит новая версия чайника, которая работает гораздо лучше. Разработчик мог переделать всё внутри, но пользоваться им по-прежнему просто, так как внешний интерфейс сохранён.

## Геттеры и сеттеры

>Для управляемого доступа к состоянию объекта используют специальные функции, так называемые «геттеры» и «сеттеры».

```js
function ElectricKettle(power) {
      this.waterAmount = 0;
    
      ...
}

var electricKettle = new ElectricKettle(100);

electricKettle.waterAmount = -1000000;
```

- для лучшего контроля над свойством его делают приватным, а запись значения осуществляется через метод - **сеттер**

```js
var electricKettle = new ElectricKettle(1000, 500);

electricKettle.setWaterAmount(600); // упс, ошибка!

function ElectricKettle(power, capacity) { // capacity - ёмкость чайника
    var waterAmount = 0,
        WATER_HEAT_CAPACITY = 4200;
    
    function getTimeToBoil() {
        return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }
    
    //установка свойства
    this.setWaterAmount = function(amount) {
        if (amount < 0) {
            throw new Error("Значение должно быть положительным");
        }
        
        if (amount > capacity) {
            throw new Error("Нельзя залить воды больше, чем " + capacity);
        }
        
        waterAmount = amount;
    };
    
    function onReady() {
        alert('Water boiled!');
    }
    
    this.run = function() {
        setTimeout(onReady, getTimeToBoil());
    };
}
```

- чтобы дать возможность внешнему коду узнать его значение, создадим функцию – **геттер**

```javascript
function ElectricKettle(power, capacity) {
    ...
    
    this.getWaterAmount = function() {
        return waterAmount;
    };
    
    ...
}

var electricKettle = new ElectricKettle(1000, 500);

electricKettle.setWaterAmount(450);
electricKettle.getWaterAmount(); // 450
```

- единый **геттер-сеттер**

```js
function ElectricKettle(power, capacity) {
    var waterAmount = 0;
    
    this.waterAmount = function(amount) {
        // вызов без параметра, значит режим геттера, возвращаем свойство
        if (!arguments.length) {
            return waterAmount;
        }
    
        // иначе режим сеттера
        if (amount < 0) {
            throw new Error("Значение должно быть положительным");
        }
        
        if (amount > capacity) {
            throw new Error("Нельзя залить воды больше, чем " + capacity);
        }
        
        waterAmount = amount;
    };
    
    ...
}

var electricKettle = new ElectricKettle(1000, 500);

// пример использования
electricKettle.waterAmount(450);
electricKettle.waterAmount()
```
*концепт некоторых библиотек(jQuery etc.)

## Наследование

>Наследование – это создание новых классов на основе существующих.

**Зачем?**

- множество машин
    
    - у всех машин есть общие свойства, а конкретные машины могут их дополнять

**В веб-разработке**

Классы Меню, Табы, Диалог и другие компоненты интерфейса.
 
В них всех обычно есть что-то общее.

Можно выделить такой общий функционал в класс Компонент и наследовать их от него, чтобы не дублировать код.

### Функциональный стиль

**Вернемся к машинам, и нашему чайнику**

```js
function Machine() {
    var enabled = false;
    
    this.powerStatus = function(status) {
        if (!arguments.length)  {
           return enabled;
        }
        
        enabled = status;
    };
}
```

```js
var electricKettle = new ElectricKettle(10000);

electricKettle.powerStatus(true);
electricKettle.setWaterAmount(100);
electricKettle.on();

function Machine() {
    var enabled = false;
    
    this.powerStatus = function(status) {
        if (!arguments.length)  {
           return enabled;
        }
        
        enabled = status;
    };
}

function ElectricKettle(power) {
    var waterAmount = 0;
    
    Machine.call(this); // наследовать
    
    this.setWaterAmount = function(amount) {
        waterAmount = amount;
    };
    
    this.on = function() {
        if (waterAmount  > 0 && this.powerStatus()) {
            console.log('Ready to start!');
        } else {
            console.log('Not ready to start!')
        }
    };
}
```

### Защищённые свойства

```js
var electricKettle = new ElectricKettle(10000);

electricKettle.powerStatus(true);
electricKettle.setWaterAmount(100);
electricKettle.on();

function Machine() {
    var enabled = false;
    
    this.powerStatus = function(status) {
        if (!arguments.length)  {
           return enabled;
        }
        
        enabled = status;
    };
}

function ElectricKettle(power) {
    var waterAmount = 0;
    
    Machine.call(this); // наследовать
    
    this.setWaterAmount = function(amount) {
        waterAmount = amount;
    };
    
    this.on = function() {
        console.log(enabled);
        
        if (waterAmount  > 0 && this.powerStatus()) {
            console.log('Ready to start!');
        } else {
            console.log('Not ready to start!')
        }
    };
}
```

*Наследник не имеет доступа к приватным свойствам родителя, пример выше

- переопределим их с использованием **this._prop**

```js
var electricKettle = new ElectricKettle(10000);

function Machine() {
    this._enabled = false;
    
    this.powerStatus = function(status) {
        if (!arguments.length)  {
           return this._enabled;
        }
        
        this._enabled = status;
    };
}

function ElectricKettle(power) {
    Machine.call(this);
    debugger;
}
```

```js
var electricKettle = new ElectricKettle(10000);

function Machine(power) {
    this._power = power;
    this._enabled = false;
    
    this.powerStatus = function(status) {
        if (!arguments.length)  {
            return this._enabled;
        }
        
        this._enabled = status;
    };
}

function ElectricKettle(power) {
    Machine.call(this, power);
    debugger;
}
```

Все это было **НАСЛЕДОВАНИЕ**

## Переопределение методов

- множество потомков от базового класса чайник, микроволновка, холодильник  и тд.

```js
// Fridge может добавить и свои аргументы,
// которые в Machine не будут использованы
function Fridge(power, temperature) {
    Machine.call(this, power, temperature);
    
    // ...
}
```

- хотим свой метод **powerStatus**

```js
function ElectricKettle(power, capacity) {
    Machine.call(this, power, capacity);
    
    // переопределить this.powerStatus
    this.powerStatus = function() {
        /* powerStatus для чайника */
    };
}
```

- но чаще расширить

```js
var electricKettle = new ElectricKettle(10000);

electricKettle.setWaterAmount(50);
electricKettle.powerStatus();

function Machine(power) {
    this._power = power;
    this._enabled = false;
    
    this.powerStatus = function(status) {
        if (!arguments.length)  {
            return this._enabled;
        }
        
        this._enabled = status;
    };
}

function ElectricKettle(power) {
    Machine.call(this, power);
    
    var waterAmount = 0,
        parentPowerStatus = this.powerStatus;
    
    this.powerStatus = function(status) {
        if(status) {
            parentPowerStatus.call(this, status);
        } 
        
        if (this._enabled && waterAmount > 0) {
            this.on();
        }
    };
    
    this.on = function() {
        setTimeout(onReady, 1000);
    };
    
    function onReady() {
        alert('Water  boiled!');
    }
}
```

- через замыкание

```js
...

function Machine(power) {
    var self = this;
    
    this._power = power;
    this._enabled = false;
    
    this.powerStatus = function(status) {
        if (!arguments.length)  {
            return self._enabled;
        }
        
        self._enabled = status;
    };
}

function ElectricKettle(power) {
    ...
    
    this.powerStatus = function(status) {
         if(status) {
             // теперь можно вызывать как угодно, this не важен
             parentPowerStatus(status);
         } 
        
        ...
    }
    
    ...
}
```

Все это **функциональный паттерн наследования**, а переопределение метода и было - **ПОЛИМОРФИЗМОМ**

## Заключение

- Класс

- Инкапсуляция

- Наследование

- Полиморфизм


## ДЗ

**Задание 1**

Создайте класс **Component**, компонент имеет методы:

- **setView** - установить html view

- **render** - отрендерить текущий  html view с параметрами

- **delete** - удалить текуий компонент
 
**Задание 2**

Наследуя от класса **Component** создайте 3 компонента:

- **componentHeader**
 
- **componentMenu** - расширяет базовый метод **render**

    - добавляя **renderSubItem** - рендерит пункты  подменю и вставляет их в родительский пункт меню

- **componentFooter**
 
**Задание 3**

Добавить стили

**Запуск**

```js
var componentHeader = new Component({parent: 'header', url: 'путь к лого',  title: 'заголовок'}),
    componentMenu = new Component({parent: 'nav'}),
    componentFooter = new Component({parent: 'footer', text: 'Корирайты'}),
    viewHeader = '<h1><img src="{url}" alt="{title}"/>  {title}</h1>',
    viewMenu = '<ul>{li}</ul>',
    viewFooter = '<p><small>{text}</small</p>',
    dataMenu = [
        {
           name: 'Главная',
           url: 'www'
        },
        {
           name: 'O нас',
           url: 'www',
           items: [
               {name: 'Кто мы', url: 'www'},
               {name: 'Где мы', url: 'www'},
               {name: 'Откуда', url: 'www'}
           ]
        },
        {
           name: 'Контакты', 
           url: 'www'
        }
    ];
    

componentHeader.setView(viewHeader);
componentMenu.setView(viewMenu, dataMenu);
componentFooter.setView(viewFooter);

document.body.appendChild(componentHeader.render()) // <header><h1><img src="путь к лого" alt="заголовок"/>  заголовок</h1></header>
document.body.appendChild(componentMenu.render()) // <nav><ul><li><a href="www">O нас</a><ul><li><a href="www">Кто мы</a></li></ul></li></ul></nav>
document.body.appendChild(componentFooter.render()) // <footer><p>Корирайты</p></footer>

componentFooter.delete() //удалить текуий компонент 
```

## Справочники
- [Usejsdoc](http://usejsdoc.org/)