'use strict';

(function( $ ){
    $.extend($.fn, {
        srcset: function(){
          $('.controls input').keyup(function() {
            var input = $(this).val(),
                props = extractProps(input),
                img = buildImage();

            console.log(props);
            updateExample(img);
          });

          function buildImage() {
            return $('<img>', {
              src: 'http://derp.com',
              srcset: 'IMAGE 1024w',
              sizes: '(min-width: 36em)',
              alt: 'Linda Johnson'
            });
          }

          function extractProps(input) {
            console.log('Input: ' + input);
            return true;
          }

          function updateExample(img) {
            var code = img[0].outerHTML.replace('<', '&lt;').replace('>', '&gt;');

            $('code').html(code);
            if ($.isFunction(Prism)) {
              Prism.highlightElement($('code')[0]);
            }

            return true;
          }
        }
    });
})( jQuery );
