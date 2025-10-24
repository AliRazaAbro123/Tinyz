"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faRotateLeft,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function BottomSection() {
  const [urls, seturls] = useState([]);

  function toggleOptions() {
    const menu = document.getElementById("menu");
    menu?.classList.toggle("hidden");
  }

  useEffect(() => {
    const fetchAllUrls = async () => {
      try {
        const response = await axios.get(
          "https://tinyz-backend.vercel.app/api/allUrls"
        );
        seturls(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch URLs:", error);
      }
    };

    fetchAllUrls();
  }, []);

  return (
    <div className="w-full h-auto flex justify-center items-center">
      <div className="w-full h-auto flex justify-center items-center flex-col py-4 2xl:w-[96rem]">
        {/* Third section */}
        <div className="w-[64%] max-md:w-full max-md:px- h-auto flex justify-center items-center flex-col rounded-md px-7 py-6 gap-4 shadow-md bg-white">
          <div className="w-full h-auto flex justify-between items-center flex-row rounded-md gap-4 mb-4">
            <h1 className="font-bold text-lg">
              <FontAwesomeIcon icon={faRotateLeft} size="1x" className="mr-1" />{" "}
              Recently Shortened URLS
            </h1>
            <Link
              href={"https://tinyz-backend.vercel.app/api/deleteAllUrl"}
              className="hover:bg-red-200 py-1 px-2 rounded-md duration-100 text-red-700 flex justify-center items-center flex-row gap-1"
            >
              <FontAwesomeIcon icon={faTrash} className="text-red-700" /> Clear
              All
            </Link>
          </div>
          {urls.map((url: any, index: number) => (
            <div
              key={index}
              className="w-full h-auto flex justify-center items-start flex-col gap-1 relative shadow-md shadow-gray-400 rounded-md px-4 py-3"
            >
              <h1 className="font-semibold">{url.shortUrl}</h1>
              <p className="text-gray-700 text-sm">{url.originalUrl}</p>
              <h1 className="text-gray-700 text-[12px] font-semibold mt-2">
                {url.createdAt}
              </h1>
              <div
                onClick={toggleOptions}
                className="absolute top-1 right-2 flex justify-center items-center flex-row gap-2"
              >
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  size="1x"
                  color="blue"
                  className="ml-3 p-2 rounded-full hover:cursor-pointer hover:bg-slate-400 duration-150"
                />
              </div>
              {/* Options that will only visible on click */}
              <div
                id="menu"
                className="hidden absolute top-[-6.8rem] z-50 right-2 bg-white shadow-md shadow-gray-400 rounded-md px-3 py-2 justify-center items-center flex-col gap-1 text-sm"
              >
                <Link
                  href={"#"}
                  className="py-1 px-3 rounded-md hover:cursor-pointer hover:bg-slate-400 duration-150 font-semibold"
                >
                  Share
                  <FontAwesomeIcon
                    icon={faShareAlt}
                    size="1x"
                    color="red"
                    className="ml-2"
                  />
                </Link>
                <h1 className="py-1 px-3 rounded-md hover:cursor-pointer hover:bg-slate-400 duration-150 font-semibold">
                  Copy
                  <FontAwesomeIcon
                    icon={faClipboard}
                    size="1x"
                    color="blue"
                    className="ml-3"
                  />
                </h1>
                <Link
                  href={`https://tinyz-backend.vercel.app/api/deleteUrl/${url._id}`}
                  className="py-1 px-3 rounded-md hover:cursor-pointer hover:bg-slate-400 duration-150 font-semibold"
                >
                  Delete
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="1x"
                    color="red"
                    className="ml-1"
                  />
                </Link>
              </div>
              {/* Options that will only visible on click */}
            </div>
          ))}
        </div>
        {/* Third section */}
      </div>
    </div>
  );
}

export default BottomSection;
