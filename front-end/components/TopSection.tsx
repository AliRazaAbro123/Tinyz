import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function TopTitle() {
  return (
    <div className="w-full h-auto flex justify-center items-center">
      <div className="w-full h-auto flex justify-center items-center flex-col py-5 2xl:w-[96rem]">
        {/* First section */}
        <div className="w-[64%] h-auto flex justify-center items-center flex-col max-md:w-full">
          <h1 className="text-4xl font-bold">
            <FontAwesomeIcon icon={faLink} size="1x" className="mr-1" />
            Shortl
          </h1>
          <p>A free public Url Shorter</p>
        </div>
        {/* First section */}
      </div>
    </div>
  );
}

export default TopTitle;
