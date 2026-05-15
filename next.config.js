/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique — compatible Hostinger shared hosting (Apache)
  output: "export",

  // URLs avec slash final → évite les 404 sur Apache (/admin/ au lieu de /admin)
  trailingSlash: true,

  // Désactive l'optimisation d'images serveur (pas de Node.js en shared hosting)
  images: {
    unoptimized: true,
  },

  reactStrictMode: true,
};

module.exports = nextConfig;
