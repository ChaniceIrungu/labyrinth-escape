import { findShortestPath, parseLabyrinthInput } from '../src/labyrinth';

describe('Labyrinth Escape', () => {
    test('should return the shortest path length for a simple labyrinth', () => {
        const labyrinth = parseLabyrinthInput(`S01E
                                               10101
                                               10000
                                               00111
                                               00000`);
        expect(findShortestPath(labyrinth)).toBe(8);
    });

    test('should return -1 when no path is possible', () => {
        const labyrinth = parseLabyrinthInput(`S01E
                                               11111
                                               10000
                                               00111
                                               00000`);
        expect(findShortestPath(labyrinth)).toBe(-1);
    });

    test('should return the shortest path length for an adjacent start and end', () => {
        const labyrinth = parseLabyrinthInput(`SE
                                               00`);
        expect(findShortestPath(labyrinth)).toBe(1);
    });

    test('should return the correct path length when there are multiple paths', () => {
        const labyrinth = parseLabyrinthInput(`S010E
                                               00010
                                               00100
                                               00000`);
        expect(findShortestPath(labyrinth)).toBe(7);
    });
});
