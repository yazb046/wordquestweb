
import axios from 'axios';

interface Word{
    id: number;
    word: string;
    checked: null,
    langLevel: null
}


export const fetchWords = async (): Promise<Word[]> => {
    try {
      const response = await axios.get<Word[]>('http://localhost:8080/api/words');
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Некорректный статус ответа:', response.status);
        return [];
      }
    } catch (error: any) {
      console.error('Ошибка:', error.message);
      return [];
    }
  };

