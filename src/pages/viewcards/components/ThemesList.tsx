import Sider from 'antd/es/layout/Sider';
import { useEffect, useState } from 'react'
import globaleStyles from '../../../assets/css/globalStyles';
import ListInfiniteFormatable from '../../../elements/ListInfiniteFormatable';
import axios from 'axios';
import { useLoad } from '../../../hooks/useLoad';
import CONFIG from "../../../Config"
import { useUser } from '../../../hooks/useUser';
import { PlusSquareFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import AddThemeModel from './AddThemeModel';

export default function ThemesList() {

  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const use = useUser();

  const fetchItemsFunction = function (pageNo: number) {
    let path = "/api/cards/theme";
    let params = { pageNo:pageNo, pageSize:10 , sortBy:"id", direction:"asc" };

    return axios.get(CONFIG.BACK_SERVER_DOMAIN + "path", {params})
    .then(response=>{return response.data});
  };

  const { items, hasMore, loading } = useLoad(fetchItemsFunction, page, reload);
  useEffect(() => {
    setList(items);
    setHasMoreItems(hasMore);
    setIsLoading(loading);
  }, [items, hasMore, loading]);

  const closeModal =() =>{
    setIsModalOpen(false);
  }

  return (
    <Sider
        width={"400px"}
        style={{ ...globaleStyles.siderLeft, height: "260px" }}
      >
        <AddThemeModel openModal={isModalOpen} closeModalCallback={closeModal}/>
        <h3>Themes</h3>
        <Tooltip title="add a new theme" trigger="hover">
            <PlusSquareFilled onClick={() => setIsModalOpen(true)} />
          </Tooltip>
        <ListInfiniteFormatable
          items={list}
          page={page}
          hasMore={hasMoreItems}
          loading={isLoading}
          onPageChange={(pageNo: number) => {
            setPage(pageNo);
          }}
          onItemSelect={(item: any) => setSelectedItem(item)}
        />
      </Sider>
  )
}
