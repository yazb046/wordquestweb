import { Layout, Tabs } from "antd";
import { StrictMode } from "react";
import CreateCard from "./CreateCard";
import ViewCards from "./ViewCards";
import globaleStyles from "../assets/css/globalStyles";
const { Footer, Header } = Layout;

export default function Container() {
  return (
    <StrictMode>
      <Layout
        style={{
          backgroundColor: "#f9fff9",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header style={globaleStyles.header}>WORD JUNGLE</Header>

        <Tabs
          style={{
            flex: 1,
            width: "70%",
            alignSelf: "center",
            border: "1px solid #dce0e3",
            boxShadow: "-0 0 5px rgba(0, 0, 0, 0.5)",
          }}
          tabPosition="top"
          tabBarStyle={{
            fontFamily: "Montserrat",
            height: "30px",
            marginTop: "0px",
            marginLeft: "10px",
            marginRight: "5px",
            marginBottom: "7px",
          }}
          tabBarGutter={20}
          items={[
            {
              label: "create card",
              key: "1",
              children: <CreateCard />,
            },
            {
              label: "view cards",
              key: "2",
              children: <ViewCards />,
            },
          ]}
        ></Tabs>

        <Footer style={globaleStyles.footer}> FOOTER </Footer>
      </Layout>
    </StrictMode>
  );
}
