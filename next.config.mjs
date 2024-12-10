import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.cnn.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
      },
    ],
  },
};

const sentryConfig = withSentryConfig(nextConfig, {
  org: 'kernel360',
  project: 'javascript-nextjs',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(sentryConfig);
