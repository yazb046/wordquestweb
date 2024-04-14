import Iterable from "./Iterable";
interface CardType extends Iterable {
  id: number | undefined;
  title: string;
  content: string;
  isArchived: boolean;
  userId: number;
  word: Iterable|undefined;
  version: number;
}

class CardTypeClass implements CardType {
  constructor(
    public id: number | undefined,
    public title: string,
    public content: string,
    public isArchived: boolean,
    public userId: number,
    public word: Iterable|undefined,
    public version: number
  ) {}

  getId(): number | undefined {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  setContent(content: string) {
    this.content = content;
  }

  getContent(): string {
    return this.content;
  }

  setTitle(title: string) {
    this.title = title;
  }

  getTitle(): string {
    return this.title;
  }
}

export const cardBuilder = (
  id: number | undefined,
  title: string,
  content: string,
) => {
  return new CardTypeClass(id, title, content, false, 0, undefined, 0);
};

export const cardBuilderExtended = (
  id: number | undefined,
  title: string,
  content: string,
  isArchived: boolean,
  userId: number,
  word: Iterable|undefined,
  version: number,
) => {
  return new CardTypeClass(id, title, content, isArchived, userId, word, 0);
};

export default CardType;
