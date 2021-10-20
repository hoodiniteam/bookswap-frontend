// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');
// eslint-disable-next-line no-undef
module.exports = {
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com", "books.google.com"],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  i18n,
}
