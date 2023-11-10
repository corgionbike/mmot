define(function (require) {
    console.debug('Module carousel start');

    var $ = require('jquery');
    require('bootstrap');

    var module = {

        init: function () {
             $(function () {

                 $(".transition-timer-carousel-progress-bar", this)
                     .addClass("animate").css("width", "100%");

                 $("#transition-timer-carousel").on("slide.bs.carousel", function (event) {
                     //The animate class gets removed so that it jumps straight back to 0%

                     $(".transition-timer-carousel-progress-bar", this)
                         .removeClass("animate").css("width", "0%");
                 }).on("slid.bs.carousel", function (event) {
                     //The slide transition finished, so re-add the animate class so that
                     //the timer bar takes time to fill up
                     $(".transition-timer-carousel-progress-bar", this)
                         .addClass("animate").css("width", "100%");
                 });
             })
        }
    };

    return module.init();
});


