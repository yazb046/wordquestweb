import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../hooks/useToken";
import Iterable from "../types/Iterable";
import { Tooltip } from "antd";
import Config from "../Config";
import { SaveFilled } from "@ant-design/icons";
import E_ListOrdered from "./E_ListOrdered";

interface CardsListProps {
  goal:Iterable | null;
  onItemSelected: any;
  theme: Iterable | null;
  forceListReload: boolean;
  onListReloaded: any;
}

const StepsList: React.FC<CardsListProps> = ({
  theme,
  onItemSelected,
  forceListReload,
  onListReloaded,
}) => {
  const [_toReloadList, setToReloadList] = useState(false);
  const [_selectedItem, setSelectedItem] = useState<Iterable | null>(null);
  const [_themeId, setThemeId] = useState(0);
  const [_token] = useToken();
  const [_itemsIdsOrder, setItemsIdsOrder] = useState<number[]>([]);

  

  useEffect(() => {
    onItemSelected(_selectedItem);
  }, [_selectedItem]);

  useEffect(() => {
    if (forceListReload) {
      setToReloadList(true);
    }
  }, [forceListReload]);


  useEffect(() => {
    if (theme != null && theme.getId() != _themeId) {
      setThemeId(theme.getId());
      setToReloadList(true);
    }
  }, [theme]);

  const saveOrder = () => {
    let path = `api/cards/order/${_themeId}`;
    axios.post(Config.BACK_SERVER_DOMAIN + path, _itemsIdsOrder, {
      headers: {
        Authorization: _token ? `${_token}` : null,
      },
    });
  };

  const onListSave = () => {
    saveOrder();
  };

  const _params = (pageNo: number) => {
    return {
      pageNo: pageNo,
      pageSize: 10,
    };
  };

  return (
    <>
      <E_ListOrdered
        params={_params}
        reloadList={_toReloadList}
        requestUrl={`api/cards/order/${_themeId}`}
        themeId={_themeId}
        onListReloaded={() => {
          setToReloadList(false);
          onListReloaded();
        }}
        onItemSelected={
          (item: any) => setSelectedItem(item)
        }
        onListOrderChange={(items: Iterable[]) => {
          setItemsIdsOrder(items.map((e) => e.getId()));
        }}
      />

      <Tooltip title="save steps order" trigger="hover">
        <SaveFilled onClick={onListSave} />
      </Tooltip>
    </>
  );
};

export default StepsList;
