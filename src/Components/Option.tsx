import { components, OptionProps } from "react-select";
import { ListOption } from "../data/interfaces";
import styles from "./styles.module.css";

export function Option(props: OptionProps<ListOption>) {
  return (
    <components.Option {...props}>
      <span className={`fi fi-${props.data.value} fis`} />
      <span className={styles.option_label}>{props.children}</span>
    </components.Option>
  );
}
