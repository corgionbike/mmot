define(function (require) {
    console.debug('Module ajax form start');

    var $ = require('jquery');

    var module = {

        $form: {},
        $block_err: $('#modal-error'),

        init: function (selector) {
            console.debug('Module ajax form init start');

            if (typeof (selector) == 'undefined') {
                selector = "#ajax-form";
            }
            var $form = $(selector);
            var url = $form.data('url');

            this.$form = $form;

            // отправка данных
            $form.submit(function (e) {

                var data = $(this).serialize();
                //console.log($(this));
                e.preventDefault();

                $.ajax({
                    type: "POST",
                    url: url,
                    processData: false,
                    data: data,
                    success: function (responce) {
                        //console.log(typeof (responce));
                        module.success(responce);
                    },
                    error: function () {
                        module.$block_err.removeClass('hide');
                    }
                });

            })

        },
        success: function (responce) {

            if (!$.isEmptyObject(responce)) {
                var obj = $.parseJSON(responce);
                //console.debug(obj);
                for (var key in obj) {
                    var element = module.$form.find('#id_' + key);
                    var elm = element.closest(".form-group").addClass('has-error');
                    if (elm.find(".help-block").length == 0) {
                        elm.append("<span class='help-block'>" + obj[key][0].message + "</span>");
                    }
                    if (key == "__all__")
                    {
                         module.$block_err.removeClass('hide');
                         module.$block_err.find("span").text(obj[key][0].message);
                    }

                    //console.log(obj[key].join());
                }
            }
            else {
                $('#main-modal').modal('hide');
                window.location.reload();
            }

        }
    };

    return module;
});