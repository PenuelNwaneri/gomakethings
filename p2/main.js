// Detect when 'F' field is changed
// Convert 'F' to 'C'. (temp - 32) * 5/9
// Update 'C' with the result.

// Detect when 'C' field is changed
// Convert 'C' to 'F'. (temp * 9/5) + 32
// Update 'F' with the result.

const farenheitInput = document.querySelector('#farenheit')
const celciusInput = document.querySelector('#celcius')

farenheitInput.addEventListener('input', function() {
    const celcius = (farenheitInput.value - 32) * (5/9)
    celciusInput.value = Math.round(celcius)
})

celciusInput.addEventListener('input', function () {
    const farenheit = (celciusInput.value * 9/5) + 32
    farenheitInput.value = Math.round(farenheit)
})