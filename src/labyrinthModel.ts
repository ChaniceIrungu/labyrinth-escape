// model
export function findShortestPath(labyrinth: string[][]): number {
    const rows = labyrinth.length;
    const cols = labyrinth[0].length;
    let startRow = -1,
      startCol = -1,
      endRow = -1,
      endCol = -1;
    let startCount = 0, endCount = 0;
  
    // Find the start and end 
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (labyrinth[i][j] === "S") {
          startRow = i;
          startCol = j;
          startCount++;
        } else if (labyrinth[i][j] === "E") {
          endRow = i;
          endCol = j;
          endCount++;
        }
      }
    }
  

    if (startCount !== 1 || endCount !== 1) {
        console.log("Labyrinth must contain exactly one 'S' (Start) and one 'E' (Exit).");
        return -1;
      }

    // If there's no start or end point
    if (startRow === -1 || startCol === -1 || endRow === -1 || endCol === -1) {
      return -1;
    }
  
    // If start and end are the same
    if (startRow === endRow && startCol === endCol) {
      return 0;
    }
  
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
  
    const queue: [number, number, number][] = [[startRow, startCol, 0]];
    const visited = new Set<string>([`${startRow}${startCol}`]);
  
    while (queue.length > 0) {
      const [x, y, dist] = queue.shift()!;
  
      if (x === endRow && y === endCol) return dist;
  
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
  
    return -1; // No path found
  }
  
  
  // Validation for input
  export function validateLabyrinthRow(row: string[], expectedLength: number): { isValid: boolean, message: string } {
    // Check the row length
    if (row.length !== expectedLength) {
      return {
        isValid: false,
        message: `Row should have exactly ${expectedLength} values.`,
      };
    }
  
    // Initialize counters for start ('S') and end ('E') points
    let startCount = 0;
    let endCount = 0;
  
    // Validate each cell in the row
    for (const cell of row) {
      if (cell === 'S') {
        startCount++;
      } else if (cell === 'E') {
        endCount++;
      } else if (cell !== '0' && cell !== '1') {
        return {
          isValid: false,
          message: 'Invalid character detected. Use only "0", "1", "S", or "E".',
        };
      }
    }
  
    // Check for multiple start or end points
    if (startCount > 1) {
      return {
        isValid: false,
        message: 'More than one start point ("S") detected.',
      };
    }
  
    if (endCount > 1) {
      return {
        isValid: false,
        message: 'More than one end point ("E") detected.',
      };
    }
  
    return {
      isValid: true,
      message: 'Row is valid.',
    };
  }
  
  
  // Validator to check if labyrinth contains 'S' and 'E'
  export function validateLabyrinthStructure(labyrinth: string[][]): boolean {
    let startExists = false;
    let endExists = false;
  
    for (const row of labyrinth) {
      if (row.includes("S")) startExists = true;
      if (row.includes("E")) endExists = true;
    }
  
    return startExists && endExists;
  }
  