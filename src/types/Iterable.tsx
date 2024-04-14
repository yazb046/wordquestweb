interface Iterable {
    getId:() => number|undefined;
    setId:(id:number) => void;
    getTitle: () => string;
    setTitle: (content:string) => void;
    getContent: () => string;
    setContent: (content:string) => void;
  }

export default Iterable;  