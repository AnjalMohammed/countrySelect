import Select from "react-select";
import { Option } from "./Option";
import { MenuList } from "./Menu";
import { Control } from "./Control";

import { IndicatorSeparator } from "./IndicatorSeparator";

import { useDataContext } from "../data/context";
import { useEffect, useState } from "react";
import { CountrySelectProps, ListOption } from "../data/interfaces";
import { FilterOptionOption } from "react-select/dist/declarations/src/filters";
import { Filter } from "./Filter";

export function CountrySelect(props: CountrySelectProps) {
  const { data, loading, filterText, inputRef } = useDataContext();
  const [defaultVal, setDefault] = useState<ListOption | null>();

  const handleFiltering = (option: FilterOptionOption<ListOption>) =>
    option.label
      .toLocaleLowerCase()
      .includes(filterText?.toLocaleLowerCase() || "");

  useEffect(() => {
    if (data) {
      let result = data.find((obj: ListOption) => obj.value == props.country);
      if (result?.value) setDefault(result);
    }
  }, [props.country, data]);

  return (
    <div className={props.className}>
      {/* This div is just to showcase the filter functionailty,
      please ignore the inline styles */}
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <Filter />
      </div>
      <Select
        className={props.className}
        classNamePrefix="react_select"
        components={{
          Control:(props) => <Control {...props}  />,
          IndicatorSeparator,
          MenuList,
          Option,
        }}
        isLoading={loading}
        options={data}
        isSearchable={false}
        onChange={props.onChange}
        filterOption={handleFiltering}
        value={defaultVal}
        // onMenuOpen={() => {
        //   if (inputRef.current) {
        //     inputRef.current.focus(); // Explicitly focus the input when the menu opens
        //   }
        // }}
      />
    </div>
  );
}
