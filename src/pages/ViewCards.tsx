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
