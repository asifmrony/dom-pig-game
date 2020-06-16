/*

GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. 
    Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. 
    After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score 
    gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1. generate a random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. display the result - in this case, an image according to dice number

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = './resources/images/dice-' + dice + '.png';



        //3. add the dice number to roundScore only IF the dice number is not 1
        if (dice !== 1) {
            //add score to round score and print to the current score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            //next player
            nextPlayer();

            //problem to tackle : active player change only first time it got 1.

            // document.querySelector('.player-0-panel').classList.remove('active');
            // document.querySelector('.player-1-panel').classList.add('active');
        }
    }
});




document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //add roundScore to Global Score
        scores[activePlayer] += roundScore;

        //update the UI element
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


        //check if any player got 100 point and wins.
        if (scores[activePlayer] >= 20) {
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








// document.querySelector('#current-' + activePlayer).textContent = dice;