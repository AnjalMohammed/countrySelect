import "/node_modules/flag-icons/css/flag-icons.min.css";
import Select from "react-select";
import { Option } from "./Components/Option";
import { MenuList } from "./Components/Menu";

import { IndicatorSeparator } from "./Components/IndicatorSeparator";

import { useDataContext } from "./data/context";
import { useEffect } from "react";
import { Filter } from "./Components/Filter";

function App() {
  const { data, loading } = useDataContext();

  useEffect(() => {}, [data]);
  return (
    <div className="app_container">
      <Filter />
      <Select
        components={{
          IndicatorSeparator,
          MenuList,
          Option,
        }}
        isLoading={loading}
        options={data}
        isSearchable={false}
        menuIsOpen={true}
      />
    </div>
  );
}

export default App;
