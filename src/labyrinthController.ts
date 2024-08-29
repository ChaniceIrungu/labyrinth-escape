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

  const promptUserForNumber = (question: string, callback: (num: number) => void): void => {
    rl.question(question, (input) => {
      const num = parseInt(input, 10);
      if (isNaN(num) || num <= 0) {
        console.log("**Error: Please enter a valid positive number.**");
        promptUserForNumber(question, callback); // Prompt again if input is invalid
      } else {
        callback(num); // Pass the valid number to the callback
      }
    });
  };

  promptUserForNumber("Please enter the number of rows in your labyrinth: ", (rowCount) => {
    promptUserForNumber("Now, enter the number of columns: ", (colCount) => {

      printInstructions();

      const labyrinth: string[][] = [];
      let rowIndex = 0;

      const getRowInput = (): void => {
        if (rowIndex < rowCount) {
          rl.question(`Row ${rowIndex + 1} => `, (rowInput) => {
            const row = rowInput.split(",").map((cell) => cell.trim());
            const rowNumber = rowIndex + 1;

            const result = validateLabyrinthRow(row, colCount, rowNumber);
            if (!result.isValid) {
              console.log(result.message); 
              getRowInput(); // Prompt for the same row again if it's invalid
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
              `**Error: Your labyrinth must contain exactly one 'S' (Start) and one 'E' (Exit). Please start over.`
            );
            return;
          }

          printLabyrinthCreatedMessage();
          displayLabyrinth(labyrinth);
          const result = findShortestPath(labyrinth);
          printResultMessage(result);
        }
      };

      getRowInput(); // Start prompting for row input
    });
  });

  rl.on('close', () => {
    console.log("Thank you for using the Labyrinth Solver!");
  });
}
