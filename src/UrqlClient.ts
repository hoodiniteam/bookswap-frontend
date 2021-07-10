import { createClient } from 'urql';

const client = createClient({
  url: 'https://bookswap-api-srnev.ondigitalocean.app/graphql',
  fetchOptions: () => {
    if (typeof window !== 'undefined'){
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

export { client };