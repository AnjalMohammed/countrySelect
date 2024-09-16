import { RefObject } from "react";
import { SingleValue } from "react-select";

export interface ListOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export interface ContextType {
  data: ListOption[] | undefined;
  loading: boolean;
  filterText: string | undefined;
  setFilterText: (text: string) => void;
  inputRef: RefObject<HTMLInputElement>;
}

export interface CountrySelectProps {
  className?: string;
  country?: string;
  onChange: (country: SingleValue<ListOption>) => void;
}

export interface CustomDropdownProps {
  items: ListOption[];
  initialValue?: string;
  classNames?: string;
  onChange: (country: SingleValue<ListOption>) => void;
}

export interface ItemProps {
  item: ListOption;
  selection?: ListOption;
  handleItemClick: (value: ListOption) => void;
}