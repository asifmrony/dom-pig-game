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

var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-1').textContent = '0';


document.querySelector('.btn-roll').addEventListener('click', function () {

    //1. generate a random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. display the result - in this case, an image according to dice number

    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = './resources/images/dice-' + dice + '.png';
    console.log(dice);


    //3. add the dice number to roundScore only IF the dice number is not 1
    if (dice !== 1) {
        //add score to round score and print to the current score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');

        //problem to tackle : active player change only first time it got 1.
    }
});













// document.querySelector('#current-' + activePlayer).textContent = dice;