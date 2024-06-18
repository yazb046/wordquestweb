import React from "react";
import { Layout, } from "antd";
import AppContext from "../components/AppContext";
import AppWordList from "./viewcards/card/MyWordList";
import { useState } from "react";
const { Sider } = Layout;
import { wordBuilder } from "../types/WordType";
import Iterable from "../types/Iterable";
import globaleStyles from "../assets/css/globalStyles";

const CreateCard: React.FC = () => {
  const [activeWord, setActiveWord] = useState<Iterable>(wordBuilder(0, "",""));

  const activeWordChangeListener = (word: Iterable) => {
    setActiveWord(word);
  };

  const cleanActiveWord = () => {
    setActiveWord(wordBuilder(0, "",""));
  };


  return (
    <Layout
      style={{
        backgroundColor: "rgba(255, 255, 255, 0)",
      }}
    >
      <Sider style={globaleStyles.siderLeft}>
        <AppWordList setter={activeWordChangeListener} />
      </Sider>

      <Layout
        style={{
          alignItems: "flex",
          backgroundColor: "rgba(255, 255, 255, 0)",
          marginTop: "0px",
          marginBottom:'0px',
        }}
      >
        <AppContext word={activeWord} contextCleanlistener={cleanActiveWord} />
      </Layout>
    </Layout>
    
  );
};

export default CreateCard;
