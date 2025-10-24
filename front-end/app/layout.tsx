import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css"; // ✅ import FA CSS first
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // ✅ prevent FA from adding CSS twice

export const metadata: Metadata = {
  title: "Shotl",
  description: "A URL shortener best website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
