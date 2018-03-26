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