interface Iterable {
    getId:() => number;
    getContent: () => string;
    setContent: (content:any) => void;
    getTheme: () => string;
  }

export default Iterable;  