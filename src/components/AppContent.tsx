import { Card, Space, Button } from "antd"
import CardContent from "../elements/CardContent";
import Iterable from "../types/Iterable";

interface AppContentProps {
  word: Iterable;
  context: Iterable;
}

const AppContent: React.FC<AppContentProps> = ({ word, context }) => {

  return (
    <>
      {word.getId() > 0 && (
        <>
          <div style={styles.boxTitle}>{word.getContent()}</div>
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
    fontSize: "14px",
    color: "#867373",
    fontWeight: "bold",
    fontFamily: "Roboto Mono",
    marginTop: "0px",
    marginBottom: "10px",
  },
};

export default AppContent;
