import { components, DropdownIndicatorProps } from "react-select";
import { ListOption } from "../data/interfaces";
import styles from "../styles.module.css";

export function DropdownIndicator(
  props: DropdownIndicatorProps<ListOption, true>
) {
  return (
    <components.DropdownIndicator {...props}>
      <span className={styles.down_caret}>&#9660;</span>
    </components.DropdownIndicator>
  );
}
