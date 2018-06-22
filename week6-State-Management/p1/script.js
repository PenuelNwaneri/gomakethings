console.log("script");

// // Create a new template
// var template = component(function (props) {
//     return 'You have made ' + props.count + ' shots. Nice work!';
// }, {
//     count: 0
// }, '#app');

// Variables
var app = document.querySelector('#app');
var btnStart = document.querySelector('#start-app');
// var btnReset = document.querySelector('#reset-app');
var countDownNum = '?';
var resume = false;

function message (props) {
    var msg = 'You have ' + props.count + ' seconds left.';
    return msg;
}

// Create a component
var template = component(message, {
    count: countDownNum
});

// Set an initial amount
render(template, app);

// Listen for click events
btnStart.addEventListener('click', function () {
    resume = !resume;
    countDownNum = document.querySelector('#count-down').value;
    template.setState({count: countDownNum})
}, false);

// btnReset.addEventListener('click', function () {
//     template.setState({count: countDownNum});
// }, false);

// Update the count down every 1 second
window.setInterval(function() {
    if (resume) {
        template.setState({count: template.state.count - 1});
        if (template.state.count < 1) {
            resume = !resume;
        }
    }
}, 1000);