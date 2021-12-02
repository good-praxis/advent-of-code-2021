import fs from "fs";

// parse input file
const input = fs.readFileSync("01/input.txt", "utf8");

// split input into array of lines
const lines = input.split("\n");

function countIncreasedNumbers(lines) {
  let count = 0;
  for (let i = 0; i < lines.length - 1; i++) {
    const prevLine = i == 0 ? 0 : lines[i - 1];
    const currLine = lines[i];
    if (prevLine < currLine) {
      count++;
    }
  }

  return count;
}

const res = countIncreasedNumbers(lines);
console.log(res);
