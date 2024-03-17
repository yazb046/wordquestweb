import { Card, Pagination } from "antd";
import Word from "../types/WordType";

interface AppContentProps {
  word: Word;
}

const AppContent: React.FC<AppContentProps> = ({word}) => {
  return (
    <> {word.id > 0 && (<>
      <div style ={styles.boxTitle}>{word.word}</div>
      <Card
        bordered={false}
        style={{
          width: "100%",
          height: "80%",
          padding: "10px",
          margin: "5px",
          marginLeft:"0px",
          marginRight:"0px",
          fontFamily:'Merriweather',
        }}
      >
        <p>Card content</p>
      </Card>
      <Pagination
        style={{ padding: "5px", margin: "7px", justifyContent:'center', display:'flex' }}
        simple
        size='small'
        defaultCurrent={1}
        total={50}
      />
    </>
  )}</>)
};

const styles ={
  boxTitle: {
    fontSize: "14px",
    color: "#867373",
    fontWeight: "bold",
    fontFamily: "Roboto Mono",
    marginTop:'0px',
    marginBottom:'10px'
  },
}

export default AppContent;
