import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";
import "./BoxList.css";

const BoxList = () => {
  const INITIAL_STATE = [
    { id: uuid(), color: "DarkSeaGreen", width: "150px", height: "150px" },
    { id: uuid(), color: "LavenderBlush", width: "100px", height: "200px" },
    { id: uuid(), color: "Lavender", width: "300px", height: "200px" },
    { id: uuid(), color: "LightSalmon", width: "200px", height: "100px" },
  ];

  const [boxes, setBoxes] = useState(INITIAL_STATE);

  const removeBoxHandler = (removeId) => {
    setBoxes(boxes.filter((box) => box.id !== removeId));
  };

  const addBoxHandler = ({ color, width, height }) => {
    width = width + "px";
    height = height + "px";
    setBoxes((boxes) => [...boxes, { id: uuid(), color, width, height }]);
  };

  const renderBox = boxes.map(({ id, color, width, height }) => (
    <Box
      key={id}
      id={id}
      color={color}
      width={width}
      height={height}
      removeBox={removeBoxHandler}
    />
  ));

  return (
    <>
      <NewBoxForm addBox={addBoxHandler} />
      <div className="BoxList">{renderBox}</div>
    </>
  );
};

export default BoxList;
