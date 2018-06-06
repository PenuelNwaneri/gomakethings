var tabs = (function () {
    /**
     * Variables
     */
    var tabs = document.querySelector('.tabs');
    var allTabPanes = document.querySelectorAll('.tab-pane'); // All of the tab contents [NodeList]
    var showTab = 0; // Default tab. '0' is the first tab.
    var publicApis = {};

    /**
     * Methods
     */
    var showTabContent = function (tabName) {
        Array.from(allTabPanes).forEach( function (tabPane) {
            tabPane.style.display = 'none'; // Hide all
            if (tabPane.id === tabName) tabPane.style.display = 'block'; // Show if match
        });
    }

    publicApis.chooseTab = function (event) { // Assign to global
        if (event === 'undefined') return;

        if (event.target) { // If mouse click
            if(!event.target.matches('[data-tab]')) return;
            showTab = event.target.hash.substr(1); // Name of clicked tab
        } else if (typeof event === 'string') {
            showTab = event; // Name of clicked tab
        } else if (typeof event === 'number') {
            showTab = allTabPanes[event].id; // Name of clicked tab
        } else {
            console.error('Click on tab, enter tab #id string, or tab number. Try again.');
        }

        showTabContent(showTab); // Show the tab.
    };

    /**
     * Init & Listeners
     */
    document.addEventListener('click', publicApis.chooseTab);
    publicApis.chooseTab(showTab); // Show first tab;

    return publicApis; // where does publicApis go?

    /**
     * Questions - How come this doesn't work?
     */
    // var clickTab2 = function () {console.log("whatevez")};
    // return clickTab2;
})()
