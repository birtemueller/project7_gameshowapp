var overlay = document.getElementById('overlay');
var qwerty = document.getElementById('qwerty');
var missed = 0;
var phrases =[
    "The early bird catches the worm",
    "The pen is mightier than the sword",
    "No man is an island",
    "Better late than never",
    "Birds of a feather flock together",
    "A watched pot never boils",
    "Make hay while the sun shines",
    "Put the pedal to the metal",
    "Soon learnt soon forgotten",
    "Speech is silver silence is golden",
    "Strike while the iron is hot"

];

/*Start Game by clicking the 'Start Button'*/


overlay.addEventListener("click", function(){
    overlay.style.display = "none";
    }
);


/*Game Setup*/

function getRandomPhraseAsArray(arr){
    var randomNumber = Math.floor((Math.random() * arr.length));
    var phrase = arr[randomNumber].toUpperCase().split("");
    return phrase;
}

function addPhraseToDisplay(arr){

    for (i = 0; i < arr.length; i++ ) {
        var li = document.createElement('li');
        var phrase = document.getElementById("phrase");
        var letter = document.createTextNode(arr[i]);
        li.appendChild(letter);
        phrase.appendChild(li);

        if( arr[i] == " ") {
            li.classList.add("space");
        } else {
            li.classList.add("letter")
        }

    }

    return phrase;
}

function phraseGenerator() {
    var phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
}

phraseGenerator();


/*The actual game happens here*/

function checkLetter(clickedButton) {
    var letters = document.getElementsByClassName("letter");
    for ( i = 0; i < letters.length; i++) {
        var letter = letters[i].innerText;
        if (clickedButton == letter) {
            letters[i].classList.add("show");
            var letterFound = letter;
        }
    }

    if (letterFound) {
        return letterFound;

    } else {
        missed += 1;
        return null;
    }

}


qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
    var clickedButton = e.target.textContent.toUpperCase();
    checkLetter(clickedButton);
    e.target.classList.add("chosen");
    e.target.setAttribute("disabled", true);
    checkWin();
    scoreBoard();

}
});


function scoreBoard() {
    var tries = document.getElementsByClassName("tries");
    var scratch = tries.length - missed;
    tries[scratch].firstChild.setAttribute("src", "images/lostHeart.png");

}


function checkWin() {
    var shownLetters = document.getElementsByClassName("show").length;
    var letters = document.getElementsByClassName("letter").length;

    if (shownLetters === letters) {
        overlay.removeAttribute("style");
        overlay.classList.remove("lose");
        overlay.classList.add("win");
        restart();
    }

    if (missed > 5) {
        overlay.removeAttribute("style");
        overlay.classList.add("lose");
        restart();

    }

}

/*Restart the game*/

function restart() {
    var resetButton = document.getElementsByClassName("btn__reset");
    var hearts = document.getElementsByClassName("tries");
    var title = document.getElementsByClassName("title")
    var shownLetters = document.getElementsByClassName("show");
    var disabledKeys = document.getElementsByTagName("BUTTON");
    missed = 0;
    resetButton[0].innerHTML = "Play again?";


    document.getElementById("phrase").innerHTML = "";
    phraseGenerator();

    for ( i = 0; i < shownLetters.length; i++) {
        shownLetters[i].classList.remove("show");
    }

    for ( j = 0; j < disabledKeys.length; j++) {
        disabledKeys[j].classList.remove("chosen");
        disabledKeys[j].removeAttribute("disabled", true);
    }

    for ( k = 0; k < hearts.length; k++) {
        hearts[k].firstChild.setAttribute("src", "images/liveHeart.png");
    }
}
