import Iterable from "./Iterable";
interface WordType extends Iterable {
  id: number;
  title: string;
  content: string;
  checked: boolean;
  langLevel: string;
  status: string;
  getContent: () => string;
}

class WordTypeClass implements WordType {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public checked: boolean,
    public langLevel: string,
    public status: string
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.checked = checked;
    this.langLevel = langLevel;
    this.status = status;
  }
  setId(id: number): void {
    this.id = id;
  }
  getTitle(): string {
    return this.title;
  }
  setTitle(title: string): void {
    this.title = title;
  }

  getContent(): string {
    return this.content;
  }

  getId(): number {
    return this.id;
  }

  setContent(content: string): void {
    this.content = content;
  }
}

export const wordBuilder = (id: number, title: string, content:string) => {
  return new WordTypeClass(id, title, content,false, "", "");
};

export default WordType;
