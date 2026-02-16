"use client";

import GameBoard from "@/components/GameBoard/Gameboard";
import Keyboard from "@/components/Keyboard/Keyboard";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Tile } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const createEmptyBoard = (): Tile[][] => {
    return Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({
        letter: "",
        status: "empty",
      })),
    );
  };
  const [targetWord, setTargetWord] = useState("");
  // pool for selecting the answer
  const [answerWords, setAnswerWords] = useState<string[]>([]);
  // set for validity check (includes big.txt words)
  const [validWords, setValidWords] = useState<Set<string>>(new Set());
  const [board, setBoard] = useState<Tile[][]>(createEmptyBoard());
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [meaning, setMeaning] = useState("");
  const [gameStat, setGameStat] = useState<"win" | "lose" | "inProcess">(
    "inProcess",
  );

  const startNewGame = useCallback(async () => {
    setGameStat("inProcess");
    setBoard(createEmptyBoard());
    setCurrentRow(0);
    setCurrentCol(0);
    const res = await fetch("api/words");
    const data: {
      words: string[];
      checkWord: string[];
      meanings: { word: string; meaning: string }[];
    } = await res.json();

    const randomWord =
      data.words[Math.floor(Math.random() * data.words.length)];

    const wordMeaning = data.meanings.find(
      (item) => item.word === randomWord,
    );

    setMeaning(wordMeaning?.meaning ?? "");
    setTargetWord(randomWord);
    setAnswerWords(data.words);
    // allow guesses that are either in the big.txt corpus or in the answer list
    setValidWords(new Set([...data.checkWord, ...data.words]));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startNewGame();
  }, [startNewGame]);

  const insertLetter = (letter: string) => {
    if (gameStat !== "inProcess") return;
    if (currentCol >= 5) return;
    if (currentRow === 6) return;

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      newBoard[currentRow][currentCol] = {
        ...newBoard[currentRow][currentCol],
        letter,
      };
      return newBoard;
    });

    setCurrentCol((prev) => prev + 1);
  };

  const removeLetter = () => {
    if (gameStat !== "inProcess") return;
    if (currentCol === 0) return;

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      newBoard[currentRow][currentCol - 1] = {
        letter: "",
        status: "empty",
      };
      return newBoard;
    });

    setCurrentCol((prev) => prev - 1);
  };

  const submitGuess = () => {
    if (gameStat !== "inProcess") return;
    if (currentCol < 5) return;

    const guess = board[currentRow].map((tile) => tile.letter).join("");
    if (!validWords.has(guess)) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      return;
    }

    const newBoard = board.map((row) => [...row]);
    const targetArray = targetWord.split("");
    const guessArray = guess.split("");

    for (let i = 0; i < 5; i++) {
      if (guessArray[i] === targetArray[i]) {
        newBoard[currentRow][i].status = "correct";
        targetArray[i] = "";
        guessArray[i] = "";
      }
    }

    for (let i = 0; i < 5; i++) {
      if (guessArray[i] === "") continue;

      const foundIndex = targetArray.indexOf(guessArray[i]);

      if (foundIndex !== -1) {
        newBoard[currentRow][i].status = "present";
        targetArray[foundIndex] = "";
      } else {
        newBoard[currentRow][i].status = "absent";
      }
    }

    const isWin = newBoard[currentRow].every(
      (tile) => tile.status === "correct",
    );

    setBoard(newBoard);

    if (isWin) {
      setGameStat("win");
      return;
    }

    const isLastRow = currentRow === 5;
    if (isLastRow) {
      setGameStat("lose");
      return;
    }

    setCurrentRow((prev) => prev + 1);
    setCurrentCol(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        submitGuess();
      } else if (e.key === "Backspace") {
        removeLetter();
      } else if (/^[\u0600-\u06FF]$/.test(e.key)) {
        insertLetter(e.key);
        console.log(e.key);
        console.log(board);
        console.log(targetWord);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentCol, currentRow, board, targetWord, gameStat]);

  const resetBoard = () => {
    startNewGame();
  }

  return (
    <div className="">
      {gameStat !== "inProcess" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-center">
              {gameStat === "win" ? "بردی! 🎉" : "باختی 😞"}
            </h2>
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold">کلمه: {targetWord}</p>
              {meaning && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  معنی: {meaning}
                </p>
              )}
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={startNewGame}
                className="px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 active:scale-95 transition"
              >
                شروع دوباره
              </button>
            </div>
          </div>
        </div>
      )}
      {showAlert && (
        <div className="backdrop-blur-xl w-screen h-screen absolute z-40 left-1/2 -translate-x-1/2">
          <Alert className="max-w-md flex justify-center absolute left-1/2 top-1/4 -translate-1/2">
            <AlertTitle> همچین کلمه‌ای وجود نداره!</AlertTitle>
          </Alert>
        </div>
      )}
      <GameBoard
        board={board}
        currentRow={currentRow}
        currentCol={currentCol}
      />
      <Keyboard
        onKeyPress={insertLetter}
        onEnter={submitGuess}
        onDelete={removeLetter}
      />
      <div className="hidden md:flex justify-center">
        برای شروع بازی، کیبوردت رو فارسی کن.
      </div>
    </div>
  );
}
