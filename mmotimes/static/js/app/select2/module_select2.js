define(function (require) {
    console.debug('Module select2 start');

    var $ = require('jquery');
    require('select2');
    var opt = {
        language: "ru"
    };

    var module = {

        init: function (selector, options) {

            if (typeof (options) == 'undefined') {
                options = opt;
            };
            options.language = "ru";
            $(selector).select2(options);

        },
    };

    return module;
});