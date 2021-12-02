import fs from "fs";

// parse input file
const input = fs.readFileSync("day_02.txt", "utf8");

// split input into array of lines
const lines = input.split("\n");

let hozPos = 0;
let depth = 0;

lines.forEach((line) => {
  const input = line.split(" ");
  const direction = input[0];
  switch (direction) {
    case "forward":
      hozPos += parseInt(input[1]);
      break;
    case "down":
      depth += parseInt(input[1]);
      break;
    case "up":
      depth -= parseInt(input[1]);
      break;
  }
});

const res = hozPos * depth;
console.log(res);
