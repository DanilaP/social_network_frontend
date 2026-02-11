import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "*",
            },
        ],
    },
    reactStrictMode: false
};

export default nextConfig;
