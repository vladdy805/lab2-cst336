document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

new CircleType(document.getElementById('curvedText'))
    .radius(384);

let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;
let attemptsLeft = 7;


initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);
    attempts = 0;
    attemptsLeft = 7;

    //hiding the reset button
    document.querySelector("#resetBtn").style.display = "none";
    //showing the guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); //adding focus to textbox
    playerGuess.value = ""; //clearing textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; //clears the feedback

    document.querySelector("#guesses").textContent = ""; //clears previous guesses

}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);

    if (isNaN(guess)) {
        feedback.textContent = "Please enter an integer."
        feedback.style.color = "darkred";
        return;
    }

    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";

    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "green";
        wins++;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        document.querySelector("#attemptsLeft").textContent = attemptsLeft - 1;
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost!\n" + "The number was: " + randomNumber;
            feedback.style.ccolor = "red";
            losses++;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
            attemptsLeft--;
        } else {
            feedback.textContent = "Guess was low";
            attemptsLeft--;
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
    document.querySelector("#wins").textContent = wins;
    document.querySelector("#losses").textContent = losses;
}
