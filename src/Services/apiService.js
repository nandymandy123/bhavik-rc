import axios from 'axios';

const authBaseURL = 'http://localhost:3333/';
const blogURL = 'https://jsonplaceholder.typicode.com/';

export const authApiInstance = axios.create({ baseURL: authBaseURL });

export const blogApiInstance = axios.create({ baseURL: blogURL });
