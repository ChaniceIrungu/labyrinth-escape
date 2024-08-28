// view/interface
// Display.ts

export function displayLabyrinth(labyrinth: string[][]): void {
    labyrinth.forEach((row) => {
      console.log(row.join("\t"));
    });
  }
  
  export function printWelcomeMessage(message: string): void {
    const border = "*".repeat(33);
    const emptyLine = `*${" ".repeat(31)}*`;
    const messageLine = `* ${message}  *`;
  
    console.log(border);
    console.log(emptyLine);
    console.log(messageLine);
    console.log(emptyLine);
    console.log(border);
  }
  
  export function printInstructions(): void {
    console.log(`\n${">".repeat(50)}`);
    console.log(
      `Your labyrinth layout is a 2D array. Enter each row individually with cells separated by commas.\n`
    );
    console.log("Use the following values:");
    console.log("    0 - Open Path");
    console.log("    1 - Wall");
    console.log("    S - Start Point");
    console.log("    E - Exit Point");
    console.log("Example: S,0,1,0,E (for a row in a labyrinth with 5 columns)\n");
    console.log(`${">".repeat(50)}`);
  }
  
  export function printResultMessage(result: number): void {
    console.log(">".repeat(50));
    console.log(`Shortest path from "S" to "E" is: ${result}`);
    console.log(">".repeat(50));
  }
  
  export function printLabyrinthCreatedMessage(): void {
    console.log(">".repeat(50));
    console.log("Here's the labyrinth you created!\n");
    console.log(">".repeat(50));
  }
  