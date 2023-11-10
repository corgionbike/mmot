define(function (require) {
    console.debug('Module typeahead start');

    var $ = require('jquery');
    require('bootstrap-tagsinput');
    require('bloodhound');
    require('bootstrap3-typeahead');



    var module = {

        init: function (selector, url, options) {


            var engine  = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                      url: url,
                      wildcard: '%QUERY',
                      transform: function (response) {
                          console.debug(response.tags);
                          return response.tags;

                      }
                },
            });
            engine.initialize();

            var opt = {
                source: engine.ttAdapter()
            };

            if (typeof (options) == 'undefined') {
                options = opt;
            };

            $(selector).typeahead(opt);

        },
    };

    return module;
});