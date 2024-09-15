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
}
