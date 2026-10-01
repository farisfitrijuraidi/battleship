import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SquareGrid } from "./SquareGrid";

describe("SquareGrid component", () => {
  it("renders exactly 100 board squares", () => {
    render(<SquareGrid />);

    expect(screen.getAllByRole("button").length).toEqual(100);
  });

  it('contains the specific square', () => {
    render(<SquareGrid />);

    expect(screen.getByRole("button", { name : "0,0"})).toBeInTheDocument();
  })
});