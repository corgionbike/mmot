define(function (require) {

    console.debug('Module notice start');

    var $ = require('jquery');
    var $notify_mark = $('li#notify_mark');
    var $notify_badge = $notify_mark.find('#live_notify_badge');
    var $bell = $notify_mark.find("span.fa-bell");


    var module = {

        del: function (self, slug, url) {
            $.post({"url": url});
            $('li#notice_block-' + slug).fadeOut('slow', function () {
                //console.debug(this);
                $(this).remove();
                module.modal_close_check();
            });
            var num_notice = Number($notify_badge.text());
            num_notice--;
            $notify_badge.text(num_notice);
            if (num_notice == 0){
                $bell.removeClass("text-danger animated infinite tada");
            }
            return true;

        },
        modal_close_check: function () {
            var count = $("li[id ^= notice_block]").length;
            //console.debug(count);
            if (count == 0) {
                $('#main-modal').modal('hide');
            }
            return false;
        },

        delete_all: function (self, url) {
            $.post({"url": url});
            $("ul#notice_list").fadeOut('slow', function () {
                $(this).remove();
                module.modal_close_check();
                $bell.removeClass("text-danger animated infinite tada");
                $notify_badge.text('0');
            });
            $(this).addClass('disabled');
            $("#btn_load_notices").hide();

            return true;

        },
        page_count: 2,
        load: function (self, num_pages, url) {
            //console.log(module.page_count);
            if (module.page_count > num_pages) {
                $(self).hide();
            }
            $.ajax({url: url + module.page_count + "/"}).done(function (data) {
                $("#notice_list").append(data);
            });
            if (module.page_count >= num_pages) {
                $(self).remove();
                module.page_count = 2
            }
            else {
                module.page_count++;
            }
            return false;
        }
    };

    return module;
});