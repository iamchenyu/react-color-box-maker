import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

it("renders without crashing", () => {
  render(<BoxList />);
});

it("matches the snapshot", () => {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

it("removes the box after click the button", () => {
  const { queryByTestId } = render(<BoxList />);
  expect(queryByTestId("Lavender")).toBeInTheDocument();

  fireEvent.click(queryByTestId("Lavender-button"));

  expect(queryByTestId("Lavender")).not.toBeInTheDocument();
});

describe("tests for the form", () => {
  it("works: adds a new box", () => {
    const { queryByTestId, queryByLabelText } = render(<BoxList />);
    expect(queryByTestId("#6b8e23")).not.toBeInTheDocument();

    const colorInput = queryByLabelText("Color");
    const widthInput = queryByLabelText("Width");
    const heightInput = queryByLabelText("Height");
    const submitButton = queryByTestId("submit-form-button");

    fireEvent.change(colorInput, { target: { value: "#6b8e23" } });
    fireEvent.change(widthInput, { target: { value: "200" } });
    fireEvent.change(heightInput, { target: { value: "200" } });
    fireEvent.click(submitButton);

    expect(queryByTestId("#6b8e23")).toBeInTheDocument();
    expect(queryByTestId("#6b8e23")).toHaveStyle({
      backgroundColor: "#6b8e23",
      width: "200px",
      height: "200px",
    });
  });

  it("fails: invalid width/height", () => {
    const { queryByTestId, queryByLabelText } = render(<BoxList />);
    expect(queryByTestId("#db7093")).not.toBeInTheDocument();
    expect(queryByTestId("invalid-message")).not.toBeInTheDocument();

    const colorInput = queryByLabelText("Color");
    const widthInput = queryByLabelText("Width");
    const submitButton = queryByTestId("submit-form-button");

    fireEvent.change(colorInput, { target: { value: "#6b8e23" } });
    fireEvent.change(widthInput, { target: { value: "-200" } });
    fireEvent.click(submitButton);
    expect(queryByTestId("invalid-message")).toBeInTheDocument();
    expect(queryByTestId("#db7093")).not.toBeInTheDocument();
  });
});
