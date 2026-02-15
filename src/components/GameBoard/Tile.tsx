import { TileComponentProps } from "@/types/types";
import React from "react";

const Tile = (props: TileComponentProps) => {
  const { tile } = props;
  return (
    <div>
        <div 
        className={`rounded-xs border dark:border-gray-700/40 border-gray-400/40 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex justify-center gap-2 items-center text-2xl ${tile.status === "correct" ? "bg-green-500" : tile.status === "present" ? "bg-yellow-500" : tile.status === "absent" ? "bg-red-700 dark:bg-red-600" : ""}`}>
            {tile.letter}
        </div>
    
    </div>
  );
};

export default Tile;
