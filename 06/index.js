import fs from "fs";

// parse input file
const input = fs.readFileSync("day_03.txt", "utf8");

// split input into array of lines
const lines = input.split("\n");

let oxygen_generator_rating = "";

function get_oxygen_rating(lines, preset = 1) {
  for (let i = 0; lines.length > 1; i++) {
    let pos = 0;

    for (let line of lines) {
      // count positive bits in position i
      if (line[i] === "1") {
        pos++;
      }
    }

    // if there are more than half of lines with a 1 in position i,
    // then filter lines with a 1 in position i
    if (pos > lines.length / 2) {
      lines = lines.filter((line) => line[i] === "1");
    } else if (pos < lines.length / 2) {
      lines = lines.filter((line) => line[i] === "0");
    } else {
      // if the amount of 1s and 0s is equal,
      // then use preset
      lines = lines.filter((line) => line[i] === preset.toString());
    }
  }

  return lines;
}

function get_co2_scrubber_rating(lines, preset = 0) {
  for (let i = 0; lines.length > 1; i++) {
    let pos = 0;

    for (let line of lines) {
      // count positive bits in position i
      if (line[i] === "1") {
        pos++;
      }
    }

    // if there are more than half of lines with a 1 in position i,
    // then filter lines with a 0 in position i
    if (pos > lines.length / 2) {
      lines = lines.filter((line) => line[i] === "0");
    } else if (pos < lines.length / 2) {
      lines = lines.filter((line) => line[i] === "1");
    } else {
      // if the amount of 1s and 0s is equal,
      // then use preset
      lines = lines.filter((line) => line[i] === preset.toString());
    }
  }

  return lines;
}

console.log(
  parseInt(get_oxygen_rating(lines, 1), 2) *
    parseInt(get_co2_scrubber_rating(lines, 0), 2)
);
