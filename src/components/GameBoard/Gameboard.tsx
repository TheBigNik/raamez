import { GameBoardProps } from "@/types/types";
import React from "react";
import Row from "./Row";

const GameBoard = (props: GameBoardProps) => {
  const { board, currentRow } = props;

  return (
    <div className="max-w-2xl mx-auto flex justify-center mt-10 items-center">
      <div className="grid gap-2">
        {board.map((row: unknown, rowIndex: React.Key | null | undefined) => (
          <Row
            className=" grid grid-cols-5 gap-2"
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            currentRow={currentRow}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
