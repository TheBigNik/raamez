"use client";

import GameBoard from "@/components/GameBoard/Gameboard";
import { Tile } from "@/types/types";
import { useEffect, useState } from "react";
import { rootCertificates } from "tls";

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
  const [words, setWords] = useState<string[]>([]);
  const [board, setBoard] = useState<Tile[][]>(createEmptyBoard());
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  useEffect(() => {
    const fetchWord = async () => {
      const res = await fetch("api/letters");
      const words: string[] = await res.json();

      const randomWord = words[Math.floor(Math.random() * words.length)];

      setTargetWord(randomWord);
      setWords(words);
    };
    fetchWord();
  }, []);

  const insertLetter = (letter: string) => {
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
    if (currentCol < 5) return;

    const guess = board[currentRow].map((tile) => tile.letter).join("");
    if (!words.includes(guess)) return alert("not in the list");

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

    setBoard(newBoard);

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
  }, [currentCol, currentRow, board]);

  return (
    <div>
      <GameBoard
        board={board}
        currentRow={currentRow}
        currentCol={currentCol}
      />
    </div>
  );
}
