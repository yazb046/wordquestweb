import Iterable from "./Iterable";
interface WordType extends Iterable {
  id: number;
  word: string;
  checked: boolean;
  langLevel: string;
  status: string;
  getContent:()=> string;
}

class WordTypeClass implements WordType {
  constructor(
    public id: number,
    public word: string,
    public checked: boolean,
    public langLevel: string,
    public status: string
  ) {
    this.id = id;
    this.word = word;
    this.checked = checked;
    this.langLevel = langLevel;
    this.status = status;
  }
  getContent(): string {
    return this.word;
  }

  getId(): number {
    return this.id;
  }

  setContent(content:string): void{
    this.word = content;
  }
}

export const wordBuilder = (id: number, name: string) => {
  return new WordTypeClass(id, name, false, "", "");
};

export default WordType;
