"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import "../components/customCss.css";

export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-center">
      <div className="animate-spin-slow mb-4">
        <FontAwesomeIcon icon={faLink} size="3x" className="text-blue-600" />
      </div>

      <h2 className="text-lg font-semibold text-gray-700 animate-pulse">
        Loading Tinyz...
      </h2>
    </div>
  );
}
