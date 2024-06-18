import React, { useEffect, useState } from "react";
import E_ListInfiniteOrdered from "./lowlevel/E_ListInfiniteOrdered";
import axios from "axios";
import { useLoadUpdated } from "../../../hooks/useLoadUpdated";
import { iterableBuilder } from "../../../types/IterableClass";
import Iterable from "../../../types/Iterable";
import CONFIG from "../../../Config";
import { useToken } from "../../../hooks/useToken";

interface Props {
  themeId: number;
  reloadList: boolean;
  params: (pageNo: number) => any;
  requestUrl: string;
  onListReloaded: any;
  onItemSelected: any;
  onListOrderChange: any;
}

const E_ListOrdered: React.FC<Props> = ({
  themeId,
  reloadList,
  params,
  requestUrl,
  onListReloaded,
  onItemSelected,
  onListOrderChange,
}) => {
  const [_page, setPage] = useState(0);
  const [_toReloadList, setToReloadList] = useState(false);
  const [_list, setList] = useState<Iterable[]>([]);
  const [_hasMoreItems, setHasMoreItems] = useState(false);
  const [_isLoading, setIsLoading] = useState(false);
  const [_selectedItem, setSelectedItem] = useState<Iterable | null>(null);
  const [_themeId, setThemeId] = useState(0);
  const [_token] = useToken();

  const fetchItemsFunction = function (pageNo: number) {
    return axios.get(CONFIG.BACK_SERVER_DOMAIN + requestUrl, {
        headers: { Authorization: _token ? `${_token}` : null },
        params: params(pageNo),
      })
      .then((response) => {
        let mappedContent: Iterable[] = [];
        response.data.content.forEach((e: any) => {
          mappedContent.push(
            iterableBuilder(e.id, e.title, e.content, e.details)
          );
        });
        response.data.content = mappedContent;
        return response.data;
      });
  };

  useEffect(() => {
    onItemSelected(_selectedItem);
  }, [_selectedItem]);

  useEffect(() => {
    if (reloadList) {
      setToReloadList(true);
    }
  }, [reloadList]);

  const { items, hasMore, loading } = useLoadUpdated(
    fetchItemsFunction,
    _page,
    _toReloadList
  );

  useEffect(() => {
    setList([]);
    setList(items);
    console.log("items set to " + items.length);
    setHasMoreItems(hasMore);
    setIsLoading(loading);
    setToReloadList(false);
    onListReloaded();
  }, [items, hasMore, loading]);
      
  useEffect(() => {
    if (themeId != null && themeId != _themeId) {
      setThemeId(themeId);
      setPage(0);
      setList([]);
      setToReloadList(true);
    }     
  }, [themeId]);

  return (
    <E_ListInfiniteOrdered
      items={_list}
      page={_page}
      hasMore={_hasMoreItems}
      loading={_isLoading}
      onPageChange={(pageNo: number) => {
        setPage(pageNo);
      }}
      onItemSelect={(item: any) => {
        setSelectedItem(item);
      }}
      onListOrderChange={onListOrderChange}
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
      listSize={{ maxWidth: "400px", maxHeight: "190px" }}/>
  );
};

export default E_ListOrdered;
