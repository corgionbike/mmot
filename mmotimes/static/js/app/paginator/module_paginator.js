define(function (require) {

    console.debug('Module paginator start');

    var $ = require('jquery');


    function setPage(num_page) {

        var $paginator = $("ul.pagination");
        $paginator.find("li.active").removeClass('active');
        $paginator.find("a:contains('" + num_page + "')").parents("li").addClass('active');
        return false;

    }

    var module = {

        page_count: 1,
        num_page: 0,
        load: function (obj, num_pages, url, page, selector) {
            //console.log(module.page_count);
            if (page >= num_pages) {
                $(obj).remove();
                return false;
            }
            module.num_page = module.page_count + Number(page);

            $.ajax({url: url + "?page=" + module.num_page }).done(function (data) {
                $(selector).append(data);
                setPage(module.num_page);
                $('[data-toggle="tooltip"]').tooltip();
            });
            if (module.num_page >= num_pages) {
                $(obj).remove();
                return false;
            }
            else {
                module.page_count++;

            }

        }
    };

    return module;
});


