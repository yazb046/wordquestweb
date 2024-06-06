import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import globaleStyles from "../../../assets/css/globalStyles";
import ListInfiniteFormatableUpdated from "../../../elements/ListInfiniteFormatableUpdated";
import axios from "axios";
import CONFIG from "../../../Config";
import { PlusSquareFilled } from "@ant-design/icons";
import { Space, Tooltip } from "antd";
import { useToken } from "../../../hooks/useToken";
import { iterableBuilder } from "../../../types/IterableClass";
import Iterable from "../../../types/Iterable";
import AddCardModel from "./AddCardModel";
import { useLoadUpdated } from "../../../hooks/useLoadUpdated";

interface CardsListProps {
  onItemSelected: any;
  theme: Iterable;
  reloadList: boolean;
}

const CardsList: React.FC<CardsListProps> = ({
  theme,
  onItemSelected,
  reloadList,
}) => {
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(iterableBuilder(0, "", ""));
 
  const [themeId, setThemeId] = useState(0);
  const [token] = useToken();

  useEffect(() => {
    onItemSelected(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    if(reloadList){
      setReload(true);
    }
  }, [reloadList]);

  const fetchItemsFunction = function (pageNo: number) {
    let path = `api/cards/${themeId}`;
    let params = {
      pageNo: pageNo,
      pageSize: 10,
      sortBy: "id",
      direction: "desc",
    };

    return axios
      .get(CONFIG.BACK_SERVER_DOMAIN + path, {
        headers: { Authorization: token ? `${token}` : null },
        params: params,
      })
      .then((response) => {
        let mappedContent: Iterable[] = [];
        response.data.content.forEach((e: any) => {
          mappedContent.push(iterableBuilder(e.id, e.title, e.description));
        });
        response.data.content = mappedContent;
        return response.data;
      });
  };
  const { items, hasMore, loading } = useLoadUpdated(
    fetchItemsFunction,
    page,
    reload
  );

  useEffect(() => {
    setList(items);
    setHasMoreItems(hasMore);
    setIsLoading(loading);
    setReload(false);
  }, [items, hasMore, loading]);

  useEffect(() => {
    if (
      theme !== undefined &&
      theme.getId() !== 0 &&
      themeId !== theme.getId()
    ) {
      setThemeId(theme.getId());
      setPage(0);
      setReload(true);
    }
  }, [theme]);

  useEffect(() => {
    setPage(0);
    setReload(true);
  }, [selectedItem]);

 

  return (
    <>
      <Space direction="horizontal">
        {themeId === 0 ? (
          <p>set a goal first</p>
        ) : (
          <>
            <ListInfiniteFormatableUpdated
              items={list}
              page={page}
              hasMore={hasMoreItems}
              loading={isLoading}
              onPageChange={(pageNo: number) => {
                setPage(pageNo);
              }}
              onItemSelect={(item: any) => {
                setSelectedItem(item);
              }}
              listItemStyles={{
                height: "30px",
                width: "385px",
                fontSize: "14px",
                padding: "3px",
                paddingLeft: "7px",
                borderRadius: "2px",
                fontFamily: "Merriweather",
                border: "1px solid #D3D3D3",
              }}
              listSize={{ maxWidth: "400px", maxHeight: "210px" }}
            />
          </>
        )}
      </Space>
    </>
  );
};

export default CardsList;
