const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

/** @type {import('next').NextConfig} */
module.exports = (phase) => ({
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  ...(phase !== PHASE_DEVELOPMENT_SERVER ? { output: 'standalone' } : {}),
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
})

