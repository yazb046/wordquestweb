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

  const[siderClicked, setSiderClicked] = useState(false);

  const handleSiderClick = ()=> {
    setSiderClicked(true);
  }

  return (
    <StrictMode>
      <Layout style={{ backgroundColor: "#f2f7fa", height: "100vh" }}>
        <Layout style={{ height: "100vh", width: "70%", alignSelf: "center", border:"1px solid #dce0e3",}}>
          <Header style={styles.header}>WORD JUNGLE</Header>
          <Layout style={{ backgroundColor: "#f2f7fa", boxShadow: "1 1 20px rgba(0, 0, 0, 0.5)"}}>
            <Sider style={styles.sider} onClick={handleSiderClick}>
              <AppWordList setter={activeWordChangeListener} />
            </Sider>
            <Layout style={{ alignItems: "flex", backgroundColor: "#f2f7fa", boxShadow: "1 1 20px rgba(0, 0, 0, 0.5)"}}>
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
    background: "#558bab",
    fontFamily: "Keania One",
    fontSize: "24px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    borderRadius: 3,
  },
  footer: {
    background: "#558bab",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
    height:'10px',
    borderRadius: 3,
  },
  sider: {
    backgroundColor: '#e8f6fa',
    padding: "10px 10px",
    marginTop: "7px",
    marginRight: "7px",
    marginLeft: "14px",
    marginBottom: "7px",
    boxShadow: "-0 0 5px rgba(0, 0, 0, 0.5)",
    borderRadius: 3,
  },
};


export default MainPage;
