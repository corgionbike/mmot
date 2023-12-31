define(function (require) {
    console.debug('Module progress bar start');
    var $ = require('jquery');

    var module = {

        init: function (time, selector) {
            var progress_bar = $(selector);
            var d = $(progress_bar).data('progress');
            //console.debug(d);
            var start_ts = new Date(d.start_year, d.start_month  - 1, d.start_day, d.start_hour, d.start_minute);
            var end_ts = new Date(d.end_year, d.end_month  - 1, d.end_day, d.end_hour, d.end_minute);
            var duration = end_ts - start_ts;
            setInterval(function () {
                var now = new Date;
                var utc_timestamp = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
                    now.getUTCHours(), now.getUTCMinutes());
                var delta = end_ts - utc_timestamp;
                var progress = (100 - (delta * 100) / duration);
                if (delta < 0) {
                    progress = 100;
                }
                if (progress < 0) {
                    progress = 0
                }
                var str_progress = Math.round(progress).toString() + '%';
                progress_bar.attr('aria-valuenow', Math.round(progress))
                    .width(str_progress).text(str_progress);
            }, time);

        },
        calc_progress: function (time, selector) {
            var $elems = $('span[id ^= "' + selector + '"]');
                $elems.each(function (indx, element) {
                    var d = $(element).data('progress');
                    var start_ts = new Date(d.start_year, d.start_month  - 1, d.start_day, d.start_hour, d.start_minute);
                    var end_ts = new Date(d.end_year, d.end_month  - 1, d.end_day, d.end_hour, d.end_minute);
                    var duration = end_ts - start_ts;
                    setInterval(function () {
                        var now = new Date;


                        var utc_timestamp = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
                                                    now.getUTCHours(), now.getUTCMinutes());
                        var delta = end_ts - utc_timestamp;
                        var progress = (100 - (delta * 100) / duration);
                        if (delta < 0) {
                            progress = 100;
                        }
                        if (progress < 0) {
                            progress = 0
                        }
                        var str_progress = Math.round(progress).toString() + '%';
                        $(element).fadeToggle(function () {
                            $(this).text(str_progress);
                            $(this).fadeToggle();
                        });

                    }, time);
                });

        },
    };

    return module;
});

