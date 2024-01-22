import { ListItemText } from "@mui/material";
import React from "react";

interface XListItemTextProps {
  //   children: JSX.Element;
  primary: string;
}
const XListItemText = (props: XListItemTextProps) => {
  return (
    <ListItemText primary={props.primary}>
      {/* {props.children} */}
    </ListItemText>
  );
};

export default XListItemText;
