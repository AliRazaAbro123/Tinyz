import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer
      className="w-full h-auto flex justify-center items-center"
      role="contentinfo"
      aria-label="Website footer"
    >
      <div className="w-full h-auto flex justify-center items-center flex-col py-4 mt-4 2xl:w-[96rem] text-center space-y-1">
        <h2 className="font-semibold text-lg tracking-wide">
          Developed with ❤️ by{" "}
          <Link
            href="https://alistacker.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Ali Raza
          </Link>
        </h2>

        <p className="text-sm opacity-80">
          © 2025 <strong>Shortl</strong> — Free, Fast & Secure URL Shortener
          built with the MERN Stack.
        </p>

        <meta
          name="description"
          content="Shortl is a fast and free URL shortener built by Ali Raza using the MERN Stack. Simplify your long links instantly with a clean, modern interface."
        />
      </div>
    </footer>
  );
}

export default Footer;
