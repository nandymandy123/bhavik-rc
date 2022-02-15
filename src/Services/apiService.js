import axios from "axios";

const authBaseURL =
  "https://my-json-server.typicode.com/nandymandy123/bhavik-json-server";
const blogURL = "https://jsonplaceholder.typicode.com/";

export const authApiInstance = axios.create({ baseURL: authBaseURL });

export const blogApiInstance = axios.create({ baseURL: blogURL });
