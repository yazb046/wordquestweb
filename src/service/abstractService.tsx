import axios from "axios";
const SERVER_DOMAIN = 'http://localhost:8080';

export const abstractGet = (path:string): Promise<any> => {
  return axios.get(SERVER_DOMAIN + path).then(response => {
    return response;
  })
  .catch(error => {
    console.error('Error:', error);
  });
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