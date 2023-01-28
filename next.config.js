// eslint-disable-next-line no-undef
module.exports = {
  env: {
    // eslint-disable-next-line no-undef
    API_URL: process.env.API_URL ? process.env.API_URL : 'http://localhost:4000/graphql',
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com', 'books.google.com']
  },
  reactStrictMode: true,
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false, path: false };
    return config;
  }
};
