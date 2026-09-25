import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAYYAN GEO TECH",
  description:
    "Rayyan Geo Tech (RGT) — Professional Surveying, GIS, Drone and Geospatial Solutions in Jharkhand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}