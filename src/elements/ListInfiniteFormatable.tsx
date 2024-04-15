import { useState, useRef, useCallback, useEffect } from "react";
import Iterable from "../types/Iterable";
import { Divider, Tag, Flex, Input, Space, Button } from "antd";
const { Search } = Input;
import { fetchWordsByLetters } from "../service/wordService";
import { LoadingOutlined } from "@ant-design/icons";
import { textBuilder } from "../types/TextType";
import { wordBuilder } from "../types/WordType";
import { Content } from "antd/es/layout/layout";
import AppCardUpdated from "../elements/AppCardUpdated";
import SearchInputBox from "./SearchInputBox";

interface Props {
  items: Iterable[];
  loading: boolean;
  hasMore: boolean;
  page: number;
  onItemSelect: any;
  onPageChange: any;
}

const ListInfiniteFormatable: React.FC<Props> = ({
  items,
  loading,
  hasMore,
  page,
  onItemSelect,
  onPageChange,
}) => {
  const observer = useRef<IntersectionObserver>();
  const [error, setError] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Iterable[]>([]);
  const [selectedItem, setSelectedItem] = useState<Iterable>();
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");

  const lastListElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onPageChange(page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleDoubleClick = (item: Iterable) => {
    if (
      !selectedItems.some(
        (selectedItem) => selectedItem.getId() === item.getId()
      )
    ) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleClick = (item: Iterable) => {
    setSelectedItem(item);
    onItemSelect(item);
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
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    if (draggedItemId !== null) {
      const targetIndex = index;
      const itemsCopy = [...items];
      const draggedItemIndex = itemsCopy.findIndex(
        (item) => item.getId() === draggedItemId
      );
      const draggedItem = itemsCopy[draggedItemIndex];
      itemsCopy.splice(draggedItemIndex, 1);
      itemsCopy.splice(targetIndex, 0, draggedItem);
      setItems(itemsCopy);
    }
  };

  const onSearch = (value: string) => {
    setPageNumber(0);
    setSearchText(value);
    setItems([]);
    fetchWordsByLetters(value).then((items: Iterable[]) => {
      setItems(items);
    });
  };

  const onClearButtonClick = () => {
    setSearchText("");
    setItems([]);
  };

  return (
    <>
      <Space direction="vertical">
        <SearchInputBox
          onSearch={onSearch}
          searchText={searchText}
          setSearchText={(e: any) => setSearchText(e.target.value)}
          onClearButtonClick={onClearButtonClick}
        />

        <div style={{ overflow: "auto", maxWidth: 300 }}>
          {items.map((item, index) => {
            const isLastItem = items.length > 0 && index === items.length - 1;
            const isSelected = selectedItem?.getId() === item.getId();

            const itemStyle = {
              cursor: "grab",
              backgroundColor: isSelected ? "#FBF3C5" : "white",
              border:
                draggedItemId === item.getId() ? "1px solid #eb6734" : "none",
              margin: "5px",
              height: "40px",
              fontSize: "14px",
              padding: "3px",
              paddingLeft: "7px",
              borderRadius: "5px",
              fontFamily: "Merriweather",
              boxShadow: "0 0 3px rgba(0, 0, 0, 1)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            };

            return (
              <div
                ref={isLastItem ? lastListElementRef : undefined}
                key={item.getId()}
                onClick={() => handleClick(item)}
                // onDoubleClick={() => handleDoubleClick(item)}
                onDragStart={(e) => handleDragStart(e, item.getId())}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, index)}
                draggable
                style={
                  isLastItem ? { ...itemStyle, cursor: "default" } : itemStyle
                }
              >
                {item.getTitle()}
              </div>
            );
          })}
          {loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}
          {error && <div>Error loading items</div>}
          {!loading && hasMore && (
            <div ref={lastListElementRef}>Loading more...</div>
          )}
        </div>
      </Space>
    </>
  );
};
export default ListInfiniteFormatable;
