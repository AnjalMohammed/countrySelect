import { render, screen, fireEvent } from "@testing-library/react";
import { Item } from "../Components/Custom/CustomItem";
import { ListOption } from "../data/interfaces";


// Mock styles module
jest.mock("../styles.module.css", () => ({
  dropdown_item: "dropdown_item",
  selected_item: "selected_item",
  option_label: "option_label",
}));

const mockHandleItemClick = jest.fn();

const mockItem: ListOption = {
  value: "us",
  label: "United States",
  color: "#FF0000",
};

const mockSelection: ListOption = {
  value: "us",
  label: "United States",
  color: "#FF0000",
};

describe("Item component", () => {
  it("renders the item correctly", () => {
    render(
      <Item item={mockItem} handleItemClick={mockHandleItemClick} />
    );

    const label = screen.getByText("United States");
    expect(label).toBeInTheDocument();
  });

  it("calls handleItemClick when the item is clicked", () => {
    render(
      <Item item={mockItem} handleItemClick={mockHandleItemClick} />
    );

    const itemDiv = screen.getByText("United States").closest("div");
    fireEvent.click(itemDiv!);

    expect(mockHandleItemClick).toHaveBeenCalledWith(mockItem);
  });

  it("calls handleItemClick when Enter key is pressed", () => {
    render(
      <Item item={mockItem} handleItemClick={mockHandleItemClick} />
    );

    const itemDiv = screen.getByText("United States").closest("div");
    fireEvent.keyDown(itemDiv!, { key: "Enter", code: "Enter" });

    expect(mockHandleItemClick).toHaveBeenCalledWith(mockItem);
  });

  it("applies the 'selected_item' style when the item is selected", () => {
    render(
      <Item
        item={mockItem}
        selection={mockSelection}
        handleItemClick={mockHandleItemClick}
      />
    );

    const itemDiv = screen.getByText("United States").closest("div");
    expect(itemDiv).toHaveClass("selected_item");
  });

  it("does not apply the 'selected_item' style when the item is not selected", () => {
    const differentSelection: ListOption = {
      value: "ca",
      label: "Canada",
      color: "#00FF00",
    };

    render(
      <Item
        item={mockItem}
        selection={differentSelection}
        handleItemClick={mockHandleItemClick}
      />
    );

    const itemDiv = screen.getByText("United States").closest("div");
    expect(itemDiv).toHaveClass("dropdown_item");
    expect(itemDiv).not.toHaveClass("selected_item");
  });

});
