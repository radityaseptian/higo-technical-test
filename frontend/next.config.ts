import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: 'http://127.0.0.1:3000/api',
  },
}

export default nextConfig
