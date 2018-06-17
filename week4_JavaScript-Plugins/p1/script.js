/**
 * IIFE: Controls tabs
 * @return APIs:
 *              tabs.init()
 *              tabs.selectTab()
 *
 */

var tabs = (function () {

    /**
     * Variables
     */

    var allTabPanes = document.querySelectorAll('.tab-pane'); // All of the tab contents [NodeList]
    var showTab = 0; // Default tab. '0' is the first tab.
    var publicApis = {};

    /**
     * Methods
     */

    // Initializer
    publicApis.init = function () {
        document.addEventListener('click', publicApis.selectTab);
        publicApis.selectTab(showTab); // Show first tab (0);
    }

    /**
     * Show contents of matching tab
     * @param   {tabName}   matching tab id to be displayed
     */
    var showTabContent = function (tabName) {
        Array.from(allTabPanes).forEach( function (tabPane) {
            tabPane.style.display = 'none'; // Hides all first
            if (tabPane.id === tabName) tabPane.style.display = 'block'; // Show if match
        });
    }

    /*
     * Input options:
     * click,
     * tabs.selectTab([int]),
     * tabs.selectTab([name of tab])
    */

    /**
     * Handle click events
     * @param  {Event} event The click event
     * Examples:
     *     click,
     *     tabs.selectTab([id of tab]),
     *     tabs.selectTab([index of tab]),
     */

    publicApis.selectTab = function (event) { // Assign to global
        if (event === 'undefined') return;

        if (event.target) { // If mouse click
            if(!event.target.matches('[data-tab]')) return;
            showTab = event.target.hash.substr(1);
        } else if (typeof event === 'string') { // If 'string', id of tab
            showTab = event;
        } else if (typeof event === 'number') { // If 'nmmber', index of tab
            showTab = allTabPanes[event].id;
        } else {
            console.error('Click on tab, enter tab #id string, or tab number. Try again.');
        }

        showTabContent(showTab); // Show the tab.
    };

    return publicApis;

})()

tabs.init()
