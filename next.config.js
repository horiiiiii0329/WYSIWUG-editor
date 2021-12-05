/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  module: {
    loaders: [
      {
        test: /plugin\.css$/,
        loaders: ["style-loader", "css"],
      },
    ],
  },
};
