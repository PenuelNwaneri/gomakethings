// Detect when 'F' field is changed
// Convert 'F' to 'C'. (temp - 32) * 5/9
// Update 'C' with the result.

// Detect when 'C' field is changed
// Convert 'C' to 'F'. (temp * 9/5) + 32
// Update 'F' with the result.

const farenheitEle = document.querySelector('#farenheit')
const celciusEle = document.querySelector('#celcius')

farenheitEle.addEventListener('input', function() {
    const celcius = (farenheitEle.value - 32) * (5/9)
    celciusEle.value = Math.round(celcius)
})

celciusEle.addEventListener('input', function () {
    const farenheit = (celciusEle.value * 9/5) + 32
    farenheitEle.value = Math.round(farenheit)
})