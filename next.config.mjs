/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-d2c71ab6afb145f38eb5659932f11395.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
