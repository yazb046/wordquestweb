import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { List } from "antd";
import Iterable from "../types/Iterable";

declare type Fn = (a: any, b: any) => any;

interface Props {
  loadListDataHandler: Fn;
  listItemDefaultInstance: Iterable;
  scrollListBoxStyle: { height?: number | string; overflow: string };
  listClearTriggerObject: Iterable | undefined;
  listItemStyle: any;
  clickedItemHandler: (item:Iterable)=>void;
}

const ListScrollable: React.FC<Props> = ({
  loadListDataHandler,
  listItemDefaultInstance,
  scrollListBoxStyle,
  listClearTriggerObject,
  listItemStyle,
  clickedItemHandler,
}) => {
  const [list, setList] = useState<(Iterable)[]>([]);
  const [page, setPage] = useState(0);
  const [hasMoreItems, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [clickedItem, setClickedItem] = useState<Iterable>(
    listItemDefaultInstance
  );
  const [resultSize, setResultSize] = useState(0);
  const [currentTriggerId, setCurrentTriggerId] = useState<number|undefined>(0);

  const loadContent = async () => {
    if(listClearTriggerObject?.getId() !== currentTriggerId){
      setPage(0);
      setList([]);
      let id = listClearTriggerObject?.getId();
      setCurrentTriggerId(id);
    } else {
      setPage((page)=> (page + 1));
    }

    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const response = await loadListDataHandler(page, listClearTriggerObject);
      setList((prevList) => [...prevList, ...response.content]);
      setResultSize(response.totalElements);
      setHasMore(!response.last);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      loadContent();
  }, [listClearTriggerObject]);

  const handleItemClick = (item: Iterable) => {
    setClickedItem(item);
    clickedItemHandler(item);
  };

  return (
    <>
      <div id="scrollableDiv" style={scrollListBoxStyle}>
        <InfiniteScroll
          height={scrollListBoxStyle.height}
          dataLength={list.length}
          next={loadContent}
          hasMore={hasMoreItems}
          scrollableTarget="scrollableDiv"
          loader={<div>loading...</div>}
          endMessage={<div>---</div>}
        >
          <List
            dataSource={list}
            renderItem={(item: Iterable) => (
              <List.Item
                key={item.getId()}
                style={{
                  ...listItemStyle,
                  background: clickedItem.getId() === item.getId() ? "#D2CB9B" : "white",
                }}
                onClick={() => handleItemClick(item)}
              >
                {item.getContent()}
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ListScrollable;
