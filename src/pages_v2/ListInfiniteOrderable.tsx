import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLoadUpdated } from "./hooks/useLoadUpdated";
import { iterableBuilder } from "../types/IterableClass";
import Iterable from "../types/Iterable";
import CONFIG from "../Config";
import { useToken } from "../hooks/useToken";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  requestParams: (pageNo: number) => any;
  requestUrl: string;
  renderItem?: (item: any) => React.ReactNode;
}

const ListInfiniteOrderable: React.FC<Props> = ({
  requestParams,
  requestUrl,
  renderItem,
}) => {
  const [_page, setPage] = useState(0);
  const [_list, setList] = useState<Iterable[]>([]);
  const [_hasMoreItems, setHasMoreItems] = useState(false);
  const [_isLoading, setIsLoading] = useState(false);
  const [_selectedItem, setSelectedItem] = useState<Iterable | null>(null);
  const [_token] = useToken();

  const fetchItemsFunction = function (pageNo: number) {
    return axios
      .get(CONFIG.BACK_SERVER_DOMAIN + requestUrl, {
        headers: { Authorization: _token ? `${_token}` : null },
        params: requestParams(pageNo),
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

  const { items, hasMore, loading } = useLoadUpdated(fetchItemsFunction, _page);

  useEffect(() => {
    setList(items);
    setHasMoreItems(hasMore);
    setIsLoading(loading);
  }, [items, hasMore, loading]);

  // --
  const _observer = useRef<IntersectionObserver>();
  const [_error, setError] = useState(false);
  const [_draggedItemId, setDraggedItemId] = useState<number | null>(null);

  const lastListElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (_observer.current) _observer.current.disconnect();
      _observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(_page + 1);
        }
      });
      if (node) _observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleDoubleClick = (item: Iterable) => {
    console.log();
  };

  const handleClick = (item: Iterable) => {
    setSelectedItem(item);
    onItemSelected(_selectedItem);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    itemId: number
  ) => {
    e.dataTransfer.setData("text/plain", itemId.toString());
    setDraggedItemId(itemId);
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    // implement save list to server
    onListOrderChange(_list);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    if (_draggedItemId !== null) {
      const targetIndex = index;
      const listCopy = [..._list];
      const draggedItemIndex = listCopy.findIndex(
        (item) => item.getId() === _draggedItemId
      );
      const draggedItem = listCopy[draggedItemIndex];
      listCopy.splice(draggedItemIndex, 1);
      listCopy.splice(targetIndex, 0, draggedItem);
      setList(listCopy);
    }
  };

  return (
    <>
      <div style={{ overflow: "auto", ...styles.listSize }}>
        {_list.map((item, index) => {
          const isLastItem = _list.length > 0 && index === _list.length - 1;
          const isSelected = _selectedItem?.getId() === item.getId();
          const selectionStyle = {
            backgroundColor: isSelected ? "#FBF3C5" : "white",
          };
          return (
            <div
              ref={isLastItem ? lastListElementRef : undefined}
              key={item.getId()}
              onClick={() => handleClick(item)}
              onDoubleClick={() => handleDoubleClick(item)}
              onDragStart={(e) => handleDragStart(e, item.getId())}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              draggable
              style={
                isLastItem
                  ? { ...styles.listItemStyles, ...selectionStyle }
                  : { ...styles.listItemStyles }
              }
            >
              {renderItem ? renderItem(item) : item.getTitle()}
            </div>
          );
        })}
        {loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}
        {_error && <div>Error loading items</div>}
        {!loading && hasMore && (
          <div ref={lastListElementRef}>Loading more...</div>
        )}
      </div>
    </>
  );
};

export default ListInfiniteOrderable;

const styles = {
  listSize: { maxWidth: "300px", maxHeight: "190px" },
  listItemStyles: {
    cursor: "grab",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "14px",
    padding: "3px",
    paddingLeft: "7px",
    borderRadius: "2px",
    fontFamily: "Merriweather",
    border: "1px solid #D3D3D3",
  },
};
