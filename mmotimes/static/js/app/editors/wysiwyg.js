/*
 habraWYG - простой визивиг
 */

(function(){

  function isMarkdown() {
    return $('#markdown, #comment_markdown').is(':checked');
  }

  habraWYG = {

    insertTagWithText: function (link, tagName) {
      if (isMarkdown() && tagName === 'b') return habraWYG.insertTag(link, '**', '**')
      if (isMarkdown() && tagName === 'i') return habraWYG.insertTag(link, '*', '*')
      if (isMarkdown() && tagName === 's') return habraWYG.insertTag(link, '~~', '~~')
      if (isMarkdown() && tagName === 'h2') return habraWYG.insertTag(link, '## ', '')
      if (isMarkdown() && tagName === 'h3') return habraWYG.insertTag(link, '### ', '')
      if (isMarkdown() && tagName === 'h4') return habraWYG.insertTag(link, '#### ', '')
      if (isMarkdown() && tagName === 'blockquote') return habraWYG.insertTag(link, '> ', '')

      var startTag = '<' + tagName + '>';
      var endTag = '</' + tagName + '>';
      habraWYG.insertTag(link, startTag, endTag);
      return false;
    },

    insertTagWithLatex: function (link, tagName) {
      var startTag = tagName;
      var endTag = tagName;
      habraWYG.insertTag(link, startTag, endTag);
      return false;
    },

    insertImage: function (link) {
      var src = prompt('Введите src картинки', 'http://');
      if (src) {
        if (isMarkdown()) return habraWYG.insertTag(link, '![image', '](' + src + ')');
        habraWYG.insertTag(link, '<img src="' + src + '" alt="image"/>', '');
      }
      return false;
    },

    insertLink: function (link) {
      var href = prompt('Введите URL ссылки', 'http://');
      if (href) {
        if (isMarkdown()) return habraWYG.insertTag(link, '[', '](' + href + ')')
        habraWYG.insertTag(link, '<a href="' + href + '">', '</a>');
      }
      return false;
    },

    insertSpoiler: function (link) {
      habraWYG.insertTag(link, '<spoiler title="Заголовок спойлера">\n', '\n</spoiler>');
      return false;
    },

    insertUser: function (link) {
      var login = prompt('Введите никнейм пользователя', '');
      if (login) {
        habraWYG.insertTag(link, '@' + login + '', '');
      }
      return false;
    },

    insertHabracut: function (link) {
      habraWYG.insertTag(link, '<cut />', '');
      return false;
    },

    insertTag: function (link, startTag, endTag, repObj) {
      var textareaParent = $(link).parents('.editor');
      var textarea = $('textarea', textareaParent).get(0);

      textarea.focus();

      var scrtop = textarea.scrollTop;
      var cursorPos = habraWYG.getCursor(textarea);
      var txt_pre = textarea.value.substring(0, cursorPos.start);
      var txt_sel = textarea.value.substring(cursorPos.start, cursorPos.end);
      var txt_aft = textarea.value.substring(cursorPos.end);

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

      habraWYG.setCursor(textarea, nuCursorPos, nuCursorPos);

      if (scrtop) textarea.scrollTop = scrtop;

      $('textarea', textareaParent).trigger('change');

      return false;
    },

    insertTagFromDropBox: function (link) {
      habraWYG.insertTagWithText(link, link.value);
      link.selectedIndex = 0;
    },

    insertList: function (link) {
      var startTag = '<' + link.value + '>\n';
      var endTag = '\n</' + link.value + '>';
      var repObj = {
        findStr: '^(.+)',
        repStr: '\t<li>$1</li>'
      };

      if (isMarkdown() && link.value === 'ul') {
        repObj = {
          findStr: '^(.+)',
          repStr: '- $1'
        };
        startTag = '';
        endTag = '';
      }

      if (isMarkdown() && link.value === 'ol') {
        repObj = {
          findStr: '^(.+)',
          repStr: '1. $1'
        };
        startTag = '';
        endTag = '';
      }

      habraWYG.insertTag(link, startTag, endTag, repObj);

      link.selectedIndex = 0;
    },

    insertSource: function (select) {
      if (select.value === 'code') {
        var startTag = '<code>\n';
        var endTag = '\n</code>';
        if (isMarkdown()) habraWYG.insertTag(select, '`', '`');
        else habraWYG.insertTag(select, startTag, endTag);
        select.selectedIndex = 0;
      } else {
        var startTag = '<source lang="' + select.value + '">\n';
        var endTag = '\n</source>';
        if (isMarkdown()) habraWYG.insertTag(select, '```' + select.value + '\n', '\n```');
        else habraWYG.insertTag(select, startTag, endTag);
        select.selectedIndex = 0;
      }
    },

    insertTab: function (e, textarea) {
      if (!e) e = window.event;
      if (e.keyCode) var keyCode = e.keyCode;
      else if (e.which) var keyCode = e.which;

      //alert(keyCode);
      switch (e.type) {
        case 'keydown':
          if (keyCode == 16) {
            habraWYG.shift = true;
          }
          break;

        case 'keyup':
          if (keyCode == 16) {
            habraWYG.shift = false;
          }
          break;
      }

      textarea.focus();
      var cursorPos = habraWYG.getCursor(textarea);

      if (cursorPos.start == cursorPos.end) {
        return true;


      } else if (keyCode == 9 && !habraWYG.shift) {
        var repObj = {
          findStr: '^(.+)',
          repStr: '\t$1'
        };
        habraWYG.insertTag(textarea, '', '', repObj);
        return false;

      } else if (keyCode == 9 && habraWYG.shift) {
        var repObj = {
          findStr: '^\t(.+)',
          repStr: '$1'
        };
        habraWYG.insertTag(textarea, '', '', repObj);
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
    },

    insertLatex: function (textarea, tagName) {
      if (textarea.value != ''){
        var startTag = endTag = tagName;
        habraWYG.insertTag(link, startTag + textarea.value, endTag);
      }
      return false;
    }

  }

})();

/*
 habraWYG2 - НЕпростой визивиг
 */

(function(){
  function isMarkdown() {
    return  (document.getElementById('mdCheck').checked);
  }

  function closeDropDown(dropdownBtn) {
    if (/\bhas-nested/.test(dropdownBtn.parentNode.className)){
      dropdownBtn.classList.remove('btn_active');
      dropdownBtn.setAttribute('aria-expanded', false);
      dropdownBtn.parentNode.classList.remove('dropdown_active');
    }
  }

  habraWYG2 = {
    insertTagWithText: function (button, tagName) {
      if (isMarkdown() && tagName === 'b') return habraWYG2.insertTag(button, '**', '**')
      if (isMarkdown() && tagName === 'i') return habraWYG2.insertTag(button, '*', '*')
      if (isMarkdown() && tagName === 's') return habraWYG2.insertTag(button, '~~', '~~')
      if (isMarkdown() && tagName === 'h2') return habraWYG2.insertTag(button, '## ', '')
      if (isMarkdown() && tagName === 'h3') return habraWYG2.insertTag(button, '### ', '')
      if (isMarkdown() && tagName === 'h4') return habraWYG2.insertTag(button, '#### ', '')
      if (isMarkdown() && tagName === 'blockquote') return habraWYG2.insertTag(button, '> ', '')

      var startTag = '<' + tagName + '>';
      var endTag = '</' + tagName + '>';
      habraWYG2.insertTag(button, startTag, endTag);

    },

    insertTagWithLatex: function (button, tagName) {
      var startTag = tagName;
      var endTag = tagName;
      habraWYG2.insertTag(button, startTag, endTag);
    },

    insertImage: function (button) {
      var src = prompt('Введите src картинки', 'http://');
      if (src) {
        if (isMarkdown()) return habraWYG2.insertTag(button, '![image', '](' + src + ')');
        habraWYG2.insertTag(button, '<img src="' + src + '" alt="image"/>', '');
      }
      return false;
    },

    insertLink: function (button) {
      var href = prompt('Введите URL ссылки', 'http://');
      if (href) {
        if (isMarkdown()) return habraWYG2.insertTag(button, '[', '](' + href + ')')
        habraWYG2.insertTag(button, '<a href="' + href + '">', '</a>');
      }
      return false;
    },

    insertSpoiler: function (button) {
      habraWYG2.insertTag(button, '<spoiler title="Заголовок спойлера">\n', '\n</spoiler>');
      return false;
    },

    insertUser: function (button) {
      var login = prompt('Введите никнейм пользователя', '');
      if (login) {
        habraWYG2.insertTag(button, '@' + login + '', '');
      }
      return false;
    },

    insertHabracut: function (button) {
      habraWYG2.insertTag(button, '<cut />', '');
      return false;
    },

    insertTag: function (button, startTag, endTag, repObj) {
      var button = button || null;
      if (button) {
        var dropdownWrapper = button.parentNode.parentNode.parentNode;
        var dropdownBtn = dropdownWrapper.getElementsByTagName("button")[0];
        closeDropDown(dropdownBtn);
        console.log(button);
      }

      var editorTextarea = document.getElementById('text_textarea');

      editorTextarea.focus();

      var scrtop = editorTextarea.scrollTop;
      var cursorPos = habraWYG2.getCursor(editorTextarea);
      var txt_pre = editorTextarea.value.substring(0, cursorPos.start);
      var txt_sel = editorTextarea.value.substring(cursorPos.start, cursorPos.end);
      var txt_aft = editorTextarea.value.substring(cursorPos.end);

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

      editorTextarea.value = txt_pre + startTag + txt_sel + endTag + txt_aft;

      habraWYG2.setCursor(editorTextarea, nuCursorPos, nuCursorPos);

      if (scrtop) editorTextarea.scrollTop = scrtop;



      // $('textarea', textareaParent).trigger('change');
      return false;
    },

    insertTagFromDropBox: function (button) {
      habraWYG2.insertTagWithText(button, button.value);
      button.selectedIndex = 0;
    },

    insertList: function (button, tagName) {
      var startTag = '<' + tagName + '>\n';
      var endTag = '\n</' + tagName + '>';
      var repObj = {
        findStr: '^(.+)',
        repStr: '\t<li>$1</li>'
      };

      if (isMarkdown() && tagName === 'ul') {
        repObj = {
          findStr: '^(.+)',
          repStr: '- $1'
        };
        startTag = '';
        endTag = '';
      }

      if (isMarkdown() && tagName === 'ol') {
        repObj = {
          findStr: '^(.+)',
          repStr: '1. $1'
        };
        startTag = '';
        endTag = '';
      }

      habraWYG2.insertTag(button, startTag, endTag, repObj);
      button.selectedIndex = 0;
    },

    insertSource: function (button) {
      var that = this;
      var item = document.getElementById('list-languages');
      var ul = document.createElement('ul');
      ul.className = "list-languages";
      var code = document.createElement('li');

      code.className = 'list-languages__item';
      code.appendChild(document.createTextNode('Code'));

      code.onclick = function(event) {
        event.preventDefault();
        if (document.getElementById('mdCheck').checked) {
          habraWYG2.insertTag(button, '```', '```');
        } else {
          habraWYG2.insertTag(button, '<code>', '</code>');
        }
        closeDropDown(button);
      };

      ul.appendChild(code);

      var array = hljs.listLanguages();
      array.sort();

      //Create and append the options
      for (var i = 0; i < array.length; i++) {
        var listItem = document.createElement('li');
        listItem.className = 'list-languages__item'
        listItem.setAttribute('data-lang', array[i]);
        listItem.appendChild(document.createTextNode(array[i]));
        ul.appendChild(listItem);

        listItem.onclick = function(event) {
          event.preventDefault();
          var lang = event.target.getAttribute('data-lang');
          getCodeBlock(lang);
          closeDropDown(button);
        };
      };

      item.appendChild(ul);

      function getCodeBlock(lang) {
        if (document.getElementById('mdCheck').checked) {
          habraWYG2.insertTag(button, '```' + lang + '\n', '\n```');
        } else {
          habraWYG2.insertTag(button, '<source lang="' + lang + '">', '</source>');
        }
      }

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
            habraWYG2.shift = true;
          }
          break;

        case 'keyup':
          if (keyCode == 16) {
            habraWYG2.shift = false;
          }
          break;
      }

      textarea.focus();
      var cursorPos = habraWYG2.getCursor(textarea);

      if (cursorPos.start == cursorPos.end) {
        return true;


      } else if (keyCode == 9 && !habraWYG2.shift) {
        var repObj = {
          findStr: '^(.+)',
          repStr: '\t$1'
        };
        habraWYG2.insertTag(textarea, '', '', repObj);
        return false;

      } else if (keyCode == 9 && habraWYG2.shift) {
        var repObj = {
          findStr: '^\t(.+)',
          repStr: '$1'
        };
        habraWYG2.insertTag(textarea, '', '', repObj);
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
  }

})();
