import Word from "../types/WordType";
import { wordBuilder } from "../types/WordType";
import { abstractGet } from "./abstractService";

export const fetchWords = (
  pageNo: number,
  pageSize: number,
  sortBy: string,
  direction: string
): any => {
  return fetchAndMapToWords(
    `/api/words?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&direction=${direction}`
  );
};

export const fetchWordsByUserId = (
  userId: number,
  pageNo: number,
  pageSize: number
): any => {
  let path = `/api/words/searchBy?userId=${userId}&filter=&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=word&direction=asc`;
  return fetchAndMapToWords(path);
};

export const fetchAndMapToWords = async (path: string): Promise<any> => {
  const response = await abstractGet(path);
  let mappedContent: Word[] = [];
  response.data.content.forEach((e: Word) => {
    mappedContent.push(wordBuilder(e.id, e.word)); //TODO use builder
  });
  response.data.content = mappedContent;
  return response.data;
};
