define(['jquery', 'pace', 'scrollbar', 'module_ajax_setup', 'module_modal', 'bootstrap', 'module_ya_metrika'], function($, pace) {

    $("body").niceScroll();

    $(function () {
        pace.start({
            document: false,
            elements: false,
            ajax: false,
        });

        $('[data-toggle="tooltip"]').tooltip();

        var $navbar = $(".navbar");

        $(window).scroll(function () {
            $navbar.offset().top > 10 ? $navbar.removeClass("navbar-remove-shadow") : $navbar.addClass("navbar-remove-shadow");
        });

        if ($navbar.offset().top > 10) {
            $navbar.removeClass("navbar-remove-shadow");
        }

    });

});

