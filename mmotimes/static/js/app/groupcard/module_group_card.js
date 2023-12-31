define(function (require) {
    console.debug('Module group card start');
    var $ = require('jquery');

    var module = {
        init: function () {

            var btn_send_request = $('a#btn_send_request');
            var btn_join_group = $('a#btn_join_group');

            btn_join_group.on('click', function (e) {
                e.preventDefault();
                var url = $(this).attr('href');
                $.post({'url': url}).done(function (data) {
                        btn_join_group.text(data.status).removeClass('btn-primary').addClass(data.cls);
                    })
                    .fail(function () {
                        $('#main-modal').find("#modal-error").removeClass('hide');
                    });
                $(this).attr("disabled", true);

            });

        }

    };

    return module.init();
});
