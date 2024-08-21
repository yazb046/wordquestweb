import React from "react";
import { Layout } from "antd";

import logo from "../assets/img/logo.svg";
import LogIn from "../trash/elements/Registration";

import "../assets/css/Header-style.css";
import AvatarMenu from "../trash/elements/Avatar";
import BurgerMenu from "../trash/elements/Burger-menu";

const AppHeader: React.FC = () => {
  return (
    <Layout.Header className="headerStyle"> 
      <img src={logo} className="Applogo" alt="logo" />
      <LogIn />
      <AvatarMenu />
      <BurgerMenu menuItems={["Home", "About", "Contacts"]} />
    </Layout.Header>
  );
};

export default AppHeader;
