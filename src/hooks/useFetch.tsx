import { useEffect, useState } from "react";
import Iterable from "../types/Iterable";

export default function useFetch(
    pageNumber: number, 
    fetchData:(pageNumber:number)=>Promise<any>) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState<Iterable[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchData(pageNumber)
      .then((response:any) => {
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
  }, [pageNumber]);

  return { loading, error, items, hasMore };
}
