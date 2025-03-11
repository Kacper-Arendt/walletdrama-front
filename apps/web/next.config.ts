import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	reactStrictMode: true,
	transpilePackages: ["@repo/tailwind-theme"],
};

export default withNextIntl(nextConfig);
