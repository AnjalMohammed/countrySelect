import { useState, useRef, useEffect, useCallback } from "react";
import { CustomDropdownProps, ListOption } from "../../data/interfaces";

import styles from "../styles.module.css";

import { Filter } from "../Filter";
import { Item } from "./CustomItem";

import { useDataContext } from "../../data/context";
import { useOutsideClick } from "./cutsomHooks";

export function Dropdown({
  items,
  initialValue,
  classNames,
  onChange
}: CustomDropdownProps) {
  const { filterText } = useDataContext();

  const [selection, setSelection] = useState<ListOption | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleItemClick = (selection: ListOption) => {
    setSelection(selection);
    onChange(selection);
    setIsOpen(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      listRef.current &&
      !listRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  // Set initial selection based on defaultValue
  useEffect(() => {
    setSelection(
      items.find((item) => item.value === initialValue) || undefined
    );
  }, [initialValue, items]);

  useOutsideClick(listRef, handleClickOutside);

  // Filter items based on filterText
  const filteredItems = items.filter((item) =>
    item.label
      .toLocaleLowerCase()
      .includes(filterText?.toLocaleLowerCase() || "")
  );

  return (
    <div className={classNames}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={styles.control_button}
      >
        {selection
          ? items.find((item) => item.value === selection?.value)?.label
          : "Select Country"}
        <span className={styles.down_caret}>&#9660;</span>
      </button>

      {isOpen && (
        <div ref={listRef} className={styles.dropdown_container}>
          <Filter />
          <div className={styles.dropdown_list}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Item
                  key={item.value}
                  item={item}
                  selection={selection}
                  handleItemClick={handleItemClick}
                />
              ))
            ) : (
              <div className={styles.no_items}>No items found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
