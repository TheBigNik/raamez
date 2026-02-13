'use client'

import { TileProps } from "@/types/types";
import { useState } from "react";

export default function Home() {
  const targetWord = "مدرسه"
  
  const createEmptyBoard = () => {
    return Array.from({length: 6}, () => 
    Array.from({length: 5}, () => ({
      letter: "",
      status: "empty"
    })))
  }

  const [board, setBoard] = useState<TileProps[][]>(createEmptyBoard)
  const [currentRow, setCurrentRow] = useState(0)
  const [currentCol, setCurrentCol] = useState(0)

  const insertLetter = (letter: string) => {
    if (currentCol >= 5) return

    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => [...row])
      newBoard[currentRow][currentCol] = {
        ...newBoard[currentRow][currentCol], letter,
      }
      return newBoard
    })

    setCurrentCol(prev => prev + 1)
  }

  const removeLetter = () => {
    if (currentCol === 0 ) return

    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => [...row])
      newBoard[currentRow][currentCol - 1] = {
        letter: "",
        status: "empty",
      }
      return newBoard
    })

    setCurrentCol(prev => prev - 1)
  }

  return (
    <div>

    </div>
  );
}
