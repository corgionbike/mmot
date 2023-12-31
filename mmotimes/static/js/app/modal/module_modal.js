define(function (require) {
    console.debug('Module modal start');
    var $ = require('jquery');

    var module = {

        init: function () {

            var $modal = $('#main-modal');
            var content = $modal.find('#modal-content');

            $modal.on('show.bs.modal', function (event) {
                var target = $(event.relatedTarget),
                    url = target.data('url'),
                    uid = target.data('uid'),
                    title = target.data('title'),
                    img_src = target.data('img');

                if (img_src)
                {
                    // console.debug($img);
                    content.html('<img src="' + img_src + '">');
                    $modal.find('.modal-title').text(title);
                }

                $modal.find('#modal-error').addClass('hide');
                $modal.find('#modal-info').addClass('hide');
                $modal.find('.modal-dialog').attr("id", uid);

                if (url) {
                    module.getData(url).done(function (response) {

                        if (typeof(title) == "undefined") {
                            title = target.text();
                        }
                        $modal.find('.modal-title').text(title);

                        if (typeof(response.body) !== "undefined") {
                            content.html(response.body);
                        }
                        else {
                            content.html(response);
                            $('[data-toggle="tooltip"]').tooltip();
                        }

                    }).fail(function () {
                        $modal.find('#modal-error').removeClass('hide');
                    });
                }
            });
            $modal.on('hide.bs.modal', function () {
                $modal.find('.modal-title').html("<i class='fa fa-circle-o-notch fa-spin'></i>");
                $modal.find('#modal-content').empty();
            });

        },

        getData: function (url) {
            return $.ajax({url: url});
        }
    };

    return module.init();

});
