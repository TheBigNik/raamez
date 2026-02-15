"use client";

import React from "react";

type KeyboardProps = {
  onKeyPress: (key: string) => void;
  onEnter: () => void;
  onDelete: () => void;
};

const KEYBOARD_ROWS: string[][] = [
  ["ض", "ص", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "چ"],
  ["ش", "س", "ی", "ب", "ل", "ا", "ت", "ن", "م", "ک", "گ"],
  ["ظ", "ط", "ژ", "ز", "ر", "ذ", "د", "پ", "و", "ث"],
];

export default function Keyboard({
  onKeyPress,
  onEnter,
  onDelete,
}: KeyboardProps) {
  return (
    <div className="w-full max-w-xl mx-auto mb-20 mt-8 md:mt-20 select-none">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center flex-row-reverse gap-1 mb-2"
        >
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className="flex-1 p-1 rounded-lg bg-gray-300 dark:bg-gray-700 text-lg font-bold active:scale-95 transition"
            >
              {key}
            </button>
          ))}
          {rowIndex === 2 && (
            <>
              <button
                onClick={onDelete}
                className="p-2 rounded-lg bg-red-700 dark:bg-red-500 text-white text-sm font-bold active:scale-95 transition"
              >
                ⌫
              </button>
            </>
          )}
        </div>
      ))}
      <button
        onClick={onEnter}
        className="px-10 py-2 absolute left-1/2 -translate-x-1/2 rounded-lg bg-green-500 md:w-100 text-white text-sm font-bold active:scale-95 transition"
      >
        ثبت
      </button>
    </div>
  );
}
