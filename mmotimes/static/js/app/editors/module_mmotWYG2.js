define(function (require) {

    console.debug('Module mmotWYG editor start');

    var $ = require('jquery');
    var data = new FormData();
    var textarea, $edit, $block_preview,
        $preview_submit, $post_submit, $form, $btn_toolbar;

    var mmotWYG = {

        init: function (selector) {

            textarea = $('#' + selector)[0];
            $edit = $('#edit_submit_' + selector);
            $block_preview = $('#text_preview_' + selector);
            $preview_submit = $('#preview_submit_' + selector);
            $post_submit = $('#post_submit_' + selector);
            $btn_toolbar = $('#edit_btn_' + selector);
            mmotWYG.isInitEditor = true;
            mmotWYG.selector = selector;
        },

        isInitEditor: false,
        selector: "",

        insertTagWithText: function (link, tagName) {
            var startTag = '<' + tagName + '>';
            var endTag = '</' + tagName + '>';
            mmotWYG.insertTag(link, startTag, endTag);
            return false;
        },

        insertImage: function (link) {
            var src = prompt('Введите URL картинки', 'http://');
            if (src) {
                mmotWYG.insertTag(link, '<img src="' + src + '" alt="image"/>', '');
            }
            return false;
        },

        insertLink: function (link) {
            var href = prompt('Введите URL ссылки', 'http://');
            if (href) {
                mmotWYG.insertTag(link, '<a href="' + href + '" rel="nofollow">', '</a>');
            }
            return false;
        },

        insertTwitch: function (link) {
            var id = prompt('Введите ID записи', '');
            if (id) {
                mmotWYG.insertTag(link, '<twitch>' + id, '</twitch>');
            }
            return false;
        },

        insertYoutube: function (link) {
            var id = prompt('Введите ID записи', '');
            if (id) {
                mmotWYG.insertTag(link, '<youtube>' + id, '</youtube>');
            }
            return false;
        },

        insertHitbox: function (link) {
            var id = prompt('Введите ID записи', '');
            if (id) {
                mmotWYG.insertTag(link, '<hitbox>' + id, '</hitbox>');
            }
            return false;
        },

        insertCybergame: function (link) {
            var id = prompt('Введите ID записи', '');
            if (id) {
                mmotWYG.insertTag(link, '<cybergame>' + id, '</cybergame>');
            }
            return false;
        },

        insertCut: function (link) {
            mmotWYG.insertTag(link, '<!-- split -->', '');
            return false;
        },

        showPreview: function (link) {
            if (!mmotWYG.isInitEditor) {
                mmotWYG.initEditor(link);
            }
            var url = $(link).data('url');
            if ($(textarea).val()) {
                $(textarea).closest(".form-group").removeClass('has-error');
                // $(link).addClass('hidden');
                data.append('textarea', $(textarea).val());
                var preview = mmotWYG.sendBbcodeText(url, data);
                preview.done(function (response) {
                    $edit.removeClass('hidden');
                    $(textarea).addClass('hidden');
                    $btn_toolbar.addClass('hidden');
                    $block_preview.removeClass('hidden').html(response);
                });
            }
            else {
                $(textarea).closest(".form-group").addClass('has-error');
            }
            return false;
        },

        showEdit: function (link) {
            if (!mmotWYG.isInitEditor) {
                mmotWYG.initEditor(link);
            }
            // $preview_submit.removeClass('hidden');
            $(textarea).removeClass('hidden');
            $block_preview.addClass('hidden');
            $btn_toolbar.removeClass('hidden');
            // $(link).addClass('hidden');
            return false;
        },


        actionBtn: function (action) {
            if (action) {
                $post_submit.removeAttr('disabled');
                $preview_submit.removeAttr('disabled');
            }
            else {
                $post_submit.attr('disabled', 'disabled');
                $preview_submit.attr('disabled', 'disabled');
            }
        },

        sendBbcodeText: function (url, data) {
            var jqxhr = $.ajax({
                type: "POST",
                url: url,
                enctype: 'multipart/form-data',
                contentType: false,
                processData: false,
                data: data
            });
            return jqxhr;
        },

        insertTag: function (link, startTag, endTag, repObj) {
            if (!mmotWYG.isInitEditor) {
                mmotWYG.init(link);
            }
            textarea.focus();

            var scrtop = textarea.scrollTop;

            var cursorPos = mmotWYG.getCursor(textarea);
            var txt_pre = textarea.value.substring(0, cursorPos.start);
            var txt_sel = textarea.value.substring(cursorPos.start, cursorPos.end);
            var txt_aft = textarea.value.substring(cursorPos.end);

            mmotWYG.actionBtn(true);

            if (repObj) {
                txt_sel = txt_sel.replace(/\r/g, '');
                txt_sel = txt_sel != '' ? txt_sel : ' ';
                txt_sel = txt_sel.replace(new RegExp(repObj.findStr, 'gm'), repObj.repStr);
            }

            if (cursorPos.start == cursorPos.end) {
                var nuCursorPos = cursorPos.start + startTag.length;
            } else {
                var nuCursorPos = String(txt_pre + startTag + txt_sel + endTag).length;
            }

            textarea.value = txt_pre + startTag + txt_sel + endTag + txt_aft;

            mmotWYG.setCursor(textarea, nuCursorPos, nuCursorPos);

            if (scrtop) textarea.scrollTop = scrtop;

            return false;
        },

        insertTagFromDropBox: function (link) {
            mmotWYG.insertTagWithText(link, link.value);
            link.selectedIndex = 0;
        },

        insertList: function (link) {
            var startTag = '<' + 'ul' + '>\n';
            var endTag = '\n</' + 'ul' + '>';
            var repObj = {
                findStr: '^(.+)',
                repStr: '\t<li>$1</li>'
            };
            mmotWYG.insertTag(link, startTag, endTag, repObj);
            link.selectedIndex = 0;
            return false;
        },

        insertTab: function (e, textarea) {
            if (!e) e = window.event;
            if (e.keyCode) var keyCode = e.keyCode;
            else if (e.which) var keyCode = e.which;

            //alert(keyCode);
            switch (e.type) {
                case 'keydown':
                    if (keyCode == 16) {
                        mmotWYG.shift = true;
                        //alert('1');
                    }
                    break;

                case 'keyup':
                    if (keyCode == 16) {
                        mmotWYG.shift = false;
                        //alert('2');
                    }

                    break;
            }

            textarea.focus();
            var cursorPos = mmotWYG.getCursor(textarea);

            if (cursorPos.start == cursorPos.end) {
                return true;


            } else if (keyCode == 9 && !mmotWYG.shift) {
                var repObj = {
                    findStr: '^(.+)',
                    repStr: '\t$1'
                };
                mmotWYG.insertTag(textarea, '', '', repObj);
                return false;

            } else if (keyCode == 9 && mmotWYG.shift) {
                var repObj = {
                    findStr: '^\t(.+)',
                    repStr: '$1'
                }
                mmotWYG.insertTag(textarea, '', '', repObj);
                return false;
            }
        },

        getCursor: function (input) {
            var result = {start: 0, end: 0};
            if (input.setSelectionRange) {
                result.start = input.selectionStart;
                result.end = input.selectionEnd;
            } else if (!document.selection) {
                return false;
            } else if (document.selection && document.selection.createRange) {
                var range = document.selection.createRange();
                var stored_range = range.duplicate();
                stored_range.moveToElementText(input);
                stored_range.setEndPoint('EndToEnd', range);
                result.start = stored_range.text.length - range.text.length;
                result.end = result.start + range.text.length;
            }
            return result;
        },

        setCursor: function (textarea, start, end) {
            if (textarea.createTextRange) {
                var range = textarea.createTextRange();
                range.move("character", start);
                range.select();
            } else if (textarea.selectionStart) {
                textarea.setSelectionRange(start, end);
            }
        }

    };
    return mmotWYG
});
