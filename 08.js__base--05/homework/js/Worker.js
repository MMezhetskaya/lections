/*
Реализуйте класс **Worker**, который будет иметь следующие свойства: **name**, **surname**, **rate**, **days**.

Также класс имеет метод **getSalary()**, который выводит зарплату работника.

Зарплата - произведение ставки **rate** на количество отработанных дней **days**.

```js
var worker00 = new Worker(
    {
        name: 'Иван',
        surname: 'Иванов',
        rate: 10,
        days: 20
    }
);

console.log(worker00.name);
console.log(worker00.surname);
console.log(worker00.rate);
console.log(worker00.days);
console.log(worker00.getSalary());
```

С помощью класса **Worker** создайте 3х рабочих и добавьте метод **getTotalSalary()** выводящий сумму их зарплат.
 */

;(function(w) {
    'use strict';

    var Worker = function(opt) {
        for (var prop in opt) {
            if (opt.hasOwnProperty(prop)) {
                this[prop] = opt[prop];
            }
        }
    };

    Worker.prototype.getSalary = function() {
        var result = 0;

        if (+this.rate && +this.days) {
            result = this.rate * this.days;
        }

        return result;
    };

    Worker.getTotalSalary = function() {
        var result = 0;

        for (var i = 0; i < arguments.length;  i++) {
            result += arguments[i].getSalary();
        }

        return result;
    };

    w.Worker = Worker;
})(window);