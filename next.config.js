// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');
// eslint-disable-next-line no-undef
module.exports = {
  env: {
    API_URL: 'http://localhost:4000/graphql',
  },
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com", "books.google.com"],
  },
  reactStrictMode: true,
  i18n,
}
