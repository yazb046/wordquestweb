import { abstractGet, abstractPost} from "./abstractService";
import Word from "../types/WordType";
import TextType, { textBuilder } from "../types/TextType";

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
    response.data.content = mappedContent;
    return response.data;
  });
};


