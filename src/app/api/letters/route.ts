import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "src/db/big.txt")

        const fileContent = fs.readFileSync(filePath, "utf-8")

        const words = fileContent
        .split("\n")
        .map(word => word.trim())
        .filter(word => word.length === 5)

        return NextResponse.json(words)
    } catch (error) {
        return NextResponse.json({
            error: "can't fetch words: " + error,
            status: 500
        })
    }
}