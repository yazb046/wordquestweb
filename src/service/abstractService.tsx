import axios from "axios";
const SERVER_DOMAIN = 'http://localhost:8080/';

export const abstractGet = async (path:string): Promise<any> => {
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

  export const abstractPut = (url:string, data:any) =>{
    axios.put(url, data)
  .then(response => {
    console.log('PUT request successful');
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  }

  export const abstractPost = (url:string, data:any) =>{
    axios.post(url, data)
  .then(response => {
    console.log('PUT request successful');
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  }