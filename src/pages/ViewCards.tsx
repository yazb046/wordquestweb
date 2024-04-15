import { Affix, Card, Col, Layout, List, Row, Space } from "antd";
import ListInfiniteFormatable from "../elements/ListInfiniteFormatable";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import "../assets/css/styles.css";
import globaleStyles from "../assets/css/globalStyles";
import { useEffect, useState } from "react";
import { fetchAllCardsByUserId, save } from "../service/cardService";
import { Divider } from "antd";
import SplitPane from "react-split-pane";
import AppCardUpdated from "../elements/AppCardUpdated";
import { wordBuilder } from "../types/WordType";
import { textBuilder } from "../types/TextType";
import Iterable from "../types/Iterable";
import CardType, { cardBuilder } from "../types/CardType";
import Column from "antd/es/table/Column";
import { useLoad } from "../hooks/useLoad";
import CardMarkDown from "../elements/CardMarkDown";

const fetchItems = function (pageNo: number) {
  return fetchAllCardsByUserId(1, pageNo, 10, "id", "asc");
};

export default function ViewCards() {
  const [selectedCard, setSelectedCard] = useState<CardType>(
    cardBuilder(0, "", "")
  );
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { items, hasMore, loading } = useLoad(fetchItems, page, reload);

  useEffect(() => {
    setList(items);
    setHasMoreItems(hasMore);
    setIsLoading(loading);
  }, [items, hasMore, loading]);

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
          items={list}
          page={page}
          hasMore={hasMoreItems}
          loading={isLoading}
          onPageChange={(pageNo: number) => {
            setPage(pageNo);
          }}
          onItemSelect={(item: any) => setSelectedCard(item)}
        />
      </Sider>
      <CardMarkDown
        card={selectedCard}
        cardCloseListener={() => {
          setReload(true);
          setSelectedCard(cardBuilder(0, "", ""));
        }}
        handleSave={(card:Iterable) => {save(1,card)}}
      />
      {/* </Layout> */}
    </Layout>
  );
}
