// Login password fields
const pwInput = document.querySelector('#password')
const showPwCheckbox = document.querySelector('#show-passwords')

// Update password fields
const updatePwInputs = Array.from(document.querySelectorAll('[id$="-pw"]'))
const showUpdatePwCheckbox = document.querySelector('#show-password')

// Test passwords populated so I don't get injured from repeated typing
pwInput.value = "password"
updatePwInputs.forEach(function(pw){
    pw.value = "password"
})

const showHidePw = function (checkbox, pw) {
    checkbox.addEventListener('change', function () {
        if (Array.isArray(pw)) {
            pw.forEach(function (pw) {
                checkbox.checked ?  pw.setAttribute('type', 'text') : pw.setAttribute('type', 'password')
            })
        } else {
            checkbox.checked ?  pw.setAttribute('type', 'text') : pw.setAttribute('type', 'password')
        }
    })
}

showHidePw(showPwCheckbox, pwInput)
showHidePw(showUpdatePwCheckbox, updatePwInputs)
