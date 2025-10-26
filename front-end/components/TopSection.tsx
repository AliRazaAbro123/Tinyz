import "./customCss.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function TopTitle() {
  return (
    <div className="w-full h-auto flex justify-center items-center">
      <div className="w-full h-auto flex justify-center items-center flex-col py-6 2xl:w-[96rem]">
        {/* First section */}
        <div className="w-[64%] max-xl:w-[80%] h-auto flex justify-center items-center flex-col max-md:w-full text-center">
          <h1 className="animatedText text-3xl font-bold flex items-center">
            <FontAwesomeIcon
              icon={faLink}
              size="sm"
              className="text-blue-700 mr-3"
            />
            <span className="typing">Tinyz</span>
          </h1>

          <p className="font-semibold text-gray-600 mt-2 leading-tight">
            Shorten long URLs instantly with <strong>Tinyz</strong> — a fast,
            free, and reliable URL shortener built to simplify sharing and make
            your links look clean, smart, and professional.
          </p>
        </div>
        {/* First section */}
      </div>
    </div>
  );
}

export default TopTitle;
