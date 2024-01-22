import { List } from "@mui/material";
import React from "react";
import XListItem from "./XListItem";

interface XListProps {
  children: JSX.Element[];
}

const XList = (props: XListProps) => {
  return <List>{props.children}</List>;
};

export default XList;
