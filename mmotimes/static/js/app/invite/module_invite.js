define(function (require) {
    var $ = require('jquery');
    console.debug('Module invite start');

    var module = {

        call: function (obj, id, url, state) {
            $.post({"url":url}).done(function (data) {
                var $info = $('#main-modal').find("#modal-info").removeClass('hide');
                $info.find("#modal-info-alert").text(data.status);
                var parent = $(obj).parent().parent().hide();
            });
            // if (!state) {
            //     $("li#invite_block-" + id).fadeOut('slow', function () {
            //         $(this).remove();
            //         module.modal_close_check();
            //     });
            // }
        },
        modal_close_check: function () {
            var count = $("li[id ^= invite_block]").length;
            if (count == 0) {
                $('#main-modal').modal('hide');
            }
        },
        page_count: 2,
        load: function (obj, num_pages, url) {
            if (module.page_count > num_pages) {
                $(obj).hide();
            }
            $.ajax({url: url + module.page_count + "/"}).done(function (data) {
                $("#invite_list").show('slow').append(data);
            });
            if (module.page_count >= num_pages) {
                $(obj).remove();
                module.page_count = 2
            }
            else {
                module.page_count++;
            }

        }
    };

    return module;
});
