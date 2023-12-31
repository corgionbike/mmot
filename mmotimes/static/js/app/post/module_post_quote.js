define(function (require) {

    console.debug('Module post quote start');

    var $ = require('jquery');
    var $textarea = $('textarea');
    
    var module = {
        init: function () {

            $('#post_list').on('click', 'a[id^="quote-post"]', function(e) {
                e.preventDefault();
                var url = $(this).attr('href');
                $.ajax({url: url}).done(function (response){
                    //console.debug(response);
                    $textarea.focus();
                    var body = $textarea.val();
                    $textarea.val(body + response + "\n");
                });

            });
        }

    };

    return module.init();
});


