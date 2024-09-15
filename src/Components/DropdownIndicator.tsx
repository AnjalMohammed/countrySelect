import { components, DropdownIndicatorProps } from "react-select";
import { ListOption } from "../data/interfaces";

export function DropdownIndicator(
  props: DropdownIndicatorProps<ListOption, true>
) {
  return (
    <components.DropdownIndicator {...props}>
      <span>{"\u25BC"}</span>
    </components.DropdownIndicator>
  );
}
