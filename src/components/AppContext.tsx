import Word, { wordBuilder } from "../types/WordType";
import ListScrollable from "../elements/ListScrollable";
import { fetchUserWordRelatedContext } from "../service/textService";
import Iterable from "../types/Iterable";
import { textBuilder } from "../types/TextType";
import { Content } from "antd/es/layout/layout";
import { CloseOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import AppContent from "./AppContent";

interface AppContextProps {
  word: Iterable;
  contextCleanlistener: any;
}

const AppContext: React.FC<AppContextProps> = ({
  word,
  contextCleanlistener,
}) => {
  const [activeWord, setActiveWord] = useState<Iterable>(wordBuilder(0, ""));
  const [contextWord, setContextWord] = useState<Iterable>(wordBuilder(0, ""));
  const [activeContext, setActiveContext] = useState<Iterable>(
    textBuilder(0, "")
  );

  useEffect(() => {
    setActiveWord(word);
  }, [word]);

  const fetchDataFunction = async (aPageNo: number, aWord: Word) => {
    return await fetchUserWordRelatedContext(1, aWord, aPageNo);
  };

  const closeContextScreen = () => {
    contextCleanlistener();
  };

  const creatContext = (text: Iterable) => {
    setContextWord(activeWord);
    setActiveContext(text);
  };

  return (
    <>
      {activeWord && activeWord.getId() > 0 && (
        <>
          <Content style={styles.content2}>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <div style={styles.boxTitle}>context/{word.getContent()}</div>
                <div style={{ backgroundColor: "#f2836f" }}></div>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <CloseOutlined onClick={closeContextScreen} />
              </Col>
            </Row>

            <ListScrollable
              addToolTipMessage="create card"
              clickedItemHandler={creatContext}
              listClearTriggerObject={activeWord}
              loadListDataHandler={fetchDataFunction}
              listItemDefaultInstance={textBuilder(0, "")}
              scrollListBoxStyle={{
                height: 120,
                overflow: "auto",
              }}
              listItemStyle={{
                borderRadius: "1px",
                height: "auto",
                fontSize: "14px",
                padding: "3px",
                margin: "0px",
                fontFamily: "Merriweather",
                textAlign: "left",
                verticalAlign: "top",
              }}
            />
          </Content>
          <Content style={styles.content1}>
            {activeContext && activeContext.getId() > 0 && (
              <AppContent
                word={contextWord}
                context={activeContext}
                cardCloseListener={() => {
                  setActiveContext(textBuilder(0, ""));
                }}
              />
            )}
          </Content>
        </>
      )}
    </>
  );
};

const styles = {
  boxTitle: {
    fontSize: "13px",
    color: "#3c9691",
    fontFamily: "Roboto Mono",
    paddingBottom: "10px",
  },
  content1: {
    padding: "10px 10px",
    background: "#e8f6fa",
    height: "70%",
    marginTop: "7px",
    marginRight: "14px",
    marginBottom: "7px",
    boxShadow: "-0 0 5px rgba(0, 0, 0, 0.5)",
    borderRadius: 3,
  },
  content2: {
    padding: "10px 10px",
    background: "#e8f6fa",
    height: "30%",
    marginTop: "7px",
    marginRight: "14px",
    boxShadow: "-0 0 5px rgba(0, 0, 0, 0.5)",
    borderRadius: 3,
  },
};

export default AppContext;
