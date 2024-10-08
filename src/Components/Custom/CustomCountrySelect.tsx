import { Dropdown } from "./CustomDropdown";
import { useDataContext } from "../../data/context";
import { CountrySelectProps } from "../../data/interfaces";

export function CustomCountrySelect(props: CountrySelectProps) {
  const { data, loading } = useDataContext();

  return loading ? (
    <p>Loading data....</p>
  ) : data?.length ? (
      <Dropdown
        items={data}
        classNames={props.className}
        initialValue={props.country}
        onChange={props.onChange}
      />
  ) : (
    <p>No data was returned from the API</p>
  );
}
