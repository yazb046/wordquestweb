import { Card, Space, Button, Row, Col } from "antd";
import CardContent from "../elements/CardContent";
import Iterable from "../types/Iterable";
import { CloseOutlined } from "@ant-design/icons";
import { wordBuilder } from "../types/WordType";
import { useEffect, useState } from "react";

interface AppContentProps {
  word: Iterable;
  context: Iterable;
  cardCloseListener:() => any;
}



const AppContent: React.FC<AppContentProps> = ({ word, context, cardCloseListener }) => {

  const [activeWord, setActiveWord] = useState<Iterable>(wordBuilder(0,""));

  const closeCard = () => {
    setActiveWord(wordBuilder(0,""));
    cardCloseListener();
  }

  useEffect(()=>{
    setActiveWord(word);
  },[word])

  return (
    <>
      {activeWord.getId() > 0 && (
        <>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              <div style={styles.boxTitle}>card/{activeWord.getContent()}</div>
              <div style={{ backgroundColor: "#f2836f" }}></div>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <CloseOutlined onClick={closeCard} />
            </Col>
          </Row>

          <Card
            bordered={false}
            style={{
              width: "100%",
              height: "80%",
              padding: "5px",
              margin: "5px",
              marginLeft: "0px",
              marginRight: "0px",
              fontFamily: "Merriweather",
            }}
          >
            <CardContent context={context} />
          </Card>
          <Space direction="horizontal" align="center">
            <Button onClick={console.log}>View cards</Button>
          </Space>
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
    marginTop: "0px",
    marginBottom: "10px",
  },
};

export default AppContent;
