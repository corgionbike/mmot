define(function(require) {
    console.debug('Module ajax form preview start');

    var $ = require('jquery');

    var module = {

        $form: {},

        init: function() {

            console.debug('Module ajax form preview init start');

            var data = new FormData();
            
            var $form = $('.editor').find('form');
            
            var url = $form.data('preview-url');
            var $block_preview = $form.find('#text_preview');
            var $post_submit = $form.find('#post_submit');
            var $preview_submit = $form.find('#preview_submit');
            var $edit_submit = $form.find('#edit_submit');
            var $body = $form.find('textarea');
            var $faq_bbcodes_link = $form.find('#faq_bbcodes_link');
            this.$form = $form;

            $post_submit.attr('disabled', 'disabled');
            $preview_submit.attr('disabled', 'disabled');

            $body.on('keypress keyup', function(){

                var count = $(this).context.textLength;
                //console.debug(count);
                if (count == 0){
                    $post_submit.attr('disabled', 'disabled');
                    $preview_submit.attr('disabled', 'disabled');
                }
                else{
                    $post_submit.removeAttr('disabled');
                    $preview_submit.removeAttr('disabled');
                }
            });

            $post_submit.on('click', function () {

                $(this).attr('disabled', 'disabled');
                $preview_submit.attr('disabled', 'disabled');
                $edit_submit.attr('disabled', 'disabled');
                $form.submit();
            });

            $edit_submit.on('click', function(e){
                e.preventDefault();
                $(this).addClass('hidden');
                $preview_submit.removeClass('hidden');
                $body.removeClass('hidden');
                $block_preview.addClass('hidden');
                $faq_bbcodes_link.removeClass('hidden');
            });

            // отправка данных
            $preview_submit.on('click', function(e) {

                e.preventDefault();
                data.append('body', $body.val());
                $(this).addClass('hidden');
                $block_preview.removeClass('hidden');
                $edit_submit.removeClass('hidden');
                $body.addClass('hidden');
                $faq_bbcodes_link.addClass('hidden');

                $.ajax({
                    type: "POST",
                    url: url,
                    enctype: 'multipart/form-data',
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function(responce) {
                        //console.log(typeof (responce));
                        $block_preview.html(responce);
                    },
                    error: function() {
                        $block_preview.text('Error404');
                    }
                });

            })

        },

    }

    return module.init();
});