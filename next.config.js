// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');
// eslint-disable-next-line no-undef
module.exports = {
  webpack5: true,
  env: {
    API_URL: 'http://server:4000/graphql'
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
