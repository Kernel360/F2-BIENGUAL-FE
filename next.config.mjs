import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  webpack: (config) => {
    // 코드 스플리팅 설정 오버라이드
    // eslint-disable-next-line no-param-reassign
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      chunks: 'all', // 모든 청크를 분리
      minSize: 100, // 최소 100B 이상의 청크만 분리, default: 20KB
      minChunks: 2, // 최소 2개 이상의 파일에서 사용될 때만 청크로 분리
    };
    return config;
  },
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

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
