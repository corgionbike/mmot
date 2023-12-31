define(function (require) {
    console.debug('Module team counter start');
    var $ = require('jquery');
    var count_red = $('span#count_red');
    var count_blue = $('span#count_blue');

    var module = {

        init: function (url, time) {

            setInterval(function () {

                $.post({'url':url}).done(function (data) {
                        count_red.text(data.count_red);
                        count_blue.text(data.count_blue);
                    })
                    .fail(function () {
                        count_red.text('E');
                        count_blue.text('E');
                    });

            }, time);

        },
        call: function (obj, url) {

            $.post({'url':url}).done(function (data) {
                    count_red.text(data.count_red);
                    count_blue.text(data.count_blue);
                })
                .fail(function () {
                    count_red.text('E');
                    count_blue.text('E');
                });
        }

    };

    return module;
});


