// Login password fields
const pwEle = document.querySelector('#password')
const showLoginPwEle = document.querySelector('#show-passwords')

// Update password fields
const updatePwEle = Array.from(document.querySelectorAll('[id$="-pw"]'))
const showUpdatePwEle = document.querySelector('#show-password')

// Test passwords populated so I don't get injured from repeated typing
pwEle.value = "password"
updatePwEle.forEach(function(pw){
    pw.value = "password"
})

const showHidePw = function (chkbox, pw) {
    chkbox.addEventListener('change', function () {
        if (Array.isArray(pw)) {
            pw.forEach(function (pw) {
                chkbox.checked ?  pw.setAttribute('type', 'text') : pw.setAttribute('type', 'password')
            })
        } else {
            chkbox.checked ?  pw.setAttribute('type', 'text') : pw.setAttribute('type', 'password')
        }
    })
}

showHidePw(showLoginPwEle, pwEle)
showHidePw(showUpdatePwEle, updatePwEle)
