import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { List, Skeleton } from "antd";
import { fetchUserWordRelatedContext } from "../service/textService";

declare type Fn = (a:any,b:any) => any;

interface Props {
  callbackFunction: Fn;
  listItemType: any;
  listItemDefaultInstance: any;
  scrollListBoxStyle: {height?: number|string, overflow: string,};
  listClearTriggerObject:any,
}

const ListScrollable: React.FC<Props> = ({
  callbackFunction,
  listItemType,
  listItemDefaultInstance,
  scrollListBoxStyle,
  listClearTriggerObject,
}) => {
  const [list, setList] = useState<(typeof listItemType)[]>([]);
  const [page, setPage] = useState(0);
  const [hasMoreItems, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [clickedItem, setClickedItem] = useState<typeof listItemType>(listItemDefaultInstance);
  const [resultSize, setResultSize] = useState(0);


  const loadContent = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
        const response = await callbackFunction(listClearTriggerObject, page);
        setList((prevList) => [...prevList, ...response.content]);
        setResultSize(response.totalElements)
        setHasMore(!response.last); // Update hasMore based on response.last
      } catch (error) {
        console.error(error);
      } finally {
        setPage((prevPage) => prevPage + 1); // Always increment page
        setLoading(false);
      }
  };

  useEffect(() => {
    setPage(0);
    setList([]);
    loadContent();
  }, [listClearTriggerObject]);


  const handleItemClick = (item: typeof listItemType) => {
    setClickedItem(item);
  };

  return (
    <>
    <div style={styles.boxTitle}>pick one from [{resultSize}] items</div>
    <div
      id="scrollableDiv"
      style={scrollListBoxStyle}
    >
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
          renderItem={(item: typeof listItemType) => (
            <List.Item
              key={item.id}
              style={{
                borderRadius: "1px",
                height: "auto",
                fontSize: "14px",
                padding: "3px",
                margin:"0px",
                fontFamily: "Merriweather",
                background: clickedItem.id === item.id ? "#D2CB9B" : "white",
                textAlign: 'left', 
                verticalAlign: 'top',
              }}
              onClick={() => handleItemClick(item)}
            >
              {item.text}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
    </>
  );
};

const styles ={
    boxTitle: {
      fontSize: "14px",
      color: "#867373",
      fontWeight: "bold",
      fontFamily: "Roboto Mono",
      marginTop:'0px',
      marginBottom:'10px'
    },
  }

export default ListScrollable;
