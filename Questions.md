# Question from Course

1. From the XHR Helper function - how does it Default to GET?

// Create and send a request
// Defaults to GET
xhr.open(method, url);
xhr.send();

2. Explain a little more about the asynch (the last parameter - true)

// Setup out HTTP request
xhr.open('GET', url. true);

3. Preventing cross-site scripting attacks when using innerHTML

How does converting it back and forth prevent it?
var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};