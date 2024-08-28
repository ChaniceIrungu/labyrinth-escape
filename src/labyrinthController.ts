// controller
import readline from "readline";
import { findShortestPath, validateLabyrinthRow, validateLabyrinthStructure } from "./labyrinthModel";
import { displayLabyrinth, printWelcomeMessage, printInstructions, printResultMessage, printLabyrinthCreatedMessage} from "./interface";

export function startNewSession(): void {
  printWelcomeMessage("Welcome to Labyrinth Solver!");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Please enter the number of rows in your labyrinth: ", (rows) => {
    rl.question("Now, enter the number of columns: ", (cols) => {
      const rowCount = parseInt(rows);
      const colCount = parseInt(cols);

      printInstructions();

      const labyrinth: string[][] = [];
      let rowIndex = 0;

      const getRowInput = (): void => {
        if (rowIndex < rowCount) {
          rl.question(`Row ${rowIndex + 1} => `, (rowInput) => {
            const row = rowInput.split(",").map((cell) => cell.trim());

            const result = validateLabyrinthRow(row, colCount)
            if (!result.isValid) {
              console.log(result.message); 
              getRowInput();
            } else {
              labyrinth.push(row);
              rowIndex++;
              getRowInput();
            }
          });
        } else {
          rl.close();

          if (!validateLabyrinthStructure(labyrinth)) {
            console.log(
              `"Your labyrinth must contain exactly one 'S' (Start) and one 'E' (Exit). Please start over."`
            );
            return;
          }

          printLabyrinthCreatedMessage();
          displayLabyrinth(labyrinth);
          const result = findShortestPath(labyrinth);
          printResultMessage(result);
        }
      };

      getRowInput();
    });
  });

  rl.on('close', () => {
    console.log("Thank you for using the Labyrinth Solver!");
  });
}
