define(function (require) {
    console.debug('Module autocomplete start');

    var $ = require('jquery');
    require('autocomplete');

    var module = {

        init: function (selector, url, options) {

            var opt = {
                serviceUrl: url,
                minChars: 2,
                delimiter: /(,|;)\s*/,
                maxHeight: 400,
                width: 300,
                zIndex: 9999,
                deferRequestBy: 500,
                params: {
                    type: "tags"
                },
                paramName: "q"
            };

            if (typeof (options) == 'undefined') {
                options = opt;
            };

            $(selector).autocomplete(opt);

        },
    };

    return module;
});