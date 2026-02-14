import { RowProps } from "@/types/types";
import React from "react";
import Tile from "./Tile";

const Row = (props: RowProps) => {
  const { row, rowIndex, currentRow, className } = props;
  return (
    <div className={className}>
      {row.map((tile, colIndex) => (
        <Tile tile={tile} key={colIndex} />
      ))}
    </div>
  );
};

export default Row;
