import { ChangeEvent, RefObject, useEffect } from "react";
import { useDataContext } from "../data/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

export function Filter() {
  const { filterText, setFilterText, inputRef } = useDataContext();

  // useEffect(() => {
  //   if (inputRef.current) inputRef.current.focus();
  // }, [inputRef.current]);

  return (
    <div className={styles.filter_container}>
      <FontAwesomeIcon icon={faSearch} className={styles.search_icon} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        value={filterText || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value);
          setFilterText(e.target.value);
        }}
        className={styles.filter_input}
      />
    </div>
  );
}
