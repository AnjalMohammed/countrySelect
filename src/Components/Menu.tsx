import {
  components,
  GroupBase,
  InputActionMeta,
  MenuListProps,
} from "react-select";
import { ListOption } from "../data/interfaces";
import { useEffect, useRef, useState } from "react";
import { Filter } from "./Filter";
import { useDataContext } from "../data/context";

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
