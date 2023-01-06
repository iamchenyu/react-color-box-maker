import React from "react";
import "./Box.css";

const Box = ({ id, color, width, height, removeBox }) => {
  const style = { backgroundColor: color, width: width, height: height };
  return (
    <div style={style} className="Box" data-testid={color}>
      <button
        role="button"
        className="Box-button"
        onClick={() => removeBox(id)}
        data-testid={color + "-button"}
      >
        X
      </button>
    </div>
  );
};

export default Box;
