import Iterable from "./Iterable";
interface TextType extends Iterable {
    id: number,
    text: string,
  }

  class TextTypeClass implements TextType {
    constructor(public id: number, public text: string) {}
    getContent(): string {
      return this.text;
    }
  
    getId(): number {
      return this.id;
    }
  }

  export const textBuilder = (id:number, text:string) => {
    return new TextTypeClass(id, text);
  }

  export default TextType;