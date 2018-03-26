/*
Создайте еще один класс **Director** который должен наследовать свойства класса **Worker**, и иметь методы

- **addWorker({name: workerName, surname: workerSurname, rate: workerRate, days: workerDays})** - добавит работника в
 список

- **removeWorker(workerName)** - удалит работника из списока

- **getWorker(workerName)** - получить все данные работника

- **setWorkerRate(workerName, rate)** - обновить **rate**  для работника
 */

;(function(w) {
    'use strict';

    var Director = function(opt) {
        this.workers = [];

        for (var prop in opt) {
            if (opt.hasOwnProperty(prop)) {
                this[prop] = opt[prop];
            }
        }
    };

    Director.prototype = Object.create(Worker.prototype);
    Director.prototype.constructor = Director;

    Director.prototype.addWorker = function(opt) {
        (opt.name)
            ? this.workers.push(new Worker(opt))
            : console.error('Worker name required!!!');

        return this.workers;
    };

    Director.prototype.removeWorker = function(name) {
        this.workers = this.workers.filter(function(worker) {
            return worker.name !== name;
        });

        return this.workers;
    };

    Director.prototype.getWorker = function(name) {
        return this.workers.filter(function(worker) {
            return worker.name === name;
        });
    };

    Director.prototype.setWorkerRate = function(name, rate) {
        this.workers = this.workers.map(function(worker) {
            if (worker.name === name && rate) {
                worker.rate = rate;
            }
        });

        return this.workers;
    };

    w.Director = Director;
})(window);