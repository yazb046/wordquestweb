import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import globaleStyles from "../../../assets/css/globalStyles";
import ListInfiniteFormatableUpdated from "../../../elements/ListInfiniteFormatableUpdated";
import axios from "axios";
import CONFIG from "../../../Config";
import { useUser } from "../../../hooks/useUser";
import { PlusSquareFilled } from "@ant-design/icons";
import { Collapse, Space, Tooltip } from "antd";
import AddThemeModel from "./AddThemeModel";
import { useToken } from "../../../hooks/useToken";
import { iterableBuilder } from "../../../types/IterableClass";
import Iterable from "../../../types/Iterable";
import {useLoadUpdated} from "../../../hooks/useLoadUpdated";
const { Panel } = Collapse;

interface ThemesListProps {
  onItemSelected: any;
}

const ThemesList: React.FC<ThemesListProps> = ({ onItemSelected }) => {
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Iterable>(
    iterableBuilder(0,"","")
  );
  const [paneValue, setPaneValue] = useState<Iterable>(
    iterableBuilder(0,"choose a goal","")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useUser();
  const [token] = useToken();


  useEffect(() => {
    onItemSelected(selectedItem);
    if(selectedItem!==undefined && selectedItem.getId()>0){
      setPaneValue(selectedItem);
    }

  }, [selectedItem]);

  const fetchItemsFunction = function (pageNo: number) {
    let path = `api/cards/theme/${user.userid}`;
    let params = {
      pageNo: pageNo,
      pageSize: 10,
      sortBy: "id",
      direction: "asc",
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

  const { items, hasMore, loading } = useLoadUpdated(fetchItemsFunction, page, reload);

  useEffect(() => {
    setList(items);
    setHasMoreItems(hasMore);
    setIsLoading(loading);
    setReload(false);
  }, [items, hasMore, loading]);

  const closeModal = () => {
    setIsModalOpen(false);
    setReload(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <AddThemeModel
          openModal={isModalOpen}
          closeModalCallback={closeModal}
        />
      <Space direction="horizontal"> 
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
        listSize={{ maxWidth: "400px", maxHeight: "100px" }}
      />
      <Space direction="vertical">
      
        <Tooltip title="add a new theme" trigger="hover">
          <PlusSquareFilled onClick={openModal} />
        </Tooltip>
      </Space>
      </Space>
    </div>
  );
};

const style = {
  siderLeft: {
    backgroundColor: "#e8f6fa",
    padding: "10px 7px",
    marginRight: "7px",
    marginLeft: "0px",
    marginBottom: "0px",
    boxShadow: "-0 0 5px rgba(0, 0, 0, 0.5)",
    borderRadius: 2,
  }
}

export default ThemesList;
