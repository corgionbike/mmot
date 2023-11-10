define(function (require) {
    console.debug('Module user card start');
    var $ = require('jquery');

    var module = {
        init: function () {

            $('ul#user_action_btn').on('click', 'a', function (e) {
                if ($(this).data('is_ajax') == false){
                    return true;
                }
                e.preventDefault();
                var url = $(this).attr('href');
                //console.log(url);
                $.post({'url': url}).done(function (data) {
                    var $info = $('#main-modal').find("#modal-info").removeClass('hide');
                    $info.find("#modal-info-alert").text(data.status);
                })
                    .fail(function () {
                        $('#main-modal').find("#modal-error").removeClass('hide');
                    });
                $(this).attr("disabled", true);

            });

        }

    };

    return module;
});

