// Helper function
var makeRequest = function (url, method, success, failure, always) {
	// Make sure a URL and method were provided
	if (!url || !method) return;

	// Set up our HTTP request
	var xhr = new XMLHttpRequest();

	// Setup our listener to process completed requests
	xhr.onload = function () {

		// Process our return data
		if (xhr.status >= 200 && xhr.status < 300) {
			// Run the success callback
			if (success && typeof success === 'function') {
				success(JSON.parse(xhr.responseText), xhr);
			}
		} else {
			// Run the failure callback
			if (failure && typeof failure === 'function') {
				failure(xhr);
			}
		}

		if (always && typeof always === 'function') {
			always(JSON.parse(xhr.responseText), xhr);
		}

	};

	// Create and send a request
	// Defaults to GET
	xhr.open(method, url);
	xhr.send();
};

/**
 * ChildNode.after() polyfill
 * Adapted from https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/after()/after().md
 * @author Chris Ferdinandi
 * @license MIT
 */
(function (elem) {

	// Check if element is a node
	// https://github.com/Financial-Times/polyfill-service
	var isNode = function (object) {

		// DOM, Level2
		if (typeof Node === 'function') {
			return object instanceof Node;
		}

		// Older browsers, check if it looks like a Node instance)
		return object &&
			typeof object === "object" &&
			object.nodeName &&
			object.nodeType >= 1 &&
			object.nodeType <= 12;

	};

	// Add after() method to prototype
	for (var i = 0; i < elem.length; i++) {
		if (!window[elem[i]] || 'after' in window[elem[i]].prototype) continue;
		window[elem[i]].prototype.after = function () {
			var argArr = Array.prototype.slice.call(arguments);
			var docFrag = document.createDocumentFragment();

			for (var n = 0; n < argArr.length; n++) {
				docFrag.appendChild(isNode(argArr[n]) ? argArr[n] : document.createTextNode(String(argArr[n])));
			}

			this.parentNode.insertBefore(docFrag, this.nextSibling);
		};
	}

})(['Element', 'CharacterData', 'DocumentType']);

/**
 * ChildNode.append() polyfill
 * https://gomakethings.com/adding-an-element-to-the-end-of-a-set-of-elements-with-vanilla-javascript/
 * @author Chris Ferdinandi
 * @license MIT
 */
(function (elem) {

	// Check if element is a node
	// https://github.com/Financial-Times/polyfill-service
	var isNode = function (object) {

		// DOM, Level2
		if (typeof Node === 'function') {
			return object instanceof Node;
		}

		// Older browsers, check if it looks like a Node instance)
		return object &&
			typeof object === "object" &&
			object.nodeName &&
			object.nodeType >= 1 &&
			object.nodeType <= 12;

	};

	// Add append() method to prototype
	for (var i = 0; i < elem.length; i++) {
		if (!window[elem[i]] || 'append' in window[elem[i]].prototype) continue;
		window[elem[i]].prototype.append = function () {
			var argArr = Array.prototype.slice.call(arguments);
			var docFrag = document.createDocumentFragment();

			for (var n = 0; n < argArr.length; n++) {
				docFrag.appendChild(isNode(argArr[n]) ? argArr[n] : document.createTextNode(String(argArr[n])));
			}

			this.appendChild(docFrag);
		};
	}

})(['Element', 'CharacterData', 'DocumentType']);