import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */ const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pngitem.com",
      },
      {
        hostname: "pngtree.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
