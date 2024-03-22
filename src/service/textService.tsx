import { abstractGet, abstractPut, abstractPost} from "./abstractService";
import Word from "../types/WordType";
import TextType, { textBuilder } from "../types/TextType";
import Iterable from "../types/Iterable";

export const fetchUserWordRelatedContext = (
  userId: number,
  word: Word,
  pageNo: number
): any => {
  let path = `/api/texts/searchBy?userId=${userId}&filter=&pageNo=${pageNo}&pageSize=5&sortBy=&direction=&word=${word.word}`;
  return abstractGet(path).then((response) => {
    let mappedContent: TextType[] = [];
    response.data.content.forEach((e: TextType) => {
      mappedContent.push(textBuilder(e.id, e.text));
    });
    return mappedContent;
  });
};

export const saveNewCard = (userId:number, iterable:Iterable) =>{
  let path = `/api/cards?userId=${userId}`;
  abstractPost(path, iterable);
}
