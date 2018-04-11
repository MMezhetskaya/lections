;(function(w) {
    'use strict';

    /**
     * Component constructor
     * @param {Object} opt - component data
     * @constructor
     */
    var Component = function(opt) {
        this._view = null;
        this._order = 0;
        this._rendered = false;
        this.opt = opt;

        Component.bufferStore(this);
    };

    /**
     * Data buffer
     * @return {Function} - saved data control function
     */
    Component.bufferStore = (function () {
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
     * Render page components
     */
    Component.renderPage = function() {
        var viewBody = document.querySelector('body'),
            components = [].slice.call(arguments);

        //TODO: sorting by _order

        components.map(function(c) {
            c._rendered = true;
            viewBody.appendChild(c._view);

        });
    };

    /**
     * Fill string with real data
     * @param {string} str - string
     * @param {Object} val - data object
     * @returns {string} - real data filled html string
     */
    Component.replaceVal = function(str, val) {
        var newStr = str;

        for (var v in val) {
            if (!val.hasOwnProperty(v)) continue;

            var optRegExp = new RegExp('{' + v + '}', 'g');

            newStr = newStr.replace(optRegExp, val[v]);
        }

        return newStr;
    };

    /**
     * Create menu sub items
     * @param {string} view - component html
     * @param {Object} data - view data
     * @returns {HTMLUListElement}
     */
    Component.createSubItems = function(view, data) {
        var tagRegExp = new RegExp(/\{([^\}]*)\}/),
            parentTag = document.createElement('ul');

        for(var i = 0; i < data.length; i++) {
            var itemView = document.createElement(view.match(tagRegExp)[1]);

            itemView.innerHTML = Component.replaceVal('<a href="{url}">{name}</a>', data[i]);

            parentTag.appendChild(itemView);
        }

        return parentTag;
    };

    /**
     * Bind click event for menu item
     * @param {Object} e - event
     */
    Component.bindMenuClick = function(e) {
        var newComponent = this.getAttribute('href');

        alert('Rendering component ' + newComponent);
        w[newComponent] && Component.renderPage(w[newComponent]);
        e.preventDefault();
    };

    /**
     * Set component html view
     * @param {string} view - component html
     * @param {Object} [data] - view data
     */
    Component.prototype.setView = function(view, data) {
        var viewParent = document.querySelector(this.opt.parent);

        if (!viewParent) viewParent = document.createElement(this.opt.parent);

        if (data) {
            viewParent.appendChild(
                Component.createSubItems(view, data)
            );

            viewParent.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', Component.bindMenuClick);
            });
        } else  {
            viewParent.innerHTML += Component.replaceVal(view, this.opt);
        }

        this._view = viewParent;
    };

    /**
     * Remove component
     */
    Component.prototype.remove = function() {
        this._view.remove();

        //TODO: remove from bufferStore array
    };

    w.Component = Component;
})(window);