"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkSlash } from "@fortawesome/free-solid-svg-icons";
import "../components/customCss.css";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-center px-4">
      <div className="flex flex-col items-center animate-fade-in">
        <FontAwesomeIcon
          icon={faLinkSlash}
          size="3x"
          className="text-blue-600 mb-4 animate-bounce-slow"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-5 max-w-md">
          Oops! The page you’re looking for doesn’t exist. It might have been
          removed or the link is broken.
        </p>

        <Link
          href="/"
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
