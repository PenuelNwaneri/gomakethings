// Variables (Controller)
var text = document.querySelector('#text');
var wordCount = document.querySelector('#word-count');
var characterCount = document.querySelector('#character-count');

// Methods (Model)
text.addEventListener('input', function () {
    var textCharacterCount = text.value.replace(/[\n\r]+/g,'').length;
    var textWordCount = text.value.split(/[\n\r\s]+/g).
        filter(function(text) {
            return text != ''
        })
        .length;
    updateCount(textCharacterCount, textWordCount);
})

// Render (View)
var updateCount = function( numCharacters, numWords) {
    // Update count
    characterCount.textContent = numCharacters;
    wordCount.textContent = numWords;
}

