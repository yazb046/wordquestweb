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
import { Space, Button } from "antd";
import { Alert } from "antd";

interface AppContextProps {
  word: Iterable;
  contextCleanlistener: any;
}

const AppContext: React.FC<AppContextProps> = ({
  word,
  contextCleanlistener,
}) => {
  const [contextWord, setContextWord] = useState<Iterable>(wordBuilder(0, ""));
  const [activeContext, setActiveContext] = useState<Iterable>(textBuilder(0, ""));
  const [alertVisible, setAlertVisible] = useState(false);
  const [clearList, setClearList] = useState(false);

  useEffect(() => {
    if (
      activeContext.getId() !== 0 &&
      contextWord.getId()!== 0 &&
      contextWord.getId() !== word.getId() 
      
    ) {
      setAlertVisible(true);
    } else {
      setClearList(true);
      setContextWord(word);
      setAlertVisible(false);
    }
  }, [word]);

  const fetchDataFunction = async (aPageNo: number, aWord: Word) => {
    return await fetchUserWordRelatedContext(1, aWord, aPageNo);
  };

  const closeContextScreen = () => {
    setActiveContext(textBuilder(0, ""));
    contextCleanlistener();
  };

  const chooseContext = (text: Iterable) => {
    setActiveContext(text);
  };

  return (
    <>
      {contextWord && contextWord.getId() > 0 && (
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
              addToolTipMessage="create card"
              clickedItemHandler={chooseContext}
              contextWord={contextWord}
              clearList={clearList}
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
                  setAlertVisible(false);
                }}
              />
            )}
          </Content>
          {alertVisible && (
            <Alert
              message="Save or cancel card before changing the context!"
              type="error"
              description={
                <Button
                  onClick={() => setAlertVisible(false)}
                  className="alert-button"
                >
                  OK
                </Button>
              }
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            />
          )}
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
