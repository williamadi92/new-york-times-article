import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  it("renders input with initial value", () => {
    render(<SearchBar inputValue="react" onChange={() => {}} />);
    const input = screen.getByPlaceholderText("Search articles...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("react");
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(<SearchBar inputValue="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Search articles...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalledWith("test");
  });
});
