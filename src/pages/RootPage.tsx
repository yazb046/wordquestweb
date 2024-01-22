import React from "react";
import LeftSide from "../screen/LeftSide";
import Center from "../screen/Center";
import RightSide from "../screen/RightSide";
import HeaderAdapter from "../component/XHeader";
import ButtonAdapter from "../component/XButton";
import ContainerAdapter from "../component/XContainer";
import BoxAdapter from "../component/XBox";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import XButton from "../component/XButton";
import XBox from "../component/XBox";
import XContainer from "../component/XContainer";
const RootPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <XBox
        height="100vh"
        bgcolor="yellow"
        width="20vh"
        border={1}
        borderColor="grey"
        flex={1}
        p={0}
        children={<LeftSide />}
      />
      <XBox
        height="100vh"
        width="60vh"
        flex={1}
        border={1}
        p={0}
        borderColor={"red"}
        bgcolor={"grey"}
        children={<Center />}
      ></XBox>
      <XBox
        height="100vh"
        width="20vh"
        flex={0}
        border={0}
        p={0}
        borderColor={""}
        bgcolor={""}
        children={<RightSide />}
      ></XBox>
    </div>
  );
};

export default RootPage;

const style = {
  backgroundColor: "#7395AE",
  // backgroundColor: "#557A95",
  // backgroundColor: "#557A95",
  // backgroundColor: "#557A95",
};
