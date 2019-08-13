/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll, userInput;


init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. Random generator number 
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() *6 ) +1;
        //var dice = 6
        

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        var diceDom2 = document.querySelector('.dice2')

        diceDom2.style.display = 'block';
        diceDOM.style.display = 'block';

        diceDom2.src = 'dice-' + dice2 + '.png';
        diceDOM.src = 'dice-' + dice + '.png';
 
        //3. Update the round Score if the rolled number was NOT a 1
        if(dice == 6 && previousRoll == 6){
            //player looses sccore
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();




        }else if (dice !== 1 && dice2 !== 1 ){
            //Add score
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            //Next Player
            nextPlayer();

        }

        previousRoll = dice;
    }
    

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        //Add CURRENT Score to the GLOBAL Score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        roundScore=0;
        
        //get user input value
        userInput = document.getElementById('input-value').value

        //if value is Empty
        if (userInput == 0){
            userInput = 100;
        }
        //Check if player won the game
        if (scores[activePlayer] >= userInput){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else  {
            //NextPlayer
            nextPlayer();
        }
    }

});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //tenary operator

        //change current score to zero
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        //document.QuerySelector('.player-0-panel').classList.remove('active');
        //document.QuerySelector('player-1-panel').classlist.add('active');

        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';

        previousRoll=0;
        roundScore = 0;

}

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    previousRoll = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}

// document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHtml = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);