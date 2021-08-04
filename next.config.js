// eslint-disable-next-line no-undef
module.exports = {
  images: {
    domains: ["images.unsplash.com", ],
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
  }
}
