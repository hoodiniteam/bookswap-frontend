import { createClient } from 'urql';

const client = createClient({
  url: 'https://bookswap-api-srnev.ondigitalocean.app/graphql',
  fetchOptions: () => {
    const token = localStorage.getItem('token');
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});

export { client };