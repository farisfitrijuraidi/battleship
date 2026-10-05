import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SquareGrid } from "./SquareGrid";
import userEvent from '@testing-library/user-event';

describe("SquareGrid component", () => {
  it("renders exactly 100 board squares", () => {
    render(<SquareGrid />);

    expect(screen.getAllByRole("button").length).toEqual(100);
  });

  it('contains the specific square', () => {
    render(<SquareGrid />);

    expect(screen.getByRole("button", { name : "0,0"})).toBeInTheDocument();
  });

  // it('verifies cell status classes', () => {
  //   const ship = {getLength() : 3};
  //   const mockShipArray = [{instance : ship, coordinate: [[3, 3],[3, 4],[3, 5]]}]

  //   render(<SquareGrid ship={mockShipArray} hit={[[3, 3], [3, 4]]} miss={[[2, 3], [2, 4]]}/>);

  //   expect(screen.getByRole("button", { name : "3,3"})).toHaveClass('grid-cell hit');
  //   expect(screen.getByRole("button", { name : "3,4"})).toHaveClass('grid-cell hit');
  //   expect(screen.getByRole("button", { name : "3,5"})).toHaveClass('grid-cell ship');
  //   expect(screen.getByRole("button", { name : "2,3"})).toHaveClass('grid-cell miss');
  //   expect(screen.getByRole("button", { name : "9,9"})).toHaveClass('grid-cell water');
  // });

  it('verifies click callback coordinates', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<SquareGrid ship={[]} hit={[]} miss={[]} onClick={handleClick}/>);
    const button = screen.getByRole("button", { name : "4,2"});

    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledExactlyOnceWith([4,2]);
  });

  it('verifies disabled state on attacked squares', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<SquareGrid ship={[]} hit={[[0, 0]]} miss={[]} onClick={handleClick}/>);
    const button = screen.getByRole("button", { name : "0,0"});

    await user.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });
});