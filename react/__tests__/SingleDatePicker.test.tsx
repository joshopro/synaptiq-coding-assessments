import { fireEvent, render } from "@testing-library/react";
import { SingleDatePicker } from "../stories/SingleDatePicker";

const CURRENT_DATE = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getPreviousMonthAndYear = (month: number, year: number) => {
  if (month === 0) return `${months[months.length - 1]} ${year - 1}`;
  return `${months[month - 1]} ${year}`;
};

const getNextMonthAndYear = (month: number, year: number) => {
  if (month === 11) return `${months[0]} ${year + 1}`;
  return `${months[month + 1]} ${year}`;
};

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

  const onMonthChange = jest.fn();

  it("renders without crashing", () => {
    const { container } = render(
      <SingleDatePicker onDateChange={onDateChange} />
    );
    expect(container).toBeInTheDocument();
  });

  it("should render input field", () => {
    const { container } = render(
      <SingleDatePicker onDateChange={onDateChange} />
    );
    const input = container.querySelector("input");

    expect(input).toBeInTheDocument();
  });

  it("should not render calendar initially", () => {
    const { container } = render(
      <SingleDatePicker onDateChange={onDateChange} />
    );
    const calendar = container.querySelector(".Polaris-DatePicker");

    expect(calendar).not.toBeInTheDocument();
  });

  it("should render calender on input click", () => {
    const { container } = render(
      <SingleDatePicker onDateChange={onDateChange} />
    );
    const input = container.querySelector("input");

    fireEvent.click(input!);

    const calender = container.querySelector(".Polaris-DatePicker");

    expect(calender).toBeInTheDocument();
  });

  it("should call onChange function", () => {
    const { container, getByText } = render(
      <SingleDatePicker onDateChange={onDateChange} />
    );
    const input = container.querySelector("input");

    fireEvent.click(input!);

    const dateElement = getByText("15");
    fireEvent.click(dateElement);

    expect(onDateChange).toHaveBeenCalled();
  });

  it("should call onMonthChange function", () => {
    const { container } = render(
      <SingleDatePicker
        onDateChange={onDateChange}
        onMonthChange={onMonthChange}
      />
    );
    const previousMontAndYear = getPreviousMonthAndYear(
      CURRENT_DATE.getMonth(),
      CURRENT_DATE.getFullYear()
    );
    const input = container.querySelector("input");

    fireEvent.click(input!);

    const button = container.querySelector(
      `[aria-label="Show previous month, ${previousMontAndYear}"]`
    );

    fireEvent.click(button!);

    expect(onMonthChange).toHaveBeenCalled();
  });

  it("should show current month and year calendar", async () => {
    const { container } = render(
      <SingleDatePicker onDateChange={onDateChange} />
    );
    const input = container.querySelector("input");
    fireEvent.click(input!);
    expect(input).toHaveFocus();
    const monthAndYear = container.querySelector(
      ".Polaris-DatePicker__Title"
    )!.textContent;
    expect(monthAndYear).toBe(
      `${months[CURRENT_DATE.getMonth()]} ${CURRENT_DATE.getFullYear()}`
    );
  });

  it("should show previous month and year calendar", async () => {
    const { container } = render(
      <SingleDatePicker onDateChange={onDateChange} />
    );
    const input = container.querySelector("input");
    fireEvent.click(input!);
    expect(input).toHaveFocus();
    const previousMontAndYear = getPreviousMonthAndYear(
      CURRENT_DATE.getMonth(),
      CURRENT_DATE.getFullYear()
    );
    const backBtn = container.querySelector(
      `[aria-label="Show previous month, ${previousMontAndYear}"]`
    );
    fireEvent.click(backBtn!);
    const monthAndYear = container.querySelector(
      ".Polaris-DatePicker__Title"
    )!.textContent;
    expect(monthAndYear).toBe(previousMontAndYear);
  });

  it("should show next month and year calendar", async () => {
    const { container } = render(
      <SingleDatePicker onDateChange={onDateChange} />
    );
    const input = container.querySelector("input");
    fireEvent.click(input!);
    expect(input).toHaveFocus();
    const nextMontAndYear = getNextMonthAndYear(
      CURRENT_DATE.getMonth(),
      CURRENT_DATE.getFullYear()
    );
    const nextBtn = container.querySelector(
      `[aria-label="Show next month, ${nextMontAndYear}"]`
    );
    fireEvent.click(nextBtn!);
    const monthAndYear = container.querySelector(
      ".Polaris-DatePicker__Title"
    )!.textContent;
    expect(monthAndYear).toBe(nextMontAndYear);
  });
});
