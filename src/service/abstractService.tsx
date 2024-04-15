import axios from "axios";
const SERVER_DOMAIN = "http://localhost:8080";

export const abstractGet = (path: string): Promise<any> => {
  return axios
    .get(SERVER_DOMAIN + path)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const abstractGetWithRequestParams = (path: string, params: any): Promise<any> => {
  return axios
    .get(SERVER_DOMAIN + path, params)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const abstractPut = (path: string, data: any) => {
  axios
    .put(SERVER_DOMAIN + path, data)
    .then((response) => {
      console.log("PUT request successful");
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const abstractPost = (path: string, data: any) => {
  axios
    .post(SERVER_DOMAIN + path, data)
    .then((response) => {
      console.log("POST request successful");
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

