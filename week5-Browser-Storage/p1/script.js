// GOAL: track the progress of a multipage form.
// On each page, you should display a status bar
// Shows how much of the form the user has completed.
// On the last page, use the form data from browser storage to provide a summary of the data they provided.

// TODO:
// 1. Collect the number of fields (all required, unless indicated)
// 1. username
// 2. password
// 3. name
// 4. street1
// 5. street2 (optional)
// 6. city
// 7. state
// 8. zipcode
// 9. country

function init () {
    updateFieldsFromStorage();
    renderProgressBar();
    updateProgressBar();
    document.addEventListener('input', saveInput);
}

function updateFieldsFromStorage () {
    var inputFields = []; // Get list of input 'id' names
    document.querySelectorAll('input').forEach(function (input) {
        inputFields.push(input.name);
    });

    var savedInputs = Object.keys(sessionStorage);

    // Match input 'id' names to storage keys. If match, then update field with the value from sessionStorage.
    inputFields.forEach(function (input) {
        if (savedInputs.indexOf(input) != -1) {
            document.querySelector(`#${input}`).value = sessionStorage.getItem(input);
        }
    })
}

function renderProgressBar () {
    var body = document.querySelector('body');
    var progressBar = document.createElement('div');
    progressBar.className = 'progress-bar top';
    progressBar.innerHTML = `<div class="progress-item" username>username</div>
                            <div class="progress-item" password>password</div>
                            <div class="progress-item" fullname>name</div>
                            <div class="progress-item" street-1>street</div>
                            <div class="progress-item" city>city</div>
                            <div class="progress-item" state>state</div>
                            <div class="progress-item" zip>zipcode</div>
                            <div class="progress-item" country>country</div>`;
    body.prepend(progressBar);
}

function updateProgressBar (id, value) {
    // Get 'id' passed from the saveInput event to remove styling
    var progressItem = document.querySelector(`[${id}]`);
    var progressItemInput = document.querySelector(`#${id}`);

    // Get sessionStorage to apply colors to progress items
    var savedInputs = Object.keys(sessionStorage);
    console.log(savedInputs);

    savedInputs.forEach( function(input) {
        if (!document.querySelector(`[${input}]`)) return;
        document.querySelector(`[${input}]`).classList.add('filled');

        if (!document.querySelector(`#${input}`)) return;
        document.querySelector(`#${input}`).style = 'background-color: none';
    });
    if (id && !value) {
        progressItem.classList.remove('filled');
        progressItemInput.style.backgroundColor = 'lightgoldenrodyellow';
    }
}

function saveInput (event) {
    // Target only INPUT fields with 'required' attribute.
    var nodeType = event.target.nodeName;
    var requiredInput = event.target.attributes.required;
    if (nodeType === 'INPUT' && !requiredInput) return;

    // Target input 'id' and 'values'
    var inputId = event.target.id;
    var inputValue = event.target.value;

    // If value exists, store value inside sessionStorage and flag as 'required="complete"'
    if (inputValue) {
        requiredInput.value = 'complete'; // Give 'required' attribute value of 'complete'
        sessionStorage.setItem(inputId, inputValue);
        console.log("something");
    } else {
        requiredInput.value = ''; // Remove 'required' attribute value
        sessionStorage.removeItem(inputId);
        console.log("nothing");
    }
    updateProgressBar(inputId, inputValue);
}

init();
