import React from "react";
import Button from "@mui/material/Button/";

// TODO add props
const XButton = (props) => {
  return (
    <Button variant="contained" color="primary">
      {props.name}
    </Button>
  );
};

export default XButton;
