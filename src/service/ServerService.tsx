import axios from "axios";
const GET_WORDS_URL = "http://localhost:8080/api/words";
const PUT_WORD_URL = "http://localhost:8080/api/words/update?";

export const fetchWords = async (callback: Function) => {
  try {
    const response = await axios.get(GET_WORDS_URL);
    console.info("fetched data of size ", response.data.length);
    callback(response.data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const putWord = async (userId: number, wordId: number) => {
  try {
    const response = await axios.put(
      PUT_WORD_URL,
      {},
      {
        params: {
          userId: userId,
          wordId: wordId,
        },
      }
    );
    console.info("put data", response.data.length);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
