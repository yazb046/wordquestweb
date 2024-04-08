import { Affix, Card, Col, Layout, List, Row, Space } from "antd";
import ListInfiniteFormatable from "../elements/ListInfiniteFormatable";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import "../assets/css/styles.css";
import globaleStyles from "../assets/css/globalStyles";
import { useEffect, useState } from "react";
import { fetchAllCardsByUserId } from "../service/cardService";
import { Divider } from "antd";
import SplitPane from "react-split-pane";
import AppCardUpdated from "../elements/AppCardUpdated";
import { wordBuilder } from "../types/WordType";
import { textBuilder } from "../types/TextType";
import Iterable from "../types/Iterable";
import CardType, { cardBuilder } from "../types/CardType";
import Column from "antd/es/table/Column";

export default function ViewCards() {
  const [selectedCard, setSelectedCard] = useState<CardType>(
    cardBuilder(0, "", "")
  );

  return (
    <Layout
      style={{
        backgroundColor: "rgba(255, 255, 255, 0)",
      }}
    >
      <Sider
        width={"315px"}
        style={{ ...globaleStyles.siderLeft, height: "590px" }}
      >
        <ListInfiniteFormatable
          dataFetchFunction={(pageNo: number) => {
            return fetchAllCardsByUserId(1, pageNo, 10, "id", "asc");
          }}
          onSelect={(item: any) => setSelectedCard(item)}
        />
      </Sider>
      {/* <Layout
        style={{
          alignItems: "flex",
          backgroundColor: "rgba(255, 255, 255, 0)",
          marginTop: "0px",
          marginBottom: "0px",
        }}
      > */}
        <AppCardUpdated
          word={wordBuilder(selectedCard.getId(), selectedCard.getTheme())}
          context={textBuilder(selectedCard.getId(), selectedCard.getContent())}
          cardCloseListener={() => {
            console.log();
          }}
        />
      {/* </Layout> */}
    </Layout>
  );
}
