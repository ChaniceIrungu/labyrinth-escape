# Labyrinth Shortest Path

This project implements a labyrinth solver that finds the shortest path from a start point ('S') to an end point ('E') in a given grid, where walls are represented by '1' and open paths by '0'. The program validates user input, constructs the labyrinth, and then uses a breadth-first search algorithm to determine the shortest path, returning the length of the path or -1 if no path exists. The project also utilizes a CLI allowing the user to input labyrinth structure and receive the result directly in the terminal.

![alt text](src/assets/Labyrinth_CLI.png)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ChaniceIrungu/labyrinth-escape.git
   ```

2. Navigate to the `labyrinth-escape` directory.

3. Install dependencies:

   ```bash
   npm install
   ```

## Running the Application

1. Execute the following command to run the app in development mode:

   ```bash
   npm run dev
   ```

   **OR**

2. Execute the following command to build and run the app:

   ```bash
   npm run build
   npm start
   ```

## Testing

 Execute the following command to run the tests

   ```bash
   npm test
   ```

![alt text](src/assets/tests.png)
