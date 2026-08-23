import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * LAN preview on a phone: without this, Next can 403 `/_next/*` dev assets
   * when the page is opened via http://192.168.x.x:3000 (cross-origin vs localhost).
   */
  allowedDevOrigins: [
    "192.168.0.*",
    "192.168.1.*",
    "192.168.2.*",
    "10.*.*.*",
    "172.*.*.*",
  ],
};

export default nextConfig;
