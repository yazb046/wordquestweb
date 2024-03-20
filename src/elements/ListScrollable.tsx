import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { List, Space, Row, Col, Tooltip } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import Iterable from "../types/Iterable";

declare type Fn = (a: any, b: any) => any;

interface Props {
  loadListDataHandler: Fn;
  listItemDefaultInstance: Iterable;
  scrollListBoxStyle: { height?: number | string; overflow: string };
  listClearTriggerObject: Iterable | undefined;
  listItemStyle: any;
  clickedItemHandler: (item: Iterable) => void; 
  addToolTipMessage:string;
}

const ListScrollable: React.FC<Props> = ({
  loadListDataHandler,
  listItemDefaultInstance,
  scrollListBoxStyle,
  listClearTriggerObject,
  listItemStyle,
  clickedItemHandler,
  addToolTipMessage,
}) => {
  const [list, setList] = useState<Iterable[]>([]);
  const [page, setPage] = useState(0);
  const [hasMoreItems, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [clickedItem, setClickedItem] = useState<Iterable>(
    listItemDefaultInstance
  );
  const [resultSize, setResultSize] = useState(0);
  const [currentTriggerId, setCurrentTriggerId] = useState<number | undefined>(
    0
  );
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const loadContent = async () => {
    if (listClearTriggerObject?.getId() !== currentTriggerId) {
      setPage(0);
      setList([]);
      console.log("listScrollable is set to Empty");
      let id = listClearTriggerObject?.getId();
      setCurrentTriggerId(id);
    } else {
      setPage((page) => page + 1);
    }

    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const response = await loadListDataHandler(page, listClearTriggerObject);
      setList((prevList) => [...prevList, ...response.content]);
      setList((prevList) => {
        const uniqueItems = prevList.filter(
          (obj, index, self) =>
            index === self.findIndex((t) => t.getId() === obj.getId())
        );
        return uniqueItems;
      });
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
    
  };

  const handleAddClick = () => {
    handleIconClick();
    clickedItemHandler(clickedItem);
  }

  const handleIconClick = () => {
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 2000); // Hide tooltip after 2 seconds
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
                  background:
                    clickedItem.getId() === item.getId() ? "#D2CB9B" : "white",
                }}
                onClick={() => handleItemClick(item)}
              >
                <Space direction="horizontal">
                {clickedItem.getId() === item.getId() ? (
                    <Space>
                    <Tooltip title={addToolTipMessage} trigger='hover'>
                      <PlusCircleFilled onClick={handleAddClick}/>{" "}
                    </Tooltip>
                    </Space>
                  ) : (
                    <></>
                  )}
                  <Space>{item.getContent()}</Space>
                </Space>
                <Row justify="end" align="middle" style={{ columnGap: "5px" }}>
                  
                  <Col></Col>
                </Row>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ListScrollable;
