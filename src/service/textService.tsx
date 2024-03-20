import { abstractGet, abstractPut, abstractPost} from "./abstractService";
import Word from "../types/WordType";
import TextType, { textBuilder } from "../types/TextType";
import Iterable from "../types/Iterable";

export const fetchUserWordRelatedContext = async (
  userId: number,
  word: Word,
  pageNo: number
): Promise<any> => {
  let path = `api/texts/searchBy?userId=${userId}&filter=&pageNo=${pageNo}&pageSize=5&sortBy=&direction=&word=${word.word}`;
  return abstractGet(path).then((response) => {
    let mappedContent: TextType[] = [];
    response.content.forEach((e: TextType) => {
      mappedContent.push(textBuilder(e.id, e.text));
    });
    response.content = mappedContent;
    return response;
  });
};

export const saveNewCard = (userId:number, iterable:Iterable) =>{
  let path = `http://localhost:8080/api/cards?userId=${userId}`;
  abstractPost(path, iterable);
}
