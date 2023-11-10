define(function (require) {
    console.debug('Module bootstrap table start');

    var $ = require('jquery');
    require('bootstrap-table');
    require('bootstrap-table-locale');
    require('bootstrap-table-cookie');

    var module = {

        init: function (selector) {

            var $tbl;

            if (typeof (selector) == 'undefined') {
                $tbl = $('table');
            }
            else
                $tbl = $('#' + selector);

                $tbl.bootstrapTable({
                    searchAlign: 'right',
                    cookieIdTable: selector + '.live.tbl',
                    cookie: true,
                    onPostBody: function (event) {
                        $('#loader').addClass("hide");
                        $tbl.removeClass("hide");
                    }
                });
        }
    };

    return module;
});


