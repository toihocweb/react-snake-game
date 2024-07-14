import { useEffect, useRef, useState } from "react";
import {
  APPLE_START,
  DIRECTIONS,
  OPPOSITE_DIRECTIONS,
  SNAKE_START,
  SPEED,
  SQUARE_SIZE,
} from "../config";
import { useInterval } from "../hooks/useInterval";

const SnakeGame = ({ width, height }) => {
  const canvasRef = useRef(null);
  const gameContainerRef = useRef(null);

  const [speed, setSpeed] = useState(null);
  const [snakeArr, setSnakeArr] = useState(SNAKE_START);
  const [apple, setApple] = useState([]);
  const [direction, setDirection] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setWin] = useState(false);
  const [started, setStarted] = useState(false);

  useInterval(() => gameLoop(), speed);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    // Set the scaling transformation
    context.setTransform(SQUARE_SIZE, 0, 0, SQUARE_SIZE, 0, 0);

    // Clear the canvas
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Draw the snake
    context.fillStyle = "#2ecc71";
    snakeArr.forEach(([x, y]) => context.fillRect(x, y, 1, 1));

    // Draw the apple
    context.fillStyle = "#e74c3c";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snakeArr, apple, gameOver]);

  // generate apple
  const generateApple = () => [
    Math.floor(Math.random() * (width / SQUARE_SIZE)),
    Math.floor(Math.random() * (height / SQUARE_SIZE)),
  ];

  // GAME over
  const endGame = () => {
    console.log("❌ game over");
    setGameOver(true);
    setStarted(false);
    setSpeed(null);
  };

  // WIN game
  const winGame = () => {
    console.log("✅ win game");
    setStarted(false);
    setSpeed(null);
    setWin(true);
    setApple([]);
  };

  const moveSnake = ({ keyCode }) => {
    // Check if the keyCode is one of the arrow keys
    if (keyCode >= 37 && keyCode <= 40) {
      const newDirection = DIRECTIONS[keyCode];
      const [currentDirX, currentDirY] = direction;

      // Check if the new direction is not opposite to the current direction
      if (
        snakeArr.length > 1 &&
        OPPOSITE_DIRECTIONS[keyCode] ===
          getKeyFromDirection(currentDirX, currentDirY)
      ) {
        return;
      }

      setDirection(newDirection);
    }
  };

  //  Function to get the key code from the current direction
  const getKeyFromDirection = (dirX, dirY) => {
    for (const [key, [dx, dy]] of Object.entries(DIRECTIONS)) {
      if (dx === dirX && dy === dirY) {
        return parseInt(key);
      }
    }
    return null;
  };

  const startGame = () => {
    gameContainerRef.current.focus();
    setStarted(true);
    setWin(false);
    setGameOver(false);
    setSpeed(SPEED);
    setSnakeArr(SNAKE_START);
    setApple(APPLE_START);
    setDirection([1, 0]);
  };

  const checkCollision = (head, snake = snakeArr) => {
    const [headX, headY] = head;

    // Check if the snake is out of bounds
    if (
      headX < 0 ||
      headX * SQUARE_SIZE >= width ||
      headY < 0 ||
      headY * SQUARE_SIZE >= height
    ) {
      console.log("out of bounds");
      return true;
    }

    // Check if the snake collides with itself
    for (const segment of snake) {
      const [segmentX, segmentY] = segment;
      if (headX === segmentX && headY === segmentY) {
        console.log("collides with itself");

        return true;
      }
    }

    return false;
  };

  const checkAppleCollision = (snake) => {
    const [headX, headY] = snake[0];
    const [appleX, appleY] = apple;

    // Check if the snake's head is at the same position as the apple
    if (headX === appleX && headY === appleY) {
      let newApple;

      // Generate a new apple position that does not collide with the snake
      do {
        newApple = generateApple();
      } while (checkCollision(newApple, snake));

      // Update the apple state with the new position
      setApple(newApple);
      return true;
    }

    return false;
  };

  const gameLoop = () => {
    const snakeClone = [...snakeArr];
    const [headX, headY] = snakeClone[0];
    const [dirX, dirY] = direction;
    const newHead = [headX + dirX, headY + dirY];
    snakeClone.unshift(newHead);
    // End game if collision
    if (checkCollision(newHead)) {
      endGame();
      return;
    }
    // Check if apple is eaten
    if (!checkAppleCollision(snakeClone)) {
      console.log("🍎 eat apple");
      if (
        snakeClone.length + 1 >=
        (width / SQUARE_SIZE) * (height / SQUARE_SIZE)
      ) {
        setSnakeArr([apple, ...snakeClone]);
        winGame();
        return;
      } else {
        snakeClone.pop();
      }
    }

    setSnakeArr(snakeClone);
  };

  return (
    <div
      ref={gameContainerRef}
      onKeyDown={moveSnake}
      className="mt-5 relative inline-block"
      role="button"
      tabIndex="0"
    >
      <canvas
        width={width}
        height={height}
        className="border border-gray-400"
        ref={canvasRef}
      />
      {!started && (
        <div className="absolute top-0 left-0 items-center flex justify-center bg-black w-full h-full opacity-50">
          <div className="text-center">
            <h2 className="text-2xl mb-3 text-white">
              {gameOver ? "You lose" : gameWin ? "You win" : "Let's play"}
            </h2>
            <button
              onClick={startGame}
              className="bg-cyan-700 text-white p-1 w-20 outline-none rounded"
            >
              Start
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
