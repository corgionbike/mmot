define(function (require) {

    console.debug('Module bbcode editor start');

    var $ = require('jquery');
    var bbcode = require('bbcodes');
    var wbbOpt = {
            buttons: "bold,italic,|,removeFormat",
            hotkeys: false,
            resize_maxheight: 800,
        };

    var module = {
        init: function (selector, opt) {
            console.debug('Module bbcode init start');
            if (typeof (selector) == 'undefined'){
                selector = "#id_description";
            }
             if (typeof (opt) == 'undefined'){
                opt = wbbOpt;
            }

            var desc = $(selector);
            desc.removeAttr('required');
            desc.wysibb(opt);

           //console.debug(selector);
        }

    };

    return module;
});


