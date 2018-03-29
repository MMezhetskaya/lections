;(function(w) {
    'use strict';

    /**
     * Director constructor
     * @param {Object} opt - director data
     * @constructor
     */
    var Director = function(opt) {
        this.workers = [];

        for (var prop in opt) {
            if (opt.hasOwnProperty(prop)) {
                this[prop] = opt[prop];
            }
        }
    };

    /**
     * @type {Worker}
     */
    Director.prototype = Object.create(Worker.prototype);
    /**
     * @type {Director}
     */
    Director.prototype.constructor = Director;

    /**
     * Add worker to list
     * @param {Object} opt - worker info
     * @return {Array} - workers list
     */
    Director.prototype.addWorker = function(opt) {
        (opt.name)
            ? this.workers.push(new Worker(opt))
            : console.error('Worker name required!!!');

        return this.workers;
    };

    /**
     * Remove worker from list
     * @param {string} name - worker name
     * @return {Array} - workers list
     */
    Director.prototype.removeWorker = function(name) {
        this.workers = this.workers.filter(function(worker) {
            return worker.name !== name;
        });

        return this.workers;
    };

    /**
     * Get worker
     * @param {string} name - worker name
     * @return {Array[]} - worker
     */
    Director.prototype.getWorker = function(name) {
        return this.workers.filter(function(worker) {
            return worker.name === name;
        });
    };

    /**
     * Set worker rate
     * @param name {string} - worker name
     * @param {number|string} rate - worker rate
     * @return {Array} - workers list
     */
    Director.prototype.setWorkerRate = function(name, rate) {
        this.workers = this.workers.map(function(worker) {
            if (worker.name === name && rate >= 0) {
                worker.rate = rate;
            }
        });

        return this.workers;
    };

    w.Director = Director;
})(window);