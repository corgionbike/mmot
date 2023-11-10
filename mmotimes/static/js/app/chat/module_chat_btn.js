define(function (require) {
    console.debug('Module chat btn start');

    var $ = require('jquery');

    var module = {

        init: function () {

            $('#btn_hide_chat').on('click', function (events) {
                $('#collapseChat').slideUp(function(){
                   $('#btn_show_chat').show();
                });
                $(this).hide();

            });
            $('#btn_show_chat').on('click', function (events) {
                $('#collapseChat').slideDown(function(){
                    $('#btn_hide_chat').show();
                });
                $(this).hide();
            })

        }
    };

    return module.init();
});

