//[TODO: delete]
import { components, ControlProps } from "react-select";
import { ListOption } from "../data/interfaces";
import { useDataContext } from "../data/context";

export function Control(props: ControlProps<ListOption, false>) {
  // const { visible, setVisible } = useDataContext();

  return (
    <div>
      <button
      // onClick={() => setVisible(!visible)}
      >
        {props.getValue()[0]?.label}
        <span>{"\u25BC"}</span>
      </button>
      <components.Control {...props} />
    </div>
  );
}
