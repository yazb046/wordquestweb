import { ListItem } from "@mui/material";
import React from "react";

interface XListItemProps {
  children: JSX.Element;
}

const XListItem = (props: XListItemProps) => {
  return <ListItem>{props.children}</ListItem>;
};

export default XListItem;
