type TileStatus = "empty" | "correct" | "present" | "absent"
export interface TileProps {
    letter: string
    status: TileStatus
}