export type TileStatus = "empty" | "correct" | "present" | "absent";

/* =========================
   DATA MODELS
========================= */

export interface Tile {
  letter: string;
  status: TileStatus;
}

/* =========================
   COMPONENT PROPS
========================= */

export interface GameBoardProps {
  board: Tile[][];
  currentRow: number;
  currentCol: number;
}

export interface RowProps {
  row: Tile[];
  rowIndex: number;
  currentRow: number;
  currentCol: number;
  className: string;
}

export interface TileComponentProps {
  tile: Tile;
}

export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}
