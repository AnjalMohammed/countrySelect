import { render, screen, fireEvent } from "@testing-library/react";
import { ListOption } from "../data/interfaces";
import { useDataContext } from "../data/context";
import { Dropdown } from "../Components/Custom/CustomDropdown";
import { useOutsideClick } from "../Components/Custom/cutsomHooks";

jest.mock("../data/context", () => ({
  useDataContext: jest.fn(),
}));

jest.mock("../Components/Custom/cutsomHooks", () => ({
  useOutsideClick: jest.fn(),
}));

const mockDataContext = {
  filterText: "",
};

const mockItems: ListOption[] = [
  { value: "us", label: "United States", color: "" },
  { value: "ca", label: "Canada", color: "" },
  { value: "fr", label: "France", color: "" },

];

const mockProps = {
  items: mockItems,
  initialValue: "us",
  classNames: "custom-dropdown",
};

describe("Dropdown Component", () => {
  beforeEach(() => {
    (useDataContext as jest.Mock).mockReturnValue(mockDataContext);
    jest.clearAllMocks();
  });

  it("renders the dropdown button with initial value", () => {
    render(<Dropdown {...mockProps} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("United States");
  });

  it("toggles the dropdown when button is clicked", () => {
    render(<Dropdown {...mockProps} />);

    const button = screen.getByRole("button");

    // Initially closed
    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    // Open the dropdown
    fireEvent.click(button);
    expect(screen.getByText("Canada")).toBeInTheDocument();

    // Close the dropdown
    fireEvent.click(button);
    expect(screen.queryByText("Canada")).not.toBeInTheDocument();
  });

  it("updates selection when an item is clicked", () => {
    render(<Dropdown {...mockProps} />);

    const button = screen.getByRole("button");

    // Open the dropdown
    fireEvent.click(button);

    // Select 'Canada'
    fireEvent.click(screen.getByText("Canada"));

    // Check that the button now shows 'Canada'
    expect(button).toHaveTextContent("Canada");
  });

  it("renders 'No items found' when no items match filter", () => {
    (useDataContext as jest.Mock).mockReturnValue({
      filterText: "xyz",
    });

    render(<Dropdown {...mockProps} />);

    const button = screen.getByRole("button");

    // Open the dropdown
    fireEvent.click(button);

    expect(screen.getByText("No items found")).toBeInTheDocument();
  });

  it("calls useOutsideClick hook to close the dropdown when clicking outside", () => {
    const mockUseOutsideClick = jest.fn();
    (useOutsideClick as jest.Mock).mockImplementation(mockUseOutsideClick);

    render(<Dropdown {...mockProps} />);

    // Expect useOutsideClick hook to have been called
    expect(mockUseOutsideClick).toHaveBeenCalled();
  });

  it("displays the dropdown with filtered items based on filterText", () => {
    (useDataContext as jest.Mock).mockReturnValue({
      filterText: "ca",
    });

    render(<Dropdown {...mockProps} />);

    const button = screen.getByRole("button");

    // Open the dropdown
    fireEvent.click(button);

    expect(screen.getByText("Canada")).toBeInTheDocument();
    expect(screen.queryByText("France")).not.toBeInTheDocument();
  });

  it("applies the custom className to the dropdown container", () => {
    render(<Dropdown {...mockProps} />);

    // Check if the className is applied to the container
    const dropdownContainer = screen.getByRole("button").parentElement;
    expect(dropdownContainer).toHaveClass("custom-dropdown");
  });
});
