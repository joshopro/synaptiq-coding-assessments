import { render } from "@testing-library/react";
import { SingleDatePicker } from "../stories/SingleDatePicker";

describe("SingleDatePicker component", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  const onDateChange = jest.fn();

  it("renders without crashing", () => {
    render(<SingleDatePicker onDateChange={onDateChange} />);
  });
});
