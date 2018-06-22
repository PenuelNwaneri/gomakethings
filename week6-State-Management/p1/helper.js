/**
 * Render a template into the DOM
 * @param  {String|Function} template The template to render
 * @param  {String|Node}     elem     The element to render into
 * @return {[type]}                   The element
 */
var render = function (template, elem) {

    // Set rendering element for the component
    if (typeof template === 'function') {
        template.elem = elem;
    }

    // If elem is an element, use it.
    // If it's a selector, get it.
    elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
    if (!elem) return;

    // Get the template
    template = (typeof template === 'function' ? template(template.state) : template);
    if (typeof template !== 'string') return;

    // Render the template into the element
    if (elem.innerHTML === template) return;
    elem.innerHTML = template;

    // Return the elem for use elsewhere
    return elem;

};

/**
 * Create a component
 * @param  {Function}       template  The template function
 * @param  {Object}         props     The state data
 * @param  {String|Element} elem      The element to render content into
 * @return {Function}                 The template function
 */
var component = function (template, props, elem) {

    Object.defineProperties(template, {
        elem: {
            value: elem,
            writable: true
        },
        state: {
            value: props,
            writable: true
        },
        setState: {
            value: function (props) {

                // Shallow merge new properties into state object
                for (var key in props) {
                    if (props.hasOwnProperty(key)) {
                        template.state[key] = props[key];
                    }
                }

                // Render the element
                render(template, template.elem);

                // Return the elem for use elsewhere
                return template.elem;

            }
        }
    });

    // Return the elem for use elsewhere
    return template;

};

