import "/node_modules/flag-icons/css/flag-icons.min.css";
import { CountrySelect } from "./Components/CountrySelect";
import { useState } from "react";
import { ListOption } from "./data/interfaces";
import { SingleValue } from "react-select";
import styles from "./AppStyles.module.css";
import { CustomCountrySelect } from "./Components/Custom/CustomCountrySelect";

function App() {
  const [country, setCountry] = useState<string | undefined>("");

  const props = {
    className: "custom-class",
    country: country || "us",
    onChange: (country: SingleValue<ListOption>) => {
      console.log(country);

      // since countrySelect is passing a country and also an onChange,
      // it necessarily behaves like a controlledComponent,
      // the state variable is set here to complete the flow of control
      setCountry(country?.value);
    },
  };

  return (
    <div className={styles.app_container}>
      <h2>This dropdown is created using react-select</h2>
      <div className={styles.div_gap}>
        <CountrySelect {...props} />
      </div>

      <h2>This dropdown is created from scratch using DOM events</h2>
      <CustomCountrySelect {...props} />
    </div>
  );
}

export default App;
