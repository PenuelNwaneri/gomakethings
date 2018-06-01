// Using bubbling technique, look for clicks with a certain data-attribute.
// Use the value of the data attribute to target specific elements - password input
// Toggle password input field type from 'password' to 'text'

const showHidePw = function () {
    document.addEventListener('click', function (event) {
        var pwSelector = event.target.getAttribute('data-show-pw');
        if (pwSelector) {
            var passwords = Array.from(document.querySelectorAll(pwSelector));
            passwords.forEach(function (pw) {
                event.target.checked ?  pw.setAttribute('type', 'text') : pw.setAttribute('type', 'password');
            })
        }
    });
}

showHidePw();