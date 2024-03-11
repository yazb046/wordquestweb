import { Card, Pagination } from "antd";

const AppContent: React.FC = () => {
  return (
    <>
      <Card
        title="Card title"
        bordered={false}
        style={{
          width: "100%",
          height: "90%",
          padding: "10px",
          margin: "0px",
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
  );
};

export default AppContent;
