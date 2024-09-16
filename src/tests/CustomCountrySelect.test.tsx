import { render, screen, fireEvent } from "@testing-library/react";
import { CountrySelectProps } from "../data/interfaces";
import { useDataContext } from "../data/context";
import { CustomCountrySelect } from "../Components/Custom/CustomCountrySelect";

jest.mock("../data/context", () => ({
  useDataContext: jest.fn(),
}));

const mockDataContext = {
  data: [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
  ],
  loading: false,
};

const mockOnChange = jest.fn();

const mockProps: CountrySelectProps = {
  className: "test-class",
  country: "us",
  onChange: mockOnChange,
};

describe("CustomCountrySelect Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading message when loading is true", () => {
    (useDataContext as jest.Mock).mockReturnValue({
      ...mockDataContext,
      loading: true,
    });

    render(<CustomCountrySelect {...mockProps} />);
    expect(screen.getByText("Loading data....")).toBeInTheDocument();
  });

  it("displays the Dropdown when data is available", () => {
    (useDataContext as jest.Mock).mockReturnValue({
      ...mockDataContext,
      loading: false,
    });

    render(<CustomCountrySelect {...mockProps} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("displays 'No data was returned from the API' when data is empty", () => {
    (useDataContext as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
    });

    render(<CustomCountrySelect {...mockProps} />);
    expect(screen.getByText("No data was returned from the API")).toBeInTheDocument();
  });

  it("passes the correct initial value to the Dropdown", () => {
    (useDataContext as jest.Mock).mockReturnValue(mockDataContext);

    render(<CustomCountrySelect {...mockProps} />);
    
    // Check if the Dropdown is rendered with the correct initial value
    expect(screen.getByRole("button")).toHaveTextContent("United States");
  });
});
