import { useState, useRef, useCallback, useEffect } from "react";
import Iterable from "../types/Iterable";
import { Divider, Tag, Flex, Input, Space, Button} from "antd";
const { Search } = Input;
import { fetchWordsByLetters } from "../service/wordService";
import { LoadingOutlined } from "@ant-design/icons";

interface ListInfiniteProps {
  fetchFunction: (pageNumber: number, langLevel: string) => Promise<any>;
  aLangLevel: string;
  pressedOk:boolean;
  pressedCancel:boolean;
  save:(userId:number, items:Iterable[])  => void;
}

const ListInfinite: React.FC<ListInfiniteProps> = ({
  fetchFunction,
  aLangLevel,
  pressedOk,
  pressedCancel,
  save,
}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const observer = useRef<IntersectionObserver>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState<Iterable[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [langLevel, setLangLevel] = useState("all");
  const [selectedItems, setSelectedItems] = useState<Iterable[]>([]);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(()=>{
    if(pressedOk){
      save(1, selectedItems);
    }
    cleanComponent();
  },[pressedOk, pressedCancel])

  const cleanComponent= () => {
    setItems([]);
    setSelectedItems([]);
    setPageNumber(0),
    setIsFilterOn(false);
    setLangLevel("");
    setSearchText("");
  }

  const handleClick = (item: Iterable) => {
    if (
      !selectedItems.some(
        (selectedItem) => selectedItem.getId() === item.getId()
      )
    ) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const tagCloseHandle = (item: Iterable) => {
    let temp = selectedItems.filter((e) => e.getId() !== item.getId());
    setSelectedItems(temp);
  };

  useEffect(() => {
    if(isFilterOn) return;
    setLoading(true);
    setError(false);
    fetchFunction(pageNumber, aLangLevel)
      .then((response: any) => {
        if (langLevel !== aLangLevel) {
          setItems([]);
          setLangLevel(aLangLevel);
          setPageNumber(0);
        }
        setItems((prevList) => [...prevList, ...response.content]);
        setItems((prevList) => {
          const uniqueItems = prevList.filter(
            (obj, index, self) =>
              index === self.findIndex((t) => t.getId() === obj.getId())
          );
          return uniqueItems;
        });
        setHasMore(!response.last);
      })
      .catch((error: any) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [aLangLevel, pageNumber, isFilterOn,pressedCancel,pressedOk]);

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

  const onSearch = (value:string) => {
    aLangLevel='';
    setLangLevel('');
    setPageNumber(0);
    setSearchText(value);
    setIsFilterOn(true);
    setItems([]);
    fetchWordsByLetters(value).then((items:Iterable[]) =>{
      setItems(items);
    })
  }

  const onClearButtonClick = () => {
    setSearchText('');
    setItems([]);
    setIsFilterOn(false);
    aLangLevel='all';
  }

  return (
    <>
    <Space.Compact style={{ width: '100%' }}>
    <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200, paddingBottom:'5px' }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button type="primary" onClick={onClearButtonClick}>Clear</Button>
    </Space.Compact>
      
      <div style={{ height: 200, overflow: "auto" }}>
        {items.map((item, index) => {
          if (items.length > 0 && index === items.length - 1) {
            return (
              <div
                ref={lastListElementRef}
                key={item.getId()}
                onClick={() => handleClick(item)}
                style={{
                  cursor: "pointer",
                  background: selectedItems.some(
                    (selectedItem) => selectedItem.getId() === item.getId()
                  )
                    ? "#FBF3C5"
                    : "white",
                  borderRadius: "1px",
                  borderBottom: "1px solid #ccc",
                  height: "25px",
                  fontSize: "13px",
                  paddingLeft: "7px",
                  fontFamily: "Merriweather",
                  fontWeight: "bold",
                }}
              >
                {item.getContent()}
              </div>
            );
          } else {
            return (
              <div
                key={item.getId()}
                onClick={() => handleClick(item)}
                style={{
                  cursor: "pointer",
                  background: selectedItems.some(
                    (selectedItem) => selectedItem.getId() === item.getId()
                  )
                    ? "#FBF3C5"
                    : "white",
                  borderRadius: "1px",
                  borderBottom: "1px solid #ccc",
                  height: "25px",
                  fontSize: "13px",
                  paddingLeft: "7px",
                  fontFamily: "Merriweather",
                  fontWeight: "bold",
                }}
              >
               
                {item.getContent()}
                
              </div>
            );
          }
        })}
        <div>{loading && <LoadingOutlined />}</div>
        <div>{error && "Error"}</div>
      </div>
      <Divider />
      <Flex gap="0 0" wrap="wrap" style={{ maxHeight: 100, overflow: "auto" }}>
        {selectedItems.map((item, index) => (
          <Tag
            key={item.getId()}
            bordered={false}
            closable
            onClose={() => tagCloseHandle(item)}
            style={{ fontSize: "13px" }}
          >
            {item.getContent()}
          </Tag>
        ))}
      </Flex>
    </>
  );
};

export default ListInfinite;
