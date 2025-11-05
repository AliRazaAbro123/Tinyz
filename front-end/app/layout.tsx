import "./globals.css";
import type { Metadata } from "next";
import React, { Suspense } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Loading from "./loading";
config.autoAddCss = false; // ✅ Prevent duplicate CSS

export const metadata: Metadata = {
  title: "Tinyz | Fast & Smart URL Shortener",
  description:
    "Tinyz is a free, fast, and secure URL shortener that lets you create short, shareable links in seconds. Simplify your long URLs, track clicks, and share smarter — all with one click.",
  keywords: [
    "Tinyz",
    "URL shortener",
    "link shortener",
    "short links",
    "free URL shortener",
    "Tinyz short URL",
    "best URL shortener",
    "custom short links",
    "URL management",
  ],
  authors: [{ name: "Ali Raza" }],
  openGraph: {
    title: "Tinyz | Fast & Smart URL Shortener",
    description:
      "Shorten long links instantly with Tinyz — a clean, reliable, and free tool to make your URLs easy to share and remember.",
    url: "https://tinyz.vercel.app/",
    siteName: "Tinyz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tinyz | Fast & Smart URL Shortener",
    description:
      "Shorten long URLs instantly with Tinyz — the smart and simple way to share clean links online.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <Suspense fallback={<Loading />}>
          <body className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen">
            {children}
          </body>
        </Suspense>
      </html>
  );
}
