import React, { useState } from 'react';
import './PrisonDilemmaGame.css'; // Import your CSS file

const PrisonDilemmaGame = () => {
  const [points, setPoints] = useState(0);
  const [remainingPlays, setRemainingPlays] = useState(3);
  const [prompt, setPrompt] = useState('');
  const [showWaving, setShowWaving] = useState(false);
  const [showThumbsDown, setShowThumbsDown] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleChoice = (cooperate) => {
    if (gameOver) {
      return; // Do nothing if the game is over
    }

    // Logic for calculating points based on user's choice
    const earnedPoints = cooperate ? 5 : 10;
    setPoints((prevPoints) => prevPoints + earnedPoints);

    // Update prompt for the next play
    const newPrompt = `You chose to ${cooperate ? 'Cooperate' : 'Default'}.`;
    setPrompt(newPrompt);

    // Show pop-ups based on user's choice
    setShowWaving(cooperate);
    setShowThumbsDown(!cooperate);

    // Decrease remaining plays
    const newRemainingPlays = remainingPlays - 1;
    setRemainingPlays(newRemainingPlays);

    // Check if the game is over
    if (newRemainingPlays === 0 && !gameOver) {
      setPrompt(`Game Over! Your total points: ${points}`);
      setGameOver(true); // Set game over state
    }
  };

  const handlePlayAgain = () => {
    // Reset the game state for a new round
    setPoints(0);
    setRemainingPlays(3);
    setPrompt('');
    setShowWaving(false);
    setShowThumbsDown(false);
    setGameOver(false); // Reset game over state
  };

  return (
    <div className="game-container">
      {gameOver && (
        <div className="game-over">
          <h1>Game Over!</h1>
          <p>Your total points: {points}</p>
          <button className="play-again-button" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      )}
      {!gameOver && (
        <div>
          <h1>Prison Dilemma Game</h1>
           <div className="pop-up-container">
          {showWaving && <div className="waving-container">👋</div>}
          {showThumbsDown && <div className="thumbs-down-container">👎</div>}
           </div>
          <div className="buttons-container">
            <button onClick={() => handleChoice(true)} disabled={gameOver}>
              Cooperate
            </button>
            <button onClick={() => handleChoice(false)} disabled={gameOver}>
              Default
            </button>
          </div>
          <div className="prompt-container">
            <p>{prompt}</p>
            {remainingPlays > 0 && <p>Remaining plays: {remainingPlays}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrisonDilemmaGame;
