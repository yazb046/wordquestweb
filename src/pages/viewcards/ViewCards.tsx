import { Layout, Space } from "antd";
import { useState } from "react";
import { fetchAllCardsByUserId } from "../../service/cardService";
import Iterable from "../../types/Iterable";
import ThemesList from "./components/ThemesList";
import CardsList from "./components/CardsList";
import { iterableBuilder } from "../../types/IterableClass";

const fetchItems = function (pageNo: number) {
  return fetchAllCardsByUserId(1, pageNo, 10, "id", "asc");
};

export default function ViewCards() {
  const [theme, setTheme] = useState<Iterable>(
    iterableBuilder(0,"","")
  );

  return (
    <Layout
      style={{
        backgroundColor: "rgba(255, 255, 255, 0)",
      }}
    >
      <Space direction="vertical">
      <ThemesList callbackSetTheme = {(item:Iterable)=>{setTheme(item)}}/>
      <CardsList theme={theme}/>
      </Space>
    </Layout>
  );
}
