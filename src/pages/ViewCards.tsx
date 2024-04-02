import { Affix, Card, Layout, List, Space } from "antd";
import ListInfiniteFormatable from "../elements/ListInfiniteFormatable";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import "../assets/css/styles.css";
import globaleStyles from "../assets/css/globalStyles";
import { useEffect, useState } from "react";
import { fetchAllCardsByUserId } from "../service/cardService";
import { Divider } from "antd";
import SplitPane from "react-split-pane";

export default function ViewCards() {
  const [selectedCard, setSelectedCard] = useState();

  const Sidebar: React.FC = () => {
    return <Sider style={{ ...globaleStyles.siderLeft, width: 300 }}></Sider>;
  };

  // const RightCards = ({ selectedCard }) => {
  //   const data = Array.from({ length: 50 }, (_, i) => ({
  //     id: i,
  //     title: `Card ${i + 1}`,
  //     content: `Content for Card ${i + 1}`,
  //   }));

  //   return (
  //     <Affix offsetTop={0} style={{ height: '100vh', overflow: 'auto' }}>
  //       <List
  //         dataSource={data}
  //         renderItem={(item) => (
  //           <List.Item>
  //             <Card>
  //               <h1>{item.title}</h1>
  //               <p>{item.content}</p>
  //             </Card>
  //           </List.Item>
  //         )}
  //       />
  //     </Affix>
  //   );
  // };

  return (
    <div style={{ display: "flex" }}>
      <Layout style={globaleStyles.layout}>
        <ListInfiniteFormatable 
          dataFetchFunction={(pageNo: number) => {
            return fetchAllCardsByUserId(1, pageNo, 10, "id", "asc");
          }}
          onSelect={console.log}
        />
      </Layout>
    </div>
  );
}

const styles = {
  context: {
    padding: "10px 10px",
    background: "#e8f6fa",
    height: "30%",
    marginRight: "7px",
    marginBottom: "0px",
    boxShadow: "-0 0 5px rgba(0, 0, 0, 0.5)",
    borderRadius: 3,
  },
  
};
