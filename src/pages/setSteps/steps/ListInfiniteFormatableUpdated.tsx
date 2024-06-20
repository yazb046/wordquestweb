import { useState, useRef, useCallback, useEffect } from "react";
import Iterable from "../../../types/Iterable";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  items: Iterable[];
  loading: boolean;
  hasMore: boolean;
  page: number;
  onItemSelect: any;
  onPageChange: any;
  onListOrderChange: any;
  listItemStyles:any|null;
  listSize:{maxWidth: string, maxHeight:string};
}

const ListInfiniteFormatableUpdated: React.FC<Props> = ({
  items,
  loading,
  hasMore,
  page,
  onItemSelect,
  onPageChange,
  onListOrderChange,
  listItemStyles,
  listSize,
}) => {
  const _observer = useRef<IntersectionObserver>();
  const [_error, setError] = useState(false);
  const[_items, setItems] = useState<Iterable[]>([]);
  const [_selectedItem, setSelectedItem] = useState<Iterable>();
  const [_draggedItemId, setDraggedItemId] = useState<number | null>(null);


  useEffect(()=>{
    setItems(items);
  },[items])

  const lastListElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (_observer.current) _observer.current.disconnect();
      _observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onPageChange(page + 1);
        }
      });
      if (node) _observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleDoubleClick = (item: Iterable) => {
    console.log();
  };

  useEffect(() => {
    onItemSelect(_selectedItem);
  }, [_selectedItem]);


  const handleClick = (item: Iterable) => {
    setSelectedItem(item);
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
    onListOrderChange(_items);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    if (_draggedItemId !== null) {
      const targetIndex = index;
      const itemsCopy = [..._items];
      const draggedItemIndex = itemsCopy.findIndex(
        (item) => item.getId() === _draggedItemId
      );
      const draggedItem = itemsCopy[draggedItemIndex];
      itemsCopy.splice(draggedItemIndex, 1);
      itemsCopy.splice(targetIndex, 0, draggedItem);
      setItems(itemsCopy);
    }
  };

  return (
    <>
        <div style={{ overflow: "auto", ...listSize }}>
          {_items.map((item, index) => {
            const isLastItem = _items.length > 0 && index === _items.length - 1;
            const isSelected = _selectedItem?.getId() === item.getId();

            const itemDefaultStyle = {
              cursor: "grab",
              backgroundColor: isSelected ? "#FBF3C5" : "white",
              border:"1px solid #000001",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
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
                  isLastItem ? { ...itemDefaultStyle, ...listItemStyles, cursor: "default" } 
                  : {...itemDefaultStyle, ...listItemStyles}
                }
              >
                {item.getTitle()}
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
export default ListInfiniteFormatableUpdated;
