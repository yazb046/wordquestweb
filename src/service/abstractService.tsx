import axios from "axios";
const SERVER_DOMAIN = 'http://localhost:8080/';

export const abstractFetchItemsBy = async (path:string): Promise<any> => {
    try {
      const response = await axios.get<any>(SERVER_DOMAIN + path);
      if (response.status === 200) {
        
        return response.data;
  
      } else {
        console.error("Response error status:", response.status);
        return [];
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      return [];
    }
  };