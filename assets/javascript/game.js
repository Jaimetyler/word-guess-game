window.onload = function() {

    var words = ["strikeout", "ball", "catcher", "pitcher", "shortstop", "balk", "homerun"];
    var guessesRemaining = 7;
    //generates random #, and assigns it to an item in the array, storing it in randomWord
    var randomWord = words[Math.floor((Math.random() * words.length))];
    var underScoreWord = "";
    var letterGuess = [];
    var indexes = [];
    var trueFalse = false;

    //set this function to make the game reset, it doesn't work when called so i kept the alert to end game and refresh.
    function resetGame() {
        guessesRemaining = 7;
    
        randomWord = Math.floor(Math.random() * (words.length));
    
        letterGuess = [];
        indexes = [];
        
        for (var i = 0; i < words[randomWord].length; i++) {
            letterGuess.push("_");
        }
    }
    
    
    //call underscore function to display randomWord underscores
    underScores();
    
    //listen for keypress, and run function
    document.addEventListener('keypress', function(event) {
    
        //pushes key pressed into array of guessed letters
        letterGuess.push(String.fromCharCode(event.keyCode));
    
        //loop through random word's letters, checking against keypress
        for (var j = 0; j < randomWord.length; j++) {
            
            //if any letter of randomWord is equal to the last letter pressed
            if (randomWord[j] === letterGuess[letterGuess.length-1]) {
                
                //tell me keypress matches character in randomWord (used for if/else later)
                trueFalse = true;
                //tell me at what index the matchi ng characters are at
                indexes.push(j);
                //change underScoreWord from string to array for looping
                var splitWord = underScoreWord.split("");
    
                //loop through splitWord array, and set matching indices to corresponding keypress
                for (k = 0; k < indexes.length; k++) {
                    splitWord[indexes[k]] = letterGuess[letterGuess.length-1];
                    //reset indexes array to nothing, so we can loop through again later
                    indexes = [];
                    //rejoin underScoreWord as string for display
                    underScoreWord = splitWord.join("");
                }
            } 
        }
    
        //if/else statement checking success or failure of matching characters
        if (trueFalse) {
            document.getElementById('randomWord').innerHTML = underScoreWord;
            // If characters match, remove last entered character from letterGuess array
            // I only want incorrect letters in the letterGuess array
            letterGuess.pop();
    
    
        } else {
            // If keypress has no matches, lower guesses by 1
            guessesRemaining--
            //display letters guessed
            document.getElementById('guessed').innerHTML = letterGuess;
            //display remaining chances
            document.getElementById('remainingGuesses').innerHTML = "Guesses Remaining: " + guessesRemaining;
        }
    
        //reset trueFals to false, to restart entire process
        trueFalse = false;

        //call function to determine win/lose (see below)
        checkWin();
        
      
        
    });
    
    //converts randomWord into string of underscores of matching length
    function underScores() {
        for (var i = 0; i < randomWord.length; i++) {
            underScoreWord += "_";
        }
        document.getElementById('randomWord').innerHTML = underScoreWord;
    }
    
 
    //checks to see if player wins or loses, and alerts the answer
    var wins = 0;
    function checkWin() {
        if (underScoreWord === randomWord) {
                alert("Winner! Refresh page for new game.");
                
                document.getElementById('wins').innerHTML = wins++;
            } else if (guessesRemaining === 0) {
                alert("Loser! Refresh page for new game.");
                document.getElementById('randomWord').innerHTML = randomWord;
            }
    }   
    
    }
    
    