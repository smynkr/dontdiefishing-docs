import { withSentryConfig } from '@sentry/nextjs';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // The site serves local SVG wordmarks and plain MDX screenshots; it does not
  // need Next's native raster optimizer. Keep optimization disabled so
  // untrusted raster input cannot reach the optional Sharp decoder.
  images: { unoptimized: true },
  // Pin the workspace root: stray lockfiles in ~ and ~/Documents make Turbopack
  // infer a root above this repo and fail on ~'s offloaded node_modules symlink.
  turbopack: { root: import.meta.dirname },
  async redirects() {
    return [
      // Browsers probe /favicon.ico even though we serve /favicon.svg.
      { source: '/favicon.ico', destination: '/favicon.svg', permanent: true },
      // Mintlify served section indexes at /<section>/index; Fumadocs serves
      // them at /<section>. Keep old deep links and bookmarks working.
      { source: '/dontdiefishing/index', destination: '/dontdiefishing', permanent: true },
    ];
  },
  async rewrites() {
    return [
      // Clean standalone URLs: docs.dontdiefishing.com/<page> serves the
      // /dontdiefishing/<page> route. The canonical source keeps its product
      // prefix; the rewrite keeps the pretty URL in the address bar.
      // `/` itself is NOT rewritten — app/(home)/page.tsx renders the
      // product index there (a rewrite-only `/` 404s on soft navigation,
      // because the client router does not apply rewrites).
      { source: '/getting-started', destination: '/dontdiefishing/getting-started' },
      { source: '/finding-spots', destination: '/dontdiefishing/finding-spots' },
      { source: '/safety-conditions', destination: '/dontdiefishing/safety-conditions' },
      { source: '/faq', destination: '/dontdiefishing/faq' },
      { source: '/changelog', destination: '/dontdiefishing/changelog' },
    ];
  },
};

export default withSentryConfig(withMDX(config), { silent: true });
