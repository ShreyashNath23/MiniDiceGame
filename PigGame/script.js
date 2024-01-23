'use strict';

// Selecting elements..
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const curr0El = document.getElementById('current--0');
const curr1El = document.getAnimations('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const initial = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
  
    score0El.textContent = 0;
    score1El.textContent = 0;
    curr0El.textContent = 0;
    curr1El.textContent = 0;
  
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

initial();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Implementing rolling dice functionality....
btnRoll.addEventListener('click', function(){
    if(playing){
        //Generate a random dice roll..
        const dice = Math.trunc(Math.random()*6)+1;
        //Display the rolled dice...
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        //Check for rolled 1: if true switch to next player...
         if(dice !=  '1'){
        // Add dice to curr score..
           currentScore += dice;
           document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
           switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function(){
    if(playing){
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //Check scroe >= 100 or not, if so finsih the game.
        if(scores[activePlayer] >= 20){
           //finish game..
           playing = false;
           diceEl.classList.add('hidden');
           document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        }else{
           switchPlayer();
        }
    }
}) 

btnNew.addEventListener('click', initial)
 