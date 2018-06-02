// Variables (Controller)
var text = document.querySelector('#text');
var wordCount = document.querySelector('#word-count');
var characterCount = document.querySelector('#character-count');

// Methods (Model)
text.addEventListener('input', function () {
    var textNoSpaceCount = text.value.replace(/ /g,'').length;
    var textWordCount = text.value.split(' ').
        filter(function(text) {
            return text != ''
        })
        .length;
    updateCount(textNoSpaceCount, textWordCount);
})

// Render (View)
var updateCount = function( numCharacters, numWords) {
    // Update count
    characterCount.textContent = numCharacters;
    wordCount.textContent = numWords;
}

