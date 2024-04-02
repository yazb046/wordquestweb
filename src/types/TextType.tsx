import Iterable from "./Iterable";
interface TextType extends Iterable {
    id: number,
    text: string,
  }

  class TextTypeClass implements TextType {
    constructor(public id: number, public text: string) {}
  
    getTheme(): string {
      return "";
    }

    getContent(): string {
      return this.text;
    }
  
    getId(): number {
      return this.id;
    }

    setContent(content:string){
      this.text = content;
    }
  }

  export const textBuilder = (id:number, text:string) => {
    return new TextTypeClass(id, text);
  }

  export default TextType;