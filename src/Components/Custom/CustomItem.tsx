import { ListOption } from "../../data/interfaces";
import styles from "../styles.module.css";

interface ItemProps {
  item: ListOption;
  selection?: ListOption;
  handleItemClick: (value: ListOption) => void;
}

export const Item: React.FC<ItemProps> = ({
  item,
  selection,
  handleItemClick,
}) => {
  return (
    <div
      key={item.value}
      tabIndex={0} // Makes the list item focusable
      className={`${styles.dropdown_item} ${
        item.value === selection?.value
          ? styles.selected_item
          : styles.dropdown_item
      }`}
      onClick={() => handleItemClick(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleItemClick(item);
      }}
    >
      <span className={`fi fi-${item.value} fis`} />
      <span className={styles.option_label}>{item.label}</span>
    </div>
  );
};
