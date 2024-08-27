import readline from 'readline';

export function findShortestPath(labyrinth: string[][]): number {
    const rows = labyrinth.length;
    const cols = labyrinth[0].length;
    let startRow = 0, startCol = 0, endRow = 0, endCol = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (labyrinth[i][j] === 'S') {
                startRow = i;
                startCol = j;
            } else if (labyrinth[i][j] === 'E') {
                endRow = i;
                endCol = j;
            }
        }
    }


    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    const queue: [number, number, number][] = [[startRow, startCol, 0]];
    const visited = new Set<string>([`S${startRow}${startCol}`]);

    while (queue.length > 0) {
        const [x, y, dist] = queue.shift()!;

        if (x === endRow && y === endCol) return dist + 1; 

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && labyrinth[newX][newY] !== '1' && !visited.has(`S${newX}${newY}`)) {
                queue.push([newX, newY, dist + 1]);
                visited.add(`S${newX}${newY}`);
            }
        }
    }

    // No path found
    return -1;
}

export function parseLabyrinthInput(input: string): string[][] {
    return input.split('\n').map(line => line.trim().split(''));
}

function main() {
    // welcome message
    printWelcomeMessage();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let input = '';
    console.log(' >> Enter labyrinth rows, and type "END" when done:');

    rl.on('line', (line) => {
        if (line === 'END') {
            rl.close();
        } else {
            input += line + '\n';
        }
    });

    rl.on('close', () => {
        const labyrinth = parseLabyrinthInput(input);
        const result = findShortestPath(labyrinth);
        console.log(`>> Shortest path from "S" to "E" is: ${result}`);
    });
}

function printWelcomeMessage() {
    const border = '*'.repeat(33);
    const emptyLine = `*${' '.repeat(31)}*`;
    const messageLine = `*  Welcome to Labyrinth Solver! *`;

    console.log('\n');
    console.log(border);
    console.log(emptyLine);
    console.log(messageLine);
    console.log(emptyLine);
    console.log(border);
    console.log("")
}

main();