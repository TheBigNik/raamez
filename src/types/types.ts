/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from "react/jsx-runtime"

type TileStatus = "empty" | "correct" | "present" | "absent"
export interface TileProps {
    map(arg0: (row: any) => JSX.Element): import("react").ReactNode
    letter: string
    status: TileStatus
}

export interface GameBoardProps {
    board : TileProps
    currentRow: number
}

export interface RowProps {
    row: any
    rowIndex: number
    currentRow: number
    className: string
}

export interface GameTileProps {
    tile: any
}