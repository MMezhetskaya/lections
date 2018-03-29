;(function(w) {
    'use strict';

    /**
     * Worker constructor
     * @param {Object} opt - worker data
     * @constructor
     */
    var Worker = function(opt) {
        for (var prop in opt) {
            if (opt.hasOwnProperty(prop)) {
                this[prop] = opt[prop];
            }
        }

        Worker.bufferStore(this);
    };

    /**
     * Get worker salary
     * @return {number} - worker salary
     */
    Worker.prototype.getSalary = function() {
        var result = 0;

        if (+this.rate && +this.days) {
            result = this.rate * this.days;
        }

        return result;
    };

    /**
     * Data buffer
     * @return {Function} - saved data control function
     */
    Worker.bufferStore = (function () {
        var savedData = [];

        return function (data) {
            if (data) {
                savedData.push(data);
            } else {
                return savedData;
            }
        }
    })();

    /**
     * Get all workers salary
     * @param {object=} arguments - list of workers
     * @return {number} - all workers salary
     */
    Worker.getTotalSalary = function() {
        var result = 0,
            workersList = arguments.length ? arguments : Worker.bufferStore();

        for (var i = 0; i < workersList.length;  i++) {
            result += workersList[i].getSalary();
        }

        return result;
    };

    w.Worker = Worker;
})(window);