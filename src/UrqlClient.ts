import {createClient} from 'urql';

const isServerSide = typeof window === 'undefined';

const client = createClient({
  // url: 'https://bookswap-api-srnev.ondigitalocean.app/graphql',
  url: 'http://localhost:4000/graphql',
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
