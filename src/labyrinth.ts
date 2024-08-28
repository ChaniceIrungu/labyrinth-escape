import readline from "readline";

export function findShortestPath(labyrinth: string[][]): number {
  const rows = labyrinth.length;
  const cols = labyrinth[0].length;
  let startRow = 0,
    startCol = 0,
    endRow = 0,
    endCol = 0;

 
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (labyrinth[i][j] === "S") {
        startRow = i;
        startCol = j;
      } else if (labyrinth[i][j] === "E") {
        endRow = i;
        endCol = j;
      }
    }
  }


  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const queue: [number, number, number][] = [[startRow, startCol, 0]];
  const visited = new Set<string>([`S${startRow}${startCol}`]);

  while (queue.length > 0) {
    const [x, y, dist] = queue.shift()!;

   
    if (x === endRow && y === endCol) return dist

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

   
      if (
        newX >= 0 &&
        newX < rows &&
        newY >= 0 &&
        newY < cols &&
        labyrinth[newX][newY] !== "1" &&
        !visited.has(`S${newX}${newY}`)
      ) {
        queue.push([newX, newY, dist + 1]);
        visited.add(`S${newX}${newY}`);
      }
    }
  }

  // No path found
  return -1;
}

function main() {
  // Welcome message
  printWelcomeMessage("Welcome to Labyrinth Solver!");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("How many rows does your labyrinth have? ", (rows) => {
    rl.question("How many columns does your labyrinth have? ", (cols) => {
      const rowCount = parseInt(rows);
      const colCount = parseInt(cols);

      printInstructions();

      const labyrinth: string[][] = [];
      let rowIndex = 0;

      const getRowInput = () => {
        if (rowIndex < rowCount) {
          rl.question(`Row ${rowIndex + 1}: `, (rowInput) => {
            const row = rowInput.split(",").map((cell) => cell.trim());

            if (row.length !== colCount) {
              console.log(
                `Row ${
                  rowIndex + 1
                } should have ${colCount} values. Please try again.`
              );
              getRowInput();
            } else {
              labyrinth.push(row);
              rowIndex++;
              getRowInput();
            }
          });
        } else {
          rl.close();
          console.log(">".repeat(50));
          console.log("Here's the labyrinth you created!\n");
          displayLabyrinth(labyrinth);
          const result = findShortestPath(labyrinth);
          console.log(">".repeat(50));
          console.log(`Shortest path from "S" to "E" is: ${result}`);
          console.log(">".repeat(50));
        }
      };

      getRowInput();
    });
  });
}
function displayLabyrinth(labyrinth: string[][]) {
  labyrinth.forEach((row) => {
    console.log(row.join("\t"));
  });
}

function printWelcomeMessage(message: String) {
  const border = "*".repeat(33);
  const emptyLine = `*${" ".repeat(31)}*`;
  const messageLine = `* ${message}  *`;

  console.log(border);
  console.log(emptyLine);
  console.log(messageLine);
  console.log(emptyLine);
  console.log(border);
  console.log("\n");
}

function printInstructions() {
  console.log(`\n${">".repeat(50)}`);
  console.log(
    ` Your labyrinth layout is a 2D array\n enter each row individually with cells separated by commas. \n`
  );
  console.log("Use the following values:");
  console.log("    0 - Open Path");
  console.log("    1 - Wall");
  console.log("    S - Start Point");
  console.log("    E - Exit Point");
  console.log("Example: S,0,0,0,E (for a row in a labyrinth with 5 columns)\n");
  console.log(`${">".repeat(50)}`);
}
main();
