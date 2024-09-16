import { components, GroupBase, MenuListProps } from "react-select";
import { ListOption } from "../data/interfaces";
import { Filter } from "./Filter";
import { useEffect, useRef } from "react";

export function MenuList(
  props: MenuListProps<ListOption, false, GroupBase<ListOption>>
) {
  return (
    <div>
      <Filter />
      <components.MenuList {...props}>{props.children}</components.MenuList>
    </div>
  );
}
