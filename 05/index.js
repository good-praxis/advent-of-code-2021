import fs from "fs";

// parse input file
const input = fs.readFileSync("day_03.txt", "utf8");

// split input into array of lines
const lines = input.split("\n");

let gamma = "";

for (let i = 0; i < lines[0].length; i++) {
  let ones = 0;
  let zeros = 0;
  lines.forEach((line) => {
    line[i] === "1" ? ones++ : zeros++;
  });
  ones > zeros ? (gamma += "1") : (gamma += "0");
}

let epsilon = "";

for (let bit of gamma) {
  bit === "1" ? (epsilon += "0") : (epsilon += "1");
}

console.log(parseInt(epsilon, 2) * parseInt(gamma, 2));
