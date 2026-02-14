import { GameBoardProps } from "@/types/types";
import React from "react";
import Row from "./Row";

const GameBoard = (props: GameBoardProps) => {
  const { board, currentRow, currentCol } = props;

  return (
    <div className="max-w-2xl mx-auto flex justify-center mt-10 items-center">
      <div className="grid gap-2">
        {board.map((row , rowIndex) => (
          <Row
            className=" grid grid-cols-5 gap-2"
            key={rowIndex}
            currentRow={currentRow}
            row={row}
            rowIndex={rowIndex}
            currentCol={currentCol}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
