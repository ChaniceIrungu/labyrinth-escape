import { findShortestPath } from '../src/labyrinthModel';

describe('findShortestPath', () => {
  
  test('should return the shortest path length in a simple labyrinth', () => {
    const labyrinth = [
      ['S', '0', '0', '0', 'E'],
      ['1', '1', '1', '1', '1'],
      ['0', '0', '0', '0', '0']
    ];
    expect(findShortestPath(labyrinth)).toBe(4);
  });

  test('should return -1 if no path exists', () => {
    const labyrinth = [
      ['S', '1', '1', '1', 'E'],
      ['1', '1', '1', '1', '1'],
      ['0', '0', '0', '0', '0']
    ];
    expect(findShortestPath(labyrinth)).toBe(-1);
  });

  test('should handle a labyrinth with only walls', () => {
    const labyrinth = [
      ['S', '1', '1'],
      ['1', '1', '1'],
      ['1', '1', 'E']
    ];
    expect(findShortestPath(labyrinth)).toBe(-1);
  });

  test('should handle a labyrinth where start and end are the same', () => {
    const labyrinth = [
      ['S', '0', '0'],
      ['0', '0', '0'],
      ['0', '0', 'S']
    ];
    expect(findShortestPath(labyrinth)).toBe(-1);
  });

  test('should return 0 for a labyrinth with immediate start and end', () => {
    const labyrinth = [
      ['S', 'E']
    ];
    expect(findShortestPath(labyrinth)).toBe(1);
  });

  test('should handle a labyrinth with no start point', () => {
    const labyrinth = [
      ['0', '0', 'E'],
      ['0', '0', '0']
    ];
    expect(findShortestPath(labyrinth)).toBe(-1);
  });

  test('should handle a labyrinth with no end point', () => {
    const labyrinth = [
      ['S', '0', '0'],
      ['0', '0', '0']
    ];
    expect(findShortestPath(labyrinth)).toBe(-1);
  });
  
});
