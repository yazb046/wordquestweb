import { useEffect, useState } from "react";

export const useLoadUpdated = ( dataFetchFunction: (pageNumber: number) => Promise<any>, pageNo:number, reload:boolean) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [items, setItems] = useState<any[]>([])
  const [toReload, setToReload] = useState(false);

  useEffect(() => {
    if(reload){
      setToReload(true);
    }
   }, [reload]);

  useEffect(() => {
    if(pageNo == 0){
      setItems([]);
    }
    setLoading(true);
    setError(false);
    dataFetchFunction(pageNo)
      .then((response: any) => {
        setItems((prevList: any[]) => [...prevList, ...response.content]);
        setItems((prevList: any[]) => {
          const uniqueItems = prevList.filter(
            (obj, index, self) =>
              index === self.findIndex((t) => t.getId() === obj.getId()) &&
              obj.getId() !== 0
          );
          return uniqueItems;
        });
        setHasMore(!response.last);
      })
      .catch((error: any) => {
        setError(true);
      })
      .finally(() => setLoading(false));
    setToReload(false);  
  }, [pageNo, toReload]);

  return {"items":items, "hasMore":hasMore, "loading":loading};
};
