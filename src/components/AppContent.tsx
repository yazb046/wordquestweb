import { Card, Pagination, Col, Row, Image, Space, Input } from "antd";
import WordType from "../types/WordType";
import CardContent from "../elements/CardContent";
import Iterable from "../types/Iterable";

interface AppContentProps {
  word: WordType;
  context: Iterable;
}

const AppContent: React.FC<AppContentProps> = ({ word, context }) => {
  return (
    <>
      {" "}
      {word.id > 0 && (
        <>
          <div style={styles.boxTitle}>{word.word}</div>
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
            <CardContent context={context}/>
          </Card>
          <Pagination
            style={{
              padding: "5px",
              margin: "7px",
              justifyContent: "center",
              display: "flex",
            }}
            simple
            size="small"
            defaultCurrent={1}
            total={50}
          />
        </>
      )}
    </>
  );
};

const styles = {
  boxTitle: {
    fontSize: "14px",
    color: "#867373",
    fontWeight: "bold",
    fontFamily: "Roboto Mono",
    marginTop: "0px",
    marginBottom: "10px",
  },
};

export default AppContent;
