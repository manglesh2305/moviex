import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = process.env.REACT_APP_API_KEY;

const headers = {
    Authorization: `Bearer ${KEY}`,
  }

export const fetchDataFromApi = async (url, params) => {
    try{
        const {data} = await axios.get( BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}