import { useEffect } from "react";

interface DynamicFaviconProps {
  color: string;
}

export default function DynamicFavicon({ color }: DynamicFaviconProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create canvas element
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Draw colored circle
    ctx.beginPath();
    ctx.arc(16, 16, 14, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    // Convert to data URL
    const faviconUrl = canvas.toDataURL("image/png");

    // Update favicon
    let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href = faviconUrl;
  }, [color]);

  return null;
}
