const DIRECTIONS = {
  37: [-1, 0], // left
  38: [0, -1], // up
  39: [1, 0], //   right
  40: [0, 1], //  down
};

const OPPOSITE_DIRECTIONS = {
  37: 39, // Left is opposite to Right
  38: 40, // Up is opposite to Down
  39: 37, // Right is opposite to Left
  40: 38, // Down is opposite to Up
};
const SPEED = 1000; // ms
const APPLE_START = [2, 2];
const SNAKE_START = [
  [2, 0],
  [1, 0],
  [0, 0],
];
const SQUARE_SIZE = 40;

const MIN_CELL = 10;

export {
  DIRECTIONS,
  SPEED,
  SNAKE_START,
  APPLE_START,
  OPPOSITE_DIRECTIONS,
  SQUARE_SIZE,
  MIN_CELL,
};
