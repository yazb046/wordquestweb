import Word, { wordBuilder } from "../types/WordType";
import ListScrollable from "../elements/ListScrollable";
import { fetchUserWordRelatedContext } from "../service/textService";
import Iterable from "../types/Iterable";
import { textBuilder } from "../types/TextType";
import { Content } from "antd/es/layout/layout";
import { CloseOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import AppCard from "./AppCard";
import { Space } from "antd";

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
          <Content style={styles.context}>
            <Row style={{ marginBottom: "5px" }}>
              <Col span={12} style={{ textAlign: "left" }}>
                <Space
                  style={{ color: "#076af5", fontFamily: "Montserrat" }}
                  direction="horizontal"
                >
                  <div>choose a context for: </div>
                  <div style={{ color: "#c25c40" }}>{word.getContent()}</div>
                </Space>
                <div style={{ backgroundColor: "#f2836f" }}></div>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <CloseOutlined onClick={closeContextScreen} />
              </Col>
            </Row>

            <ListScrollable
              doReload={false}
              addToolTipMessage="create card"
              clickedItemHandler={creatContext}
              listClearTriggerObject={activeWord}
              loadListDataHandler={fetchDataFunction}
              listItemDefaultInstance={textBuilder(0, "")}
              scrollListBoxStyle={{
                height: 180,
                overflow: "auto",
              }}
              listItemStyle={{
                borderRadius: "2px",
                height: "auto",
                fontSize: "13.5px",
                padding: "5px",
                margin: "0px",
                fontFamily: "Merriweather",
                textAlign: "left",
                verticalAlign: "top",
              }}
            />
              {activeContext && activeContext.getId() > 0 && (
                <AppCard
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
  context: {
    padding: "10px 10px",
    background: "#e8f6fa",
    height: "25%",
    marginRight: "7px",
    marginBottom: "7px",
    boxShadow: "-0 0 5px rgba(0, 0, 0, 0.5)",
    borderRadius: 3,
  },
};

export default AppContext;
