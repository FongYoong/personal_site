// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})