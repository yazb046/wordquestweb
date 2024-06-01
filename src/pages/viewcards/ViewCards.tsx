import { Layout, Space } from "antd";
import ListInfiniteFormatable from "../../elements/ListInfiniteFormatable";
import Sider from "antd/es/layout/Sider";
import globaleStyles from "../../assets/css/globalStyles";
import { useEffect, useState } from "react";
import { fetchAllCardsByUserId, save } from "../../service/cardService";
import Iterable from "../../types/Iterable";
import { cardBuilder } from "../../types/CardType";
import { useLoad } from "../../hooks/useLoad";
import CardMarkDown from "../../elements/CardMarkDown";
import { fetchWordsByLetters } from "../../service/wordService";
import ThemesList from "./components/ThemesList";

const fetchItems = function (pageNo: number) {
  return fetchAllCardsByUserId(1, pageNo, 10, "id", "asc");
};

export default function ViewCards() {
  const [selectedCard, setSelectedCard] = useState<Iterable>(
    cardBuilder(0, "", "")
  );
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { items, hasMore, loading } = useLoad(fetchItems, page, reload);

  useEffect(() => {
    setList(items);
    setHasMoreItems(hasMore);
    setIsLoading(loading);
  }, [items, hasMore, loading]);

  const onSearch = (value: string) => {
    setPage(0);
    setSearchText(value);
    setList([]);
    fetchWordsByLetters(value).then((items: Iterable[]) => {
      setList(items);
    });
  };

  const onClearButtonClick = () => {
    setSearchText("");
    setList([]);
  };

  return (
    <Layout
      style={{
        backgroundColor: "rgba(255, 255, 255, 0)",
      }}
    >
      <Space direction="vertical">
      <ThemesList/>
      {/* <CardsList/> */}
      <Sider
        width={"400px"}
        style={{ ...globaleStyles.siderLeft, height: "320px" }}
      >
        {/* <SearchInputBox
          onSearch={onSearch}
          searchText={searchText}
          setSearchText={(e: any) => setSearchText(e.target.value)}
          onClearButtonClick={onClearButtonClick}
        /> */}
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
      </Space>

      <CardMarkDown
        card={selectedCard}
        cardCloseListener={() => {
          setReload(true);
          setSelectedCard(cardBuilder(0, "", ""));
        }}
        handleSave={(card: Iterable) => {
          save(1, card);
        }}
      />
    </Layout>
  );
}
