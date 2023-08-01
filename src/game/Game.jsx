import React, { useState } from "react";
import "../index.css";

const words = ["REACT", "JAVASCRIPT", "DEVELOPMENT","GAME","APPLICATION", "HTML", "CSS", "NODEJS", "EXPRESS"];

function Game() {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guesses, setGuesses] = useState(6);
  const [word, setWord] = useState(getRandomWord());

  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  function handleGuess(letter) {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!word.includes(letter)) {
      setGuesses(guesses - 1);
    }
  }

  function isLetterUsed(letter) {
    return guessedLetters.includes(letter);
  }

  function resetGame() {
    setWord(getRandomWord());
    setGuesses(6);
    setGuessedLetters([]);
  }

  const displayWord = word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  return (
    <div className='App'>
      <h1>HANGMAN</h1>
      <div className='WordDisplay'>{displayWord}</div>
      <div className='GuessesRemaining'>Remaining attempts: {guesses}</div>
      {guesses > 0 && !displayWord.includes("_") ? (
        <div className='WinMessage'>Congratulations! You guessed it!</div>
      ) : guesses === 0 ? (
        <div className='LoseMessage'>Sorry, you lost. The word was: {word}</div>
      ) : (
        <div className='Letters'>
          {Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode(65 + i)
          ).map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              className={isLetterUsed(letter) ? "UsedLetter" : ""}
              disabled={isLetterUsed(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      )}
      <button className='RestartButton' onClick={resetGame}>
        Restart the game!
      </button>
    </div>
  );
}

export default Game;
