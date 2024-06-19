import Iterable from "../types/Iterable";
interface CardType extends Iterable {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
  userId: number;
  word: Iterable|null;
  version: number;
}

class CardTypeClass implements CardType {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public isArchived: boolean,
    public userId: number,
    public word: Iterable|null,
    public version: number
  ) {}

  getId(): number {
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
  id: number,
  title: string,
  content: string,
) => {
  return new CardTypeClass(id, title, content, false, 0, null, 0);
};

export const cardBuilderExtended = (
  id: number,
  title: string,
  content: string,
  isArchived: boolean,
  userId: number,
  word: Iterable|null,
  version: number,
) => {
  return new CardTypeClass(id, title, content, isArchived, userId, word, 0);
};

export default CardType;
