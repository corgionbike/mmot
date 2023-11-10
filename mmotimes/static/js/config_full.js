require.config({
    shim : {
        "bootstrap": {"deps": ['jquery']},
        "bootstrap-table": {"deps": ['jquery']},
        "bootstrap-table-locale": {"deps": ['bootstrap-table']},
        "bootstrap-table-cookie": {"deps": ['bootstrap-table']},
        "datepicker": {"deps": ['jquery']},
    },
    paths: {
        //библиотеки
        "jquery": "lib/jquery/jquery-1.12.3.min",
        // "jquery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min",
        "jquery-cookie": "lib/jquery/jquery.cookie",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "bootstrap-table": "lib/bootstrap-table/js/bootstrap-table.min",
        "bootstrap-table-locale": "lib/bootstrap-table/js/locale/bootstrap-table-ru-RU.min",
        "bootstrap-table-cookie": "lib/bootstrap-table/js/extensions/cookie/bootstrap-table-cookie.min",
        "pace": "lib/pace/pace.min",
        "datepicker": "lib/datepicker/js/datepicker.min",
        "select2": "lib/select2/js/select2.full.min",
        "scrollbar": "lib/scrollbar/jquery.nicescroll.min",

        //модули
        'module_modal': 'app/modal/module_modal',
        'module_invite': 'app/invite/module_invite',
        'module_invite_key_site': 'app/invite/module_invite_key_site',
        'module_notice': 'app/notification/module_notice',
        'module_user_card': 'app/usercard/module_user_card',
        'module_group_card': 'app/groupcard/module_group_card',
        'module_progress_bar': 'app/progress_bar/module_progress_bar',
        'module_team_counter': 'app/team_counter/module_team_counter',
        'module_ajax_setup': 'app/ajax_setup/module_ajax_setup',
        'module_bootstrap_tbl': 'app/bootstrap_tbl/module_bootstrap_tbl',
        'module_chat_btn': 'app/chat/module_chat_btn',
        'module_carousel': 'app/carousel/module_carousel',
        'module_mmot_editor': 'app/editors/module_mmotWYG',
        'module_mmot_html_editor': 'app/editors/module_mmotWYG2',
        'module_form_ajax': 'app/form_ajax/module_form_ajax',
        'module_paginator': 'app/paginator/module_paginator',
        'module_post_quote': 'app/post/module_post_quote',
        'module_form_preview_ajax': 'app/form_ajax/module_form_preview_ajax',
        'module_ya_metrika': 'app/yandex/module_ya_metrika',
        "module_datepicker": "app/datepicker/module_datepicker",
        "module_select2": "app/select2/module_select2",
        "module_agent_check": "app/check_agent/module_agent_check",

    },

});