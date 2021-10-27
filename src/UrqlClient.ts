require('dotenv').config();
import {createClient} from 'urql';
import Cookies from "js-cookie";

const isServerSide = typeof window === 'undefined';

const client = createClient({
  // url: 'https://bookswap-api-2-627cm.ondigitalocean.app/graphql',
  // url: 'https://jolly-termite-53.loca.lt/graphql',
  url: process.env.API_URL || '',
  fetchOptions: () => {
    if (!isServerSide){
      const token = Cookies.get('token');
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' },
      };
    }else {
      return {
        headers: { authorization: '' },
      }
    }
  },
});

export { client };
