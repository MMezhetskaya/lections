### Класс
Классом в объектно-ориентированной разработке называют шаблон/программный код, предназначенный для создания объектов и методов.

```js
// конструктор
function MyClass(name) {
  this.name = name;
  
  this.myMethod = function() {}
}
```

```js
// конструктор
function MyClass(name) {
  this.name = name;
}

MyClass.prototype.myMethod = function() {}
```

```js
var myClass = new MyClass('Имя');
```

- Внутренний и внешний интерфейс 

Один из важнейших принципов ООП – отделение внутреннего интерфейса от внешнего.

Внутренний интерфейс – это свойства и методы, доступ к которым может быть осуществлен только из других методов объекта, их также называют «приватными».

Внешний интерфейс – это свойства и методы, доступные снаружи объекта, их называют «публичными».

```js
function CoffeeMachine(power) {
  this.waterAmount = 0; // количество воды в кофеварке

  alert( 'Создана кофеварка мощностью: ' + power + ' ватт' );
}

// создать кофеварку
var coffeeMachine = new CoffeeMachine(100);

// залить воды
coffeeMachine.waterAmount = 200;
```

- приватные свойства и методы

Локальные переменные, включая параметры конструктора, можно считать приватными свойствами.

Функциональный стиль:

```javascript
function CoffeeMachine(power) {

  this.waterAmount = 0;

  // расчёт времени для кипячения
  function getBoilTime() {
    return 1000; // точная формула расчета будет позже
  }

  // что делать по окончании процесса
  function onReady() {
    alert( 'Кофе готово!' );
  }

  this.run = function() {
    // setTimeout - встроенная функция,
    // она запустит onReady через getBoilTime() миллисекунд
    setTimeout(onReady, getBoilTime());
  };
}

var coffeeMachine = new CoffeeMachine(100);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();
```

```javascript
function CoffeeMachine(power) {

  this.waterAmount = 0;
  
  var self = this;

  // физическая константа - удельная теплоёмкость воды для getBoilTime
  var WATER_HEAT_CAPACITY = 4200;

  // расчёт времени для кипячения
  function getBoilTime() {
      return self.waterAmount * WATER_HEAT_CAPACITY * 80 / power; // ошибка!
    }

  // что делать по окончании процесса
  function onReady() {
    alert( 'Кофе готово!' );
  }

  this.run = function() {
    setTimeout(onReady, getBoilTime());
  };

}
```

```javascript
var coffeeMachine = new CoffeeMachine(1000);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();
```

Отделение и защита внутреннего интерфейса, да ИНКАПСУЛЯЦИЯ.

Ближайшая аналогия в реальной жизни – это когда выходит «новая версия» кофеварки, которая работает гораздо лучше. Разработчик мог переделать всё внутри, но пользоваться ей по-прежнему просто, так как внешний интерфейс сохранён.


- Геттеры и сеттеры

Для управляемого доступа к состоянию объекта используют специальные функции, так называемые «геттеры» и «сеттеры».

```javascript
function CoffeeMachine(power) {
  // количество воды в кофеварке
  this.waterAmount = 0;

  ...
}

coffeeMachine.waterAmount = 1000000;
coffeeMachine.waterAmount -= 1000000;
```

Для лучшего контроля над свойством его делают приватным, а запись значения осуществляется через специальный метод, который называют «сеттер» (setter method).

```javascript
function CoffeeMachine(power, capacity) { // capacity - ёмкость кофеварки
  var waterAmount = 0;

  var WATER_HEAT_CAPACITY = 4200;

  function getTimeToBoil() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  // "умная" установка свойства
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
    alert( 'Кофе готов!' );
  }

  this.run = function() {
    setTimeout(onReady, getTimeToBoil());
  };

}

var coffeeMachine = new CoffeeMachine(1000, 500);
coffeeMachine.setWaterAmount(600); // упс, ошибка!
```

Для того, чтобы дать возможность внешнему коду узнать его значение, создадим специальную функцию – «геттер» (getter method)

```javascript
function CoffeeMachine(power, capacity) {
  //...
  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }

    waterAmount = amount;
  };

  this.getWaterAmount = function() {
    return waterAmount;
  };
}

var coffeeMachine = new CoffeeMachine(1000, 500);
coffeeMachine.setWaterAmount(450);
alert( coffeeMachine.getWaterAmount() ); // 450
```

Единый геттер-сеттер

```javascript
function CoffeeMachine(power, capacity) {
  var waterAmount = 0;

  this.waterAmount = function(amount) {
    // вызов без параметра, значит режим геттера, возвращаем свойство
    if (!arguments.length) return waterAmount;

    // иначе режим сеттера
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }

    waterAmount = amount;
  };

}

var coffeeMachine = new CoffeeMachine(1000, 500);

// пример использования
coffeeMachine.waterAmount(450);
alert( coffeeMachine.waterAmount() ); // 450
```

Концепт некоторых библиотек(jQuery etc.)

- Функциональное наследование

Наследование – это создание новых «классов» на основе существующих.

Зачем наследование? - множество машин.

Можно сказать, что у всех машин есть общие свойства, а конкретные машины могут их дополнять.

В веб-разработке нам могут понадобиться классы Меню, Табы, Диалог и другие компоненты интерфейса. В них всех обычно есть что-то общее.

Можно выделить такой общий функционал в класс Компонент и наследовать их от него, чтобы не дублировать код.

Машины
```javascript
function Machine() {
  var enabled = false;

  this.enable = function() {
    enabled = true;
  };

  this.disable = function() {
    enabled = false;
  };
}
```

Кофеварка
```javascript
function CoffeeMachine(power) {
  Machine.call(this); // отнаследовать

  var waterAmount = 0;

  this.setWaterAmount = function(amount) {
    waterAmount = amount;
  };

}

var coffeeMachine = new CoffeeMachine(10000);

coffeeMachine.enable();
coffeeMachine.setWaterAmount(100);
coffeeMachine.disable();
```

- Защищённые свойства

```javascript
function Machine() {
  var enabled = false;

  this.enable = function() {
    enabled = true;
  };

  this.disable = function() {
    enabled = false;
  };
}

function CoffeeMachine(power) {
  Machine.call(this);

  this.enable();

  // ошибка, переменная не определена!
  alert( enabled );
}

var coffeeMachine = new CoffeeMachine(10000);
```

Наследник не имеет доступа к приватным свойствам родителя, пример выше.

Переопределим их с использованием this._prop.

```javascript
function Machine() {
  this._enabled = false; // вместо var enabled

  this.enable = function() {
    this._enabled = true;
  };

  this.disable = function() {
    this._enabled = false;
  };
}

function CoffeeMachine(power) {
  Machine.call(this);

  this.enable();

  alert( this._enabled ); // true
}

var coffeeMachine = new CoffeeMachine(10000);
```

```javascript
function Machine(power) {
  this._power = power; // (1)

  this._enabled = false;

  this.enable = function() {
    this._enabled = true;
  };

  this.disable = function() {
    this._enabled = false;
  };
}

function CoffeeMachine(power) {
  Machine.apply(this, arguments); // (2)

  alert( this._enabled ); // false
  alert( this._power ); // 10000
}

var coffeeMachine = new CoffeeMachine(10000);
```

- переопределение методов

Множество потомков от базового класса микроволновка, холодильник  и тд.

```javascript
// Fridge может добавить и свои аргументы,
// которые в Machine не будут использованы
function Fridge(power, temperature) {
  Machine.apply(this, arguments);

  // ...
}
```

Хотим свой метод enable

```javascript
function CoffeeMachine(power, capacity) {
  Machine.apply(this, arguments);

  // переопределить this.enable
  this.enable = function() {
    /* enable для кофеварки */
  };
}
```

Но чаще расширить

```javascript
function CoffeeMachine(power) {
  Machine.apply(this, arguments);

  var parentEnable = this.enable; // (1)
  this.enable = function() { // (2)
      parentEnable.call(this); // (3)
      this.run(); // (4)
    }

  ...
}
```

Через замыкание

```javascript
function Machine(power) {
  this._enabled = false;

  var self = this;

  this.enable = function() {
    // используем внешнюю переменную вместо this
    self._enabled = true;
  };

  this.disable = function() {
    self._enabled = false;
  };
}

function CoffeeMachine(power) {
  Machine.apply(this, arguments);

  var waterAmount = 0;

  this.setWaterAmount = function(amount) {
    waterAmount = amount;
  };

  var parentEnable = this.enable;
  this.enable = function() {
      parentEnable(); // теперь можно вызывать как угодно, this не важен
      this.run();
    }

  function onReady() {
    alert( 'Кофе готово!' );
  }

  this.run = function() {
    setTimeout(onReady, 1000);
  };

}

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.setWaterAmount(50);
coffeeMachine.enable();
```

Все это «функциональный паттерн наследования», а переопределение метода и было ПОЛИМОРФИЗМОМ.

### Заключение

### ДЗ
1. Создайте класс Component, компонент имеет методы:
 - setView - установить html view
 - render - отрендерить текущий  html view с параметрами
 - delete - удалить текуий компонент
 
2. Наследуя от класса Component создайте 3 компонента:
 - componentHeader
 - componentMenu - расширяет базовый метод render, добавляя renderSubItem - рендерит пункты  подменю и вставляет их в 
 родительский пункт меню
 - componentFooter
 
3. Методы и как работает:
```javascript
    var componentHeader = new Component({parent: 'header', url: 'путь к лого',  title: 'заголовок'}),
        componentMenu = new Component({parent: 'nav'}),
        componentFooter = new Component({parent: 'footer', text: 'Корирайты'});

    componentHeader.setView('<h1><img src="{url}" alt="{title}"/>  {title}</h1>');
    componentMenu.setView(
        '<ul>{li}</ul>',
         [
             {name: 'Главная', url: 'www'},
             {name: 'O нас', url: 'www', items: [
                 {name: 'Кто мы', url: 'www'},
                 {name: 'Где мы', url: 'www'},
                 {name: 'Откуда', url: 'www'}
             ]},
             {name: 'Контакты', url: 'www'}
         ]
     );
    componentFooter.setView('<p><small>{text}</small</p>');
    
    document.body.appendChild(componentHeader.render()) // <header><h1><img src="путь к лого" alt="заголовок"/>  заголовок</h1></header>
    document.body.appendChild(componentMenu.render()) // <nav><ul><li><a href="www">O нас</a><ul><li><a href="www">Кто мы</a></li></ul></li></ul></nav>
    document.body.appendChild(componentFooter.render()) // <footer><p>Корирайты</p></footer>
    
    componentFooter.delete() //удалить текуий компонент 
```

Подсказки.

replace, appendChild, innerHTML, forEach, map, for (;;;)