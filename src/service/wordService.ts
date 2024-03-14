
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
        console.error('Response error status:', response.status);
        return [];
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      return [];
    }
};


export const fetchWordsByUserId = async (userId:number, pageNo:number,pageSize:number): Promise<any> => {
  let url = `http://localhost:8080/api/words/searchBy?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=word&direction=asc`;
  try {
    const response = await axios.get<any>(url);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Response error status:', response.status);
      return [] as unknown as Word[];
    }
  } catch (error: any) {
    console.error('Error:', error.message);
    return [] as unknown as Word[];
  }
};