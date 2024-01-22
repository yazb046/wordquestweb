import { putWord } from "./ServerService";

const addWordToMyList = (userId: number, wordId: number) => {
  putWord(userId, wordId);
};

export default addWordToMyList;
