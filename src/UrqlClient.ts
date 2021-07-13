import {createClient} from 'urql';

const isServerSide = typeof window === 'undefined';

const client = createClient({
  url: 'https://bookswap-api-srnev.ondigitalocean.app/graphql',
  fetchOptions: () => {
    if (!isServerSide){
      const token = localStorage.getItem('token');
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

export { client};