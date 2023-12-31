define(function (require) {
    var $ = require('jquery');
    console.debug('Module invite key site start');

    var module = {

        init: function () {
            var btn = $('#get_key_btn');
            var url = btn.data('url');
            var label = $('#key_label');

            btn.on('click', function () {
                $.get({'url':url}).done(function (data) {
                    btn.fadeOut(function () {
                        this.remove();
                        label.text(data.key).fadeIn('slow');
                    })
                });
            });

        }

    };

    return module.init();
});