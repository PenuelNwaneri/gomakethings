// When JS fires, make sure that you can still see all pictures.
// Revealing pattern.

(function () {
    'use strict';

    var filter = document.querySelector('#filter'); // Get the filter elements
    if (!filter) return; // Check if fiter exists

    var filterOptions = {
        type: {
            shirts: true,
            hats: true,
            shoes: true,
        },
        for: {
            men: true,
            women: true,
            both: true,
        },
        weather: {
            warm: true,
            cold: true,
            'in-between': true,
        }
    };

    var App = {

        // Initialize
        init: function () {
            this.bindEvents();
            this.get();
        },

        // Bind events
        bindEvents: function () {
            console.log('(bindEvents) binding events...');

            // Add 'change' event
            filter.addEventListener('change', function (e){
                // Input type and className check
                if (e.target.type !== 'checkbox' && !e.target.className.indexOf('filter-')) return;

                // Save and apply filters
                this.apply(e.target);
                this.save(e.target);

            }.bind(this), false);
        },

        // Fetches filters from storage
        get: function () {
            console.log('(get) getting filters from localStorage...');

            var storedFilter = localStorage.getItem('filterOptions');

            if (storedFilter) {
                // Get the filters from storage
                filterOptions = JSON.parse(storedFilter)
            } else {
                // If there is no saved filters in storage, save the current local filters.
                localStorage.setItem('filterOptions', JSON.stringify(filterOptions));
            }

            this.update();
        },

        // Update filters (checkboxes & pictures)
        update: function () {
            console.log('(update) updating checkboxes...');

            // Target checkboxes
            var checkboxes = filter.querySelectorAll('[class^="filter-"]');

            // Loop through checkboxes and check against the local 'filterOptions' object.
            checkboxes.forEach( function (checkbox) {
                var category = checkbox.className.split('-')[1];
                var subCategory = checkbox.name;

                // If checkbox doesn't equal the filterOptions, toggle the checkbox
                if (checkbox.checked !== filterOptions[category][subCategory]) {
                    checkbox.checked = !checkbox.checked;
                };
            })
        },

        // Apply filter to images
        apply: function (checkbox) {
            console.log('(apply) applying to pics...');
            console.log(checkbox);
        },

        // Save filters to local object - 'filterOptions'
        save: function (checkbox) {
            console.log('(save) saving to local object...');
            if (!checkbox) return;

            var category = checkbox.className.split('-')[1];
            var subCategory = checkbox.name;

            if (!checkbox.checked) {
                filterOptions[category][subCategory] = false
            }  else {
                filterOptions[category][subCategory] = true;
            }

            this.storage(); // Save to localStorage
        },

        // Save filters to localStorage
        storage: function () {
            console.log('(storage) storing in localStorage...');
            console.log(filterOptions);
            localStorage.setItem('filterOptions', JSON.stringify(filterOptions));
        }

    }

    App.init(); // Initialize
    console.log('------');
})()

// TODO:
// 1. How to fix the flash of checkboxes?
// 2.
