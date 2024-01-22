import Typography from "@mui/material/Typography";
import React from "react";

interface HeaderProps {
  variant: string;
  headerText: string;
}

// const Header = (variant: string, children: string) => {

const HeaderAdapter = (children: string) => {
  return (
    <Typography variant="h6" component="h2" color="white" gutterBottom>
      App Name
      {/* {children} */}
    </Typography>
  );
};

export default HeaderAdapter;
