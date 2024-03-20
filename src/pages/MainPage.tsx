import React from "react";
import { Layout } from "antd";
import AppContext from "../components/AppContext";
import AppWordList from "../components/AppWordList";
import { StrictMode, useState } from "react";
const { Footer, Content, Header, Sider } = Layout;
import { wordBuilder } from "../types/WordType";
import Iterable from "../types/Iterable";

const MainPage: React.FC = () => {
  const [activeWord, setActiveWord] = useState<Iterable>(wordBuilder(0, ""));

  const activeWordChangeListener = (word: Iterable) => {
    setActiveWord(word);
  };

  const cleanActiveWord = () => {
    setActiveWord(wordBuilder(0,""));
  }

  return (
    <StrictMode>
      <Layout style={{ backgroundColor: "#646567", height: "100vh" }}>
        <Layout style={{ height: "100vh", width: "70%", alignSelf: "center" }}>
          <Header style={styles.header}>WORD JUNGLE</Header>
          <Layout style={{ backgroundColor: "#A5D7D4" }}>
            <Sider style={styles.sider}>
              <AppWordList setter={activeWordChangeListener} />
            </Sider>
            <Layout style={{ alignItems: "flex", backgroundColor: "#A5D7D4" }}>
              <AppContext word={activeWord} contextCleanlistener={cleanActiveWord}/>
            </Layout>
          </Layout>
          <Footer style={styles.footer}> FOOTER </Footer>
        </Layout>
      </Layout>
    </StrictMode>
  );
};

const styles = {
  header: {
    background: "#DEA709",
    fontFamily: "Keania One",
    fontSize: "24px",
    boxShadow: "1 1 15px rgba(0, 0, 0, 0.5)",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  },
  footer: {
    background: "#DEA709",
    boxShadow: "1 1 15px rgba(0, 0, 0, 0.5)",
  },
  sider: {
    background: "#FBF3C5",
    padding: "10px 10px",
    marginTop: "7px",
    marginRight: "7px",
    marginLeft: "14px",
    marginBottom: "7px",
    boxShadow: "-0 0 5px rgba(0, 0, 0, 0.5)",
    borderRadius: 3,
  },
  content1: {
    padding: "10px 10px",
    background: "#FBF3C5",
    height: "70%",
    marginTop: "7px",
    marginRight: "14px",
    marginBottom: "7px",
    boxShadow: "-0 0 5px rgba(0, 0, 0, 0.5)",
    borderRadius: 3,
  },
  content2: {
    padding: "10px 10px",
    background: "#FBF3C5",
    height: "30%",
    marginTop: "7px",
    marginRight: "14px",
    boxShadow: "-0 0 5px rgba(0, 0, 0, 0.5)",
    borderRadius: 3,
  },
};

export default MainPage;
