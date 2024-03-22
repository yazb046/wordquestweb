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
              <Space style={styles.header} direction="horizontal">
              <div >card:</div>
              <div style={{color: "#c25c40",}}>{activeWord.getContent()}</div>
              </Space>
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
  header: {
    fontWeight: 'bold',
    fontSize: "13px",
    color: "#665f5d",
    fontFamily: "Roboto Mono",
    paddingBottom: "10px",
    paddingTop:'0px',
    paddingLeft:'0px',
    margin:'0px',
  },
};

export default AppContent;
