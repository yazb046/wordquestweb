import { ListItemButton } from "@mui/material";
import React from "react";

interface XListItemButtonProps {
  children: JSX.Element;
  onClick: any;
}

const XListItemButton = (props: XListItemButtonProps) => {
  return (
    <ListItemButton onClick={props.onClick}>{props.children}</ListItemButton>
  );
};

export default XListItemButton;
