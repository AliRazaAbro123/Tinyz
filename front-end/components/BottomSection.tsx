"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faRotateForward,
  faShareAlt,
  faTrash,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loading from "@/app/loading";

function BottomSection() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // ✅ Track which menu is open

  const toggleOptions = (index: number) => {
    // ✅ If the same card is clicked again, close it
    setActiveIndex(activeIndex === index ? null : index);
  };

  const fetchUrlsAgain = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        "https://tinyz-backend.vercel.app/api/allUrls"
      );
      setUrls(response.data);
    } catch (error) {
      console.error("Failed to fetch URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllUrls = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://tinyz-backend.vercel.app/api/allUrls"
        );
        setUrls(response.data);
      } catch (error) {
        console.error("Failed to fetch URLs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUrls();
  }, []);

  return (
    <div className="w-full h-auto flex justify-center items-center">
      <div className="w-full h-auto flex justify-center items-center flex-col py-4 2xl:w-[96rem]">
        {/* Third section */}
        <div className="w-[64%] max-md:w-full max-xl:w-[80%] max-md:px-2 h-auto flex justify-center items-center flex-col rounded-md px-7 py-6 gap-4 shadow-md bg-white">
          <div className="w-full h-auto flex justify-between items-center flex-row rounded-md gap-4 mb-4">
            <button
              onClick={fetchUrlsAgain}
              className="bg-blue-200 hover:bg-blue-300 py-1 px-3 rounded-md mr-2 text-blue-700 font-semibold text-base shadow-sm shadow-blue-700"
            >
              <FontAwesomeIcon
                icon={faRotateForward}
                size="1x"
                className="mr-2"
              />
              Refresh URLS
            </button>

            <h1 className="font-semibold text-lg">Recently Shortened URLS</h1>

            <Link
              href="https://tinyz-backend.vercel.app/api/deleteAllUrl"
              className="bg-red-200 hover:bg-red-300 py-1 px-2 rounded-md duration-100 text-red-700 flex justify-center items-center flex-row gap-1 font-semibold text-base shadow-sm shadow-red-700"
            >
              <FontAwesomeIcon icon={faTrash} /> Clear All
            </Link>
          </div>

          {/* ✅ Conditional Rendering for Loading */}
          {loading ? (
            <Loading />
          ) : urls.length > 0 ? (
            urls.map((url: any, index: number) => (
              <div
                key={index}
                className="w-full h-auto flex justify-center items-start flex-col gap-1 relative shadow-md shadow-gray-400 rounded-md px-4 py-3"
              >
                <h1 className="font-semibold break-all">
                  tinyz.vercel.app/{url.shortUrl}
                </h1>

                <p className="text-gray-700 text-sm break-all">
                  {url.originalUrl}
                </p>

                <h1 className="text-gray-700 text-[12px] font-semibold mt-2">
                  {new Date(url.createdAt).toLocaleString()}
                </h1>

                {/* Options Icon */}
                <div
                  onClick={() => toggleOptions(index)} // ✅ Pass index
                  className="absolute top-1 right-2 flex justify-center items-center gap-2"
                >
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    size="1x"
                    color="blue"
                    className="ml-3 p-2 rounded-full hover:cursor-pointer hover:bg-slate-400 duration-150"
                  />
                </div>

                {/* ✅ Show this menu only for active card */}
                {activeIndex === index && (
                  <div className="absolute top-[-6.8rem] z-50 right-2 bg-white shadow-md shadow-gray-400 rounded-md px-3 py-2 flex-col gap-1 text-sm">
                    <Link
                      href="#"
                      className="py-1 px-3 rounded-md hover:bg-slate-400 duration-150 font-semibold flex items-center"
                    >
                      Share
                      <FontAwesomeIcon
                        icon={faShareAlt}
                        size="1x"
                        color="red"
                        className="ml-2"
                      />
                    </Link>

                    <button className="py-1 px-3 rounded-md hover:bg-slate-400 duration-150 font-semibold flex items-center">
                      Copy
                      <FontAwesomeIcon
                        icon={faClipboard}
                        size="1x"
                        color="blue"
                        className="ml-3"
                      />
                    </button>

                    <Link
                      href={`https://tinyz-backend.vercel.app/api/deleteUrl/${url._id}`}
                      className="py-1 px-3 rounded-md hover:bg-slate-400 duration-150 font-semibold flex items-center"
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
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 font-semibold text-sm mt-4 text-center">
              No URLs found. Create your first short link to get started 🚀
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BottomSection;
