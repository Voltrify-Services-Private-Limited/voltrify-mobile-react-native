import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api.voltrify.in/',
});

export default instance;
