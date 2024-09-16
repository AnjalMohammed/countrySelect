import { useEffect, useState } from "react";
import { ControlProps } from "react-select";
import { ListOption } from "../data/interfaces";
import styles from "./styles.module.css";

export const Control = (props: ControlProps<ListOption, false>) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleButtonClick = () => {
    setMenuIsOpen((prevState) => !prevState);
  };

  const currentLabel = props.getValue()[0]?.label;

  // Sync menu state with react-select
  useEffect(() => {
    if (menuIsOpen) {
      props.selectProps.onMenuOpen?.();
    } else {
      props.selectProps.onMenuClose?.();
    }
  }, [menuIsOpen, props.selectProps]);

  return (
    <div className={styles.control_container}>
      <button onClick={handleButtonClick} className={styles.control_button}>
        {currentLabel}
        <span className={styles.down_caret}>&#9660;</span>
      </button>
    </div>
  );
};
