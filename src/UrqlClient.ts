import {createClient} from 'urql';
import Cookies from "js-cookie";

const isServerSide = typeof window === 'undefined';

const client = createClient({
  url: 'https://bookswap-api-2-627cm.ondigitalocean.app/graphql',
  // url: 'https://jolly-termite-53.loca.lt/graphql',
  // url: 'http://localhost:4000/graphql',
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
