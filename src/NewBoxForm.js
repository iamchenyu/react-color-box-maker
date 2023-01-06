import React, { useState } from "react";
import "./NewBoxForm.css";

const NewBoxForm = ({ addBox }) => {
  const INITIAL_STATE = {
    color: "#7B68EE",
    width: "200",
    height: "200",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const width = e.target.children[1].children[1].value;
    const height = e.target.children[2].children[2].value;
    if (width <= 0 || height <= 0) {
      setIsValid(false);
    } else {
      addBox(formData);
      setFormData(INITIAL_STATE);
      setIsValid(true);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="NewBoxForm">
      <div className="NewBoxForm-input-group">
        <label htmlFor="color">Color</label>
        <input
          type="color"
          name="color"
          id="color"
          value={formData.color}
          onChange={handleChange}
        />
      </div>
      <div className="NewBoxForm-input-group">
        <label htmlFor="width">Width</label>
        <input
          type="number"
          name="width"
          id="width"
          value={formData.width}
          onChange={handleChange}
        />
        <span>px</span>
      </div>
      <div className="NewBoxForm-input-group">
        <label htmlFor="height">Height</label>
        <input
          type="number"
          name="height"
          id="height"
          value={formData.height}
          onChange={handleChange}
        />
        <span>px</span>
      </div>
      {!isValid && <p data-testid="invalid-message">Invalid width or height</p>}
      <button data-testid="submit-form-button">Create a box</button>
    </form>
  );
};

export default NewBoxForm;
