import { abstractFetchItemsBy } from "./abstractService";
import Word from "../types/WordType";
import TextType from "../types/TextType";

export const fetchUserWordRelatedContext = async(userId:number, word: Word, pageNo:number): Promise<any> => {
    let path = `api/texts/searchBy?userId=${userId}&filter=&pageNo=${pageNo}&pageSize=5&sortBy=&direction=&word=${word.word}`;
    return abstractFetchItemsBy(path);
};