interface TextType {
    id: number,
    text: string,
  }

  class TextTypeClass implements TextType {
    constructor(public id: number, public text: string) {}
  }

  export const textBuilder = (id:number, text:string) => {
    return new TextTypeClass(id, text);
  }

  export default TextType;