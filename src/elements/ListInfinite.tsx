import { useState, useRef, useCallback } from "react";
import useFetch from "../hooks/useFetch";
import { fetchWords, fetchWordsByUserId } from "../service/wordService";

export default function ListInfinite() {
  const [pageNumber, setPageNumber] = useState(0);
  const observer = useRef<IntersectionObserver>();

  const fetchDataFunction = (page: number) => {
    return fetchWords(page, 10, 'word','asc');
  };

  const { items, hasMore, loading, error } = useFetch(
    pageNumber,
    fetchDataFunction
  );
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

  return (
    <div style={{ height: 200, overflow: "auto" }}>
      {/* <input type="text" value={query} onChange={handleSearch}></input> */}
      {items.map((item, index) => {
        if (items.length === index + 1) {
          return (
            <div ref={lastListElementRef} key={item.getId()}>
              {item.getContent()}
            </div>
          );
        } else {
          return <div key={item.getId()}>{item.getContent()}</div>;
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
}
