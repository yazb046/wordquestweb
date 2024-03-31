import React from "react";
import { Layout, } from "antd";
import AppContext from "../components/AppContext";
import AppWordList from "../components/AppWordList";
import { useState } from "react";
const { Sider } = Layout;
import { wordBuilder } from "../types/WordType";
import Iterable from "../types/Iterable";

const CreateCard: React.FC = () => {
  const [activeWord, setActiveWord] = useState<Iterable>(wordBuilder(0, ""));

  const activeWordChangeListener = (word: Iterable) => {
    setActiveWord(word);
  };

  const cleanActiveWord = () => {
    setActiveWord(wordBuilder(0, ""));
  };


  return (
    <Layout
      style={{
        backgroundColor: "rgba(255, 255, 255, 0)",
      }}
    >
      <Sider style={styles.sider}>
        <AppWordList setter={activeWordChangeListener} />
      </Sider>

      <Layout
        style={{
          alignItems: "flex",
          backgroundColor: "rgba(255, 255, 255, 0)",
          marginTop: "0px",
        }}
      >
        <AppContext word={activeWord} contextCleanlistener={cleanActiveWord} />
      </Layout>
    </Layout>
    
  );
};

const styles = {
  sider: {
    backgroundColor: "#e8f6fa",
    padding: "10px 10px",
    marginRight: "7px",
    marginLeft: "7px",
    marginBottom: "7px",
    boxShadow: "-0 0 5px rgba(0, 0, 0, 0.5)",
    borderRadius: 2,
  },
};

export default CreateCard;
