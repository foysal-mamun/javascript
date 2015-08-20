
/*!
 * lifoModal @1.0
 * https://github.com/foysal-mamun
 *
 * Copyright foysal.mamun
 * Released under the MIT license.
 * hhttps://github.com/foysal-mamun/javascript/LICENSE.md
 */

//>>label: lifoModal
//>>group: libs
//>>description: Displays customizable modal window.
//>>docs: https://github.com/foysal-mamun/javascript
//>>demos: ../demo.html
//>>css: ../css/style.css

(function() {

	var modal = (function() {

		// settings options
		var options = {},

        modalBox    = null,
        okButton    = null,
        closeButton = null;


        /**
		 * Initialize modal
		 * @param {Object} configOption - overwrite modal settings
		 * @param {Function} onOk - callback function on click ok button
		 * @param {Function} onClose - callback function on click close button
		 */
		var init = function(configOptoins, onOk, onClose) {

			// remove if modal elements already exists 
			var oldBox = document.getElementById('lifomodal');
			oldBox && document.body.removeChild(oldBox);
			
			// reassign settings options
			options       = getDefaultOptions();
			configOptoins = configOptoins || {};
			for(var key in configOptoins) {
                options[key] = configOptoins[key];
            }

            // set ok, close callback functions
            options.onOk    = (typeof onOk    === 'function') ? onOk    : options.onOk;
            options.onClose = (typeof onClose === 'function') ? onClose : options.onClose;

            // create modal ui
            build();

		};

		/**
		 * Populate default settings option
		 * @return {Object} options
		 */
		var getDefaultOptions = function() {
			
			return {
	            title:       '',
	            onOk:        null,
	            onClose:     null,
	            bodyText:    '',
	            okText:      'Ok',
	            closeText:   'Cancel',
	            okButton:    true,
	            closeButton: true,
	            modalWidth:  '480px'
	        };

		};

		/**
		 * Build modal window ui
		 */
		var build = function() {
			
			modalBox    = createElement('div',    '', '', 'lifomodal');
            
            var overlay = createElement('div',    'overlay');
            content     = createElement('div',    'content'),
		    title       = createElement('h3',     'title', options.title),
		    body        = createElement('div',    'body', options.bodyText),
		    action      = createElement('div',    'action');
		    
		    if(options.okButton) {

		    	okButton    = createElement('button', 'ok',    options.okText);
		    	action.appendChild(okButton);
		    	okButton.addEventListener('click', ok);

		    }
		    if(options.closeButton) {

		    	closeButton = createElement('button', 'close', options.closeText);
		    	action.appendChild(closeButton);
		    	closeButton.addEventListener('click', close);

		    }

			content.appendChild(title);
			content.appendChild(body);
			content.appendChild(action);

			content.style.maxWidth = options.modalWidth;

			modalBox.appendChild(overlay);
			modalBox.appendChild(content);

		};

		/**
		* Display modal
		*/
		var open = function() { 

			document.body.appendChild(modalBox);
            modalBox.style.display = 'block';

		};

		/**
		* Remove all modal related listeneres and elements
		*/
		var destroy = function() {
			options.closeButton && closeButton.removeEventListener('click', close);
			options.okButton    && okButton   .removeEventListener('click', ok);

			document.body.removeChild(modalBox);
		};

		/**
		* Ok button event listener
		*/
		var ok = function() {

			destroy();
			options.onOk && options.onOk();

		};

		/**
		*  Close button event listener
		*/
		var close = function() {

			destroy();
			options.onClose && options.onClose();

		};

		/**
		* Create HTML element
		* @param {String} tag - tag name
		* @param {String} clas - tag class
		* @param {String} text - tag html
		* @param {String} id - tag id
		* @return {Element object} element
		*/
		var createElement = function(tag, clas, text, id) {

			var element = document.createElement(tag);
			element.setAttribute('id',    id   || '');
			element.setAttribute('class', clas || '');

			var textNode = document.createTextNode(text || '');
			element.appendChild(textNode);

			return element;

		};

		return {
			init:  init,
			open:  open,
			close: close,
		};

	})();

	// Create modal library "lifoModal"
	window.lifoModal = function(options, onOk, onClose) {
		modal.init(options, onOk, onClose);
		return modal;
	};

	// Overriding alert() funciton
	if(document.getElementById) {
		window.alert = function(txt) {
			
			lifoModal(
        		{ 
        			bodyText: txt,
        			closeButton: false,
        		}
        	).open();

		}
	}
	

})();

