import Iterable from "./Iterable";
export default class IterableClass implements Iterable {
    constructor(
        public id: number,
        public title: string,
        public content: string,
      ) {
        this.id = id;
        this.title = title;
        this.content = content;
      }

      getTitle(): string {
        return this.title;
      }
    
      getContent(): string {
        return this.content;
      }
    
      getId(): number {
        return this.id;
      }

      setId(id: number): void {
        this.id = id;
      }
     
      setTitle(title: string): void {
        this.title = title;
      }
    
      setContent(content: string): void {
        this.content = content;
      }
    
  }

  export const iterableBuilder = (id: number, title: string, content:string) => {
    return new IterableClass(id, title, content);
  };