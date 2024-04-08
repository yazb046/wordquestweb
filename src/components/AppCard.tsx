import { Card, Space, Button, Row, Col, Layout } from "antd";
import CardContent from "../elements/CardContent";
import Iterable from "../types/Iterable";
import { CloseOutlined } from "@ant-design/icons";
import { wordBuilder } from "../types/WordType";
import { useEffect, useState } from "react";

interface Props {
  word: Iterable;
  context: Iterable;
  cardCloseListener: () => any;
}

const AppCardUpdated: React.FC<Props> = ({ word, context, cardCloseListener }) => {
  
  const [activeWord, setActiveWord] = useState<Iterable>(wordBuilder(0, ""));
  const closeCard = () => {
    setActiveWord(wordBuilder(0, ""));
    cardCloseListener();
  };

  useEffect(() => {
    setActiveWord(word);
  }, [word]);

  return (
    <>
      {activeWord.getId() > 0 && (
        <Card
          bordered={false}
          style={{
            alignSelf: "end",
            justifyContent: "end",
            width: "100%",
            height: "60%",
            padding: "5px",
            marginTop: "10px",
            marginLeft: "0px",
            marginRight: "5px",
            fontFamily: "Merriweather",
            boxShadow: "-0 0 8px rgba(0, 0, 0, 2)",
          }}
        >
          <Row style={{ paddingTop: "0px",}}>
            <Col span={12} style={{ textAlign: "left" }}>
              <Space style={styles.header} direction="horizontal">
                <div
                  style={{
                    fontSize: "20px",
                    fontFamily: "Merriweather",
                    fontWeight: "bold",
                  }}
                >
                  {activeWord.getContent()}
                </div>
              </Space>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <CloseOutlined onClick={closeCard} />
            </Col>
          </Row>
          <CardContent word ={activeWord} context={context} closeEvent={cardCloseListener} />
        </Card>
      )}
    </>
  );
};

const styles = {
  header: {
    fontWeight: "bold",
    fontSize: "13px",
    color: "#665f5d",
    fontFamily: "Roboto Mono",
    paddingBottom: "10px",
    paddingTop: "0px",
    paddingLeft: "0px",
    margin: "0px",
  },
};

export default AppCardUpdated;
