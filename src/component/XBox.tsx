import React from "react";
import Box from "@mui/material/Box";

interface XBoxProps {
  flex: number;
  height: string;
  width: string;
  border: number;
  p: number;
  borderColor: string;
  bgcolor: string;
  children: JSX.Element;
}

const XBox = (props: XBoxProps) => {
  return (
    <Box
      flex={1}
      height={props.height}
      width={props.width}
      border={props.border}
      p={props.p}
      borderColor={props.borderColor}
      bgcolor={props.bgcolor}
    >
      {props.children}
    </Box>
  );
};

export default XBox;
