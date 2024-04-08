import { useCallback, useEffect } from "react";

export const useLoad = ( 
    dataFetchFunction: (pageNumber:number) => Promise<any>, 
    onSelect:any,
    pageNumber:number,
    items:any[],
    setItems:any,

) => {
    useEffect(() => {
        setLoading(true);
        setError(false);
        dataFetchFunction(pageNumber)
          .then((response: any) => {
            setItems((prevList:any[]) => [...prevList, ...response.content]);
            setItems((prevList:any[]) => {
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
      }, [pageNumber]);
}

export const lastListElementRef = useCallback(
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


