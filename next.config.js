// eslint-disable-next-line no-undef
module.exports = {
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
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
