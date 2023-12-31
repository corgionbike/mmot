define(function (require) {
    console.debug('Module datepicker start');

    var $ = require('jquery');
    require('datepicker');
    var opt = {
        timepicker: true,
        todayButton: new Date(),
    };

    var module = {

        init: function (selector, options) {

            if (typeof (options) == 'undefined') {
                options = opt;
            }

            $(selector).datepicker(options);

        },
    };

    return module;
});