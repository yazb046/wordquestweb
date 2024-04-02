import { useState, useRef, useCallback, useEffect } from "react";
import Iterable from "../types/Iterable";
import { Divider, Tag, Flex, Input, Space, Button } from "antd";
const { Search } = Input;
import { fetchWordsByLetters } from "../service/wordService";
import { LoadingOutlined } from "@ant-design/icons";
import { textBuilder } from "../types/TextType";

interface Props {
  dataFetchFunction: any;
  onSelect: any;
}

const ListInfiniteFormatable: React.FC<Props> = ({
  dataFetchFunction,
  onSelect,
}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const observer = useRef<IntersectionObserver>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState<Iterable[]>([textBuilder(0, "empty")]);
  const [hasMore, setHasMore] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Iterable[]>([]);
  const [searchText, setSearchText] = useState("");

  const handleClick = (item: Iterable) => {
    if (
      !selectedItems.some(
        (selectedItem) => selectedItem.getId() === item.getId()
      )
    ) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    dataFetchFunction(pageNumber)
      .then((response: any) => {
        setItems((prevList) => [...prevList, ...response.content]);
        setItems((prevList) => {
          const uniqueItems = prevList.filter(
            (obj, index, self) =>
              index === self.findIndex((t) => t.getId() === obj.getId()) &&
              obj.getId()!==0
          );
          return uniqueItems;
        });
        setHasMore(!response.last);
      })
      .catch((error: any) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [pageNumber]);

  const lastListElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber: number) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

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

  const onSelectListItem = (item: any) => {
    return selectedItems.some(
      (selectedItem) => selectedItem.getId() === item.getId()
    );
  };

  return (
    <>
      <Space.Compact style={{ width: "100%" }}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 235, paddingBottom: "5px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button type="primary" onClick={onClearButtonClick}>
          Clear
        </Button>
      </Space.Compact>

      <div style={{ height: 537, overflow: "auto", maxWidth: 300 }}>
        {items.map((item, index) => {
          const isLastItem = items.length > 0 && index === items.length - 1;
          const isSelected = selectedItems.some(
            (selectedItem) => selectedItem.getId() === item.getId()
          );

          const itemStyle = {
            cursor: "pointer",
            background: isSelected ? "#FBF3C5" : "white",
            borderRadius: "3px",
            borderBottom: "1px solid #ccc",
            margin:"5px",
            height: "50px",
            fontSize: "14px",
            paddingLeft: "7px",
            paddingRight: "7px",
            fontFamily: "Merriweather",
            boxShadow: "1 1 1px rgba(0, 0, 0, 0.5)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          };

          return (
            <div
              draggable
              
              ref={isLastItem? lastListElementRef:undefined}
              key={item.getId()}
              onClick={() => handleClick(item)}
              style={
                isLastItem ? { ...itemStyle, cursor: "default" } : itemStyle
              }
            >
                <p>{item.getTheme()}:</p> 
                {item.getContent()} 
            </div>
          );
          
        })}
      </div>
    </>
  );
};

export default ListInfiniteFormatable;
