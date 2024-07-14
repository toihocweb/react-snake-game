import { useState } from "react";
import "./App.css";
import SnakeGame from "./components/SnakeGame";
import { MIN_CELL, SQUARE_SIZE } from "./config";

function App() {
  const [width, setWidth] = useState(SQUARE_SIZE * MIN_CELL);
  const [height, setHeight] = useState(SQUARE_SIZE * MIN_CELL);

  return (
    <div className="p-5">
      <h2 className="text-lg">Configuration</h2>
      <div className="flex">
        <input
          type="number"
          className="border border-gray-400 p-1 outline-none"
          placeholder="Enter width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <input
          type="number"
          className="border border-gray-400 p-1 outline-none"
          placeholder="Enter height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div>
        <SnakeGame width={width} height={height} />
      </div>
    </div>
  );
}

export default App;
