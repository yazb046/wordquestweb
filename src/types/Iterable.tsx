interface Iterable {
    getId:() => number;
    getContent: () => string;
    setContent: (content:any) => void;
    getTheme: () => string;
    getThemeId:() => number;
  }

export default Iterable;  