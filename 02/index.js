import fs from "fs";

// parse input file
const input = fs.readFileSync("01/input.txt", "utf8");

// split input into array of lines
const lines = input.split("\n");

// turn input into array of numbers
const numbers = lines.map((line) => parseInt(line));

function countIncreasingGroupsOfNumbers(numbers) {
  let count = 0;
  for (let i = 1; i < lines.length - 3; i++) {
    const prevSum = numbers[i - 1] + numbers[i] + numbers[i + 1];
    const currSum = numbers[i] + numbers[i + 1] + numbers[i + 2];
    if (prevSum < currSum) {
      console.log(`${currSum} (increased)`);
      count++;
    } else {
      console.log(`${currSum} (decreased)`);
    }
  }

  return count;
}

const res = countIncreasingGroupsOfNumbers(numbers);
console.log(res);
