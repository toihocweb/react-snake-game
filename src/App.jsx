import { useState } from "react";
import "./App.css";
import SnakeGame from "./components/SnakeGame";

function App() {
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(3);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "width") {
      value < 3 ? setWidth(3) : setWidth(value);
    }
    if (name === "height") {
      value < 3 ? setHeight(3) : setHeight(value);
    }
  };

  return (
    <>
      <h2 className="text-lg">Configuration</h2>
      <div className="flex">
        <input
          type="number"
          className="border border-gray-400 p-1 outline-none"
          placeholder="Enter width"
          value={width}
          onChange={handleChange}
          name="width"
        />
        <input
          type="number"
          className="border border-gray-400 p-1 outline-none"
          placeholder="Enter height"
          value={height}
          onChange={handleChange}
          name="height"
        />
        <button className="bg-cyan-500 text-white p-1 w-20 outline-none">
          Set
        </button>
      </div>
      <div>
        <SnakeGame />
      </div>
    </>
  );
}

export default App;
