import React, { useState, useEffect, useReducer, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import './css/Hangman.css';
import { randomWord } from "./Words.js";

import img0 from "./img/img0.png";
import img1 from "./img/img1.png";
import img2 from "./img/img2.png";
import img3 from "./img/img3.png";
import img4 from "./img/img4.png";
import img5 from "./img/img5.png";
import img6 from "./img/img6.png";

const Hangman = () => {
  const maxWrong = 6;
  const images = [img0, img1, img2, img3, img4, img5, img6];
  const [nWrong, setNWrong] = useState(0);
  const [answer, setAnswer] = useState(randomWord());
  const [guessed, setGuessed] = useState(new Set());
  const [group, setGroup] = useState("easy");
  const [usedLetters, setUsedLetters] = useState([]);
  const [gameStats, dispatch] = useReducer(gameStatsReducer, { wins: 0, losses: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setUsedLetters(Array.from(guessed));
  }, [guessed]);

  const reset = () => {
    setNWrong(0);
    setGuessed(new Set());
    setAnswer(randomWord());
    setGroup('easy');
    setUsedLetters([]);
    setGameOver(false);
  };

  const guessedWord = () => {
    return answer.split("").map((ltr) => (guessed.has(ltr) ? ltr : "_"));
  };

  const handleGuess = (ltr) => {
    setGuessed((prevGuessed) => new Set(prevGuessed.add(ltr)));
    setNWrong((prevNWrong) => prevNWrong + (answer.includes(ltr) ? 0 : 1));
  };



  const generateButtons = () => {
    return "abcdefghlijkmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr}
        value={ltr}
        onClick={() => handleGuess(ltr)}
        onKeyDown={(e) => {
          if (e.key === ltr && !guessed.has(ltr)) {
            handleGuess(ltr);
          }
        }}
        disabled={guessed.has(ltr) || gameOver}
      >
        {ltr}
      </button>
    ));
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setGroup(value);
    setAnswer(randomWord(value));
    setNWrong(0);
    setGuessed(new Set());
    setUsedLetters([]);
    setGameOver(false);
  };

  const alt = `${nWrong}/${maxWrong} guesses`;
  const isWinner = guessedWord().join("") === answer;

  if (isWinner && !gameOver) {
    dispatch({ type: "WIN" });
    setGameOver(true);
  }

  if (nWrong >= maxWrong && !gameOver) {
    dispatch({ type: "LOSS" });
    setGameOver(true);
  }

  const winrate = useMemo(() => {
    if (gameStats.wins === 0 && gameStats.losses === 0) {
      return 0;
    }

    return (gameStats.wins / (gameStats.wins + gameStats.losses)) * 100;
  }, [gameStats.wins, gameStats.losses]);

  const formik = useFormik({
    initialValues: {
      guess: "",
    },
    validationSchema: Yup.object({
      guess: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, "Nie można wprowadzać liczb ani znaków specjalnych")
        .max(1, "Wprowadź tylko jedną literę")
        .required("To pole jest wymagane"),
    }),
    onSubmit: (values) => {
      handleGuess(values.guess.toLowerCase());
      formik.resetForm();
    },
  });

  let gameState = generateButtons();
  if (isWinner && gameOver) gameState = "You Won!";
  if (!isWinner && nWrong >= maxWrong && gameOver) gameState = "You Lose!";

  return (
    <div className="Hangman">
      <h1 className="Hangman-title">Hangman {group}</h1>
      <div className="Hangman-flex">
        <div className="Hangman-counter">
          <img src={images[nWrong]} alt={alt} />
          <p>Guessed Wrong: {nWrong}/{maxWrong}</p>
        </div>
        <div>
          <p className="Hangman-word">{gameOver ? answer : guessedWord()}</p>
          <div className="btns" tabIndex="0">
            {gameState}
          </div>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="guess">Guess:</label>
            <input
              type="text"
              id="guess"
              name="guess"
              value={formik.values.guess}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={gameOver}
            />
            {formik.touched.guess && formik.errors.guess ? (
              <div className="error">{formik.errors.guess}</div>
            ) : null}
            <button type="submit" id="reset" disabled={gameOver}>
              Guess
            </button>
          </form>
          <div className="used-letters">Used Letters: {usedLetters.join(", ")}</div>
          <div className="game-stats">
            Wins: {gameStats.wins} | Losses: {gameStats.losses} <br></br>Winrate: {winrate.toFixed(2)}%
          </div>
        </div>
        <div className="Hangman-reset">
          <button id="reset" onClick={reset}>
            Restart?
          </button>
          <form>
            <label htmlFor="group">Guess About:</label>
            <select name="group" id="group" value={group} onChange={handleChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
};

const gameStatsReducer = (state, action) => {
  switch (action.type) {
    case "WIN":
      return { ...state, wins: state.wins + 1 };
    case "LOSS":
      return { ...state, losses: state.losses + 1 };
    default:
      return state;
  }
};

export default Hangman;