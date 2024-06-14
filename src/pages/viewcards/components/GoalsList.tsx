import { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "../../../Config";
import { useUser } from "../../../hooks/useUser";
import { Collapse } from "antd";
import { useToken } from "../../../hooks/useToken";
import { iterableBuilder } from "../../../types/IterableClass";
import Iterable from "../../../types/Iterable";
import {useLoadUpdated} from "../../../hooks/useLoadUpdated";
import ListInfiniteFormatableSimple from "../elements/ListInfiniteFormatableSimple";
const { Panel } = Collapse;

interface Props {
  onItemSelected: any;
  reloadList:boolean;
  onListReloaded:any;
}


const GoalsList: React.FC<Props> = ({
  onItemSelected,
  reloadList,
  onListReloaded,
}) => {

  const [_page, setPage] = useState(0);
  const [_reload, setReload] = useState(true);
  const [_list, setList] = useState<any[]>([]);
  const [_hasMoreItems, setHasMoreItems] = useState(false);
  const [_isLoading, setIsLoading] = useState(false);
  const [_selectedItem, setSelectedItem] = useState<Iterable>(
    iterableBuilder(0,"","")
  );
  const _user = useUser();
  const [_token] = useToken();


  useEffect(() => {
    onItemSelected(_selectedItem);

  }, [_selectedItem]);

  useEffect(() => {
    if(reloadList){
      setReload(true);
    }
  }, [reloadList]);

  const fetchItemsFunction = function (pageNo: number) {
    let path = `api/cards/theme/${_user.userid}`;
    let params = {
      pageNo: pageNo,
      pageSize: 10,
      sortBy: "id",
      direction: "desc",
    };

    return axios
      .get(CONFIG.BACK_SERVER_DOMAIN + path, {
        headers: { Authorization: _token ? `${_token}` : null },
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

  const { items, hasMore, loading } = useLoadUpdated(fetchItemsFunction, _page, _reload);

  useEffect(() => {
    setList(items);
    setHasMoreItems(hasMore);
    setIsLoading(loading);
    setReload(false);
    onListReloaded();
  }, [items, hasMore, loading]);


  return (
    <>
      <ListInfiniteFormatableSimple
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
        listSize={{ maxWidth: "400px", maxHeight: "165px" }}
      />
    </>
  );
};

export default GoalsList;
