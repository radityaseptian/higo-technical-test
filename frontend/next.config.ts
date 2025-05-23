import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: 'https://higo-technical-test-backend.vercel.app/api',
  },
}

export default nextConfig
