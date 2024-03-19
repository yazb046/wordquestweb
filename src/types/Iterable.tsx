interface Iterable {
    getId:() => number;
    getContent: () => string;
    setContent: (content:any) => void;
  }

export default Iterable;  