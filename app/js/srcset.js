'use strict';

(function( $ ){
    $.extend($.fn, {
        /**
         * srcset.js — responsive image tag generator
         *
         * @author Chris Vogt [mail@chrisvogt.me]
         * @link https://github.com/chrisvogt/cdn-srcset-generator
         * @license MIT
         */
        srcset: function(){
          var patterns = getPatterns(),
              input    = '',
              sizes    = getSizes(),
              $img      = '';

          $('.controls input').change(function() {
            input = $(this).val();

            if (validateInput(input)) {
              $img = buildImage(input);
              updateExample($img);
            }
          });

          /**
           * Builds image element.
           *
           * @param {String} Path to image source
           * @returns {Object}
           */
          function buildImage(path) {
            var $img = $('<img>', {
              src: path
            });

            if (sizes) {
              $img.attr('srcset', buildSrcset(sizes));
            }

            $img.attr('alt', 'ALT DESC');

            return $img;
          }

          /**
           * Attempts to verify host by path.
           *
           * @param {String}
           * @returns {Boolean}
           */
          function validateInput(input) {
            if (input.match(patterns.cloudinary)) {
              return 'cloudinary';
            } else {
              return false;
            }
          }

          /**
           * Updates the rendered and highlighted code.
           *
           * @param {Object} jQuery image element
           * @returns {Boolean}
           */
          function updateExample(img) {
            var htmlString = formatNewCode(img[0]),
                $codeEl = $('code');

            //htmlString = htmlString.substr(0, 12) + '<br>' + htmlString.substr(12);
            htmlString = htmlString
                .replace('srcset', '\n\t&nbsp;srcset')
                .replace('alt', '\n\t&nbsp;alt')
                .replace(/.(jpg|png),/g, ',\n\t\t\t&nbsp;');

            $codeEl.html(htmlString);

            if (typeof Prism !== 'undefined') {
              Prism.highlightElement($codeEl[0]);
            }

            return true;
          }

          /**
           * Sanitizes code to be rendered.
           *
           * @param {Object}
           * @returns {String}
           */
          function formatNewCode(string) {
            var formatted = string.outerHTML
                  .replace('<', '&lt;')
                  .replace('>', '&gt;');

            return formatted;
          }

          /**
           * Generates a set of source files.
           *
           * @param {Array}
           * @returns {Array}
           */
          function buildSrcset(sizes) {
            var set = [];

            if (validateInput(input) === 'cloudinary') {
              var re = new RegExp('upload/'),
                  idx = input.search(re) + 7;

              for (var i = 0; i < sizes.length; i++) {
                var s = 'c_scale%2Cw_' + sizes[i];
                set.push(input.substr(0, idx) +
                  s + '/' + input.substr(idx));
              }
            }

            return set.join();
          }

          /**
           * Gets a list of breakpoints.
           *
           * @returns {Array}
           */
          function getSizes() {
            return [2000, 1024, 640, 320];
          }

          /**
           * Supported providers and their RegEx patterns.
           *
           * @returns {Object}
           */
          function getPatterns() {
            return {
              'cloudinary': new RegExp('^(http|https):\/\/res.cloudinary.com.*\.(jpg|png)$')
            };
          }
        }
    });
})( jQuery );
