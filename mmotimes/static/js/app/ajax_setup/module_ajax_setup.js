define(function (require) {
    console.debug('Module ajax setup start');
    var $ = require('jquery');
    var cookie = require('jquery-cookie');

    var module = {

        csrfSafeMethod: function (method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        },

        init: function () {

            var csrftoken = $.cookie('csrftoken');
            $.ajaxSetup({
                beforeSend: function (xhr, settings) {
                    if (!module.csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                }
            });
        }


    };
    return module.init();
});



