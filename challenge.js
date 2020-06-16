/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that,
    it's the next player's turn. (Hint: Always save the previous dice roll in 
    a separate variable)

2. Add an input field to the HTML where players can set the winning score, 
    so that
    they can change the predefined score of 100. (Hint: you can read that 
    value with the .value property in JavaScript. This is a good oportunity 
    to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player
    looses his current score when one of them is a 1. (Hint: you will need 
    CSS to position the second dice, so take a look at the CSS code for the
    first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1. generate a random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. display the result - in this case, an image according to dice number

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = './resources/images/dice-' + dice + '.png'; // displayed the image according to dice


        if (dice === 6 && lastDice === 6) {
            //player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        }
        //3. add the dice number to roundScore only IF the dice number is not 1
        else if (dice !== 1) {
            //add score to round score and print to the current score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();

            // document.querySelector('.player-0-panel').classList.remove('active');
            // document.querySelector('.player-1-panel').classList.add('active');
        }

        lastDice = dice;
    }
});




document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //add roundScore to Global Score
        scores[activePlayer] += roundScore;

        //update the UI element
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //player set finishing score add to a variable 
        var input = document.querySelector('.final-score').value;
        var winningScore;

        //if input is blank, winning score will be 100
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //check if any player got 100 point and wins.
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).innerHTML = "WINNER";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            //next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').innerHTML = "Player 1";
    document.getElementById('name-1').innerHTML = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}