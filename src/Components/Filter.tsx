import { ChangeEvent } from "react";
import { useDataContext } from "../data/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

export function Filter() {
  const { filterText, setFilterText } = useDataContext();  
  return (
    <div className={styles.filter_container}>
      <FontAwesomeIcon icon={faSearch} className={styles.search_icon} />
      <input
        type="text"
        placeholder="Search"
        value={filterText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFilterText(e.target.value)
        }
        className={styles.filter_input}
      />
    </div>
  );
}
