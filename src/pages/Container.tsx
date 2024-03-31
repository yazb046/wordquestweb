import { Layout, Tabs } from "antd";
import { StrictMode } from "react";
import CreateCard from "./CreateCard";
const { Footer, Header, } = Layout;

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
        <Header style={styles.header}>WORD JUNGLE</Header>

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
          }}
          tabBarGutter={20}
          items={[
            {
              label: "create",
              key: "1",
              children: <CreateCard />,
            },
            {
              label: "view",
              key: "2",
              children: (
                <Layout
                  style={{
                    width: "70%",
                    alignSelf: "center",
                  }}
                ></Layout>
              ),
            },
          ]}
        ></Tabs>

        <Footer style={styles.footer}> FOOTER </Footer>
      </Layout>
    </StrictMode>
  );
}

const styles = {
  header: {
    background: "#8ebed1",
    fontFamily: "Keania One",
    fontSize: "24px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    borderRadius: 1,
    width: "70%",
    alignSelf: "center",
    zIndex: 1,
  },
  footer: {
    background: "#8ebed1",
    boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.5)",
    height: "10px",
    borderRadius: 1,
    width: "70%",
    alignSelf: "center",
  },
};
