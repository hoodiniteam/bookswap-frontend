// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');
// eslint-disable-next-line no-undef

// eslint-disable-next-line no-undef
module.exports = {
  webpack5: true,
  env: {
    // eslint-disable-next-line no-undef
    API_URL: process.env.API_URL ? process.env.API_URL : process.env.NODE_ENV === "production" ? "https://api.bookswap.ru/graphql" : 'http://localhost:4000/graphql'
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com', 'books.google.com']
  },
  reactStrictMode: true,
  i18n,
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false, path: false };
    return config;
  }
};
