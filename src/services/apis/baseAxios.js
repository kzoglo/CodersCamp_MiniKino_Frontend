import axios from 'axios';

export const baseAxios = axios.create({
  baseURL: 'https://mini-kino.herokuapp.com/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});
