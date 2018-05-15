// Goal - Toggle the visibility of passwords

// 1. Toggle visibility of the 'Login' form
// 2. Toggle visibility of the 'Update Password' form
// 2a. Show password should toggle both password fields (current & new)
// A way to listen for when the checkbox is checked or unchecked.
// A way to get password fields and change their type from password to text (or vice-versa).

const elemPw = document.querySelector('#password')
const elemToggleLoginPw = document.querySelector('#show-passwords')

const elemCurrentPw = document.querySelector('#current-pw')
const elemNewPw = document.querySelector('#new-pw')
const elemToggleUpdatePw = document.querySelector('#show-password')

const togglePw = function (chkbox, pw) {
    chkbox.addEventListener('change', function () {
        if (chkbox.checked) {
            pw.setAttribute('type', 'text')
        } else {
            pw.setAttribute('type', 'password') 
        }
    })
}

togglePw(elemToggleLoginPw, elemPw)

togglePw(elemToggleLoginPw, elemPw)

elemToggleUpdatePw.addEventListener('change', function () {
    if (elemToggleUpdatePw.checked) {
        elemCurrentPw.setAttribute('type', 'text')
        elemNewPw.setAttribute('type', 'text')
    } else {
        elemCurrentPw.setAttribute('type', 'password')
        elemNewPw.setAttribute('type', 'password')
    }
})