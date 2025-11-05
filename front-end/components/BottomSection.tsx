"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateForward,
  faTrash,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loading from "@/app/loading";
import {
  faFacebook,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

function BottomSection() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUrlsAgain = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4001/api/allUrls");
      setUrls(response.data);
    } catch (error) {
      console.error("Failed to fetch URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  async function deleteUrl(id: any) {
    try {
      const res = await axios.delete(
        `http://localhost:4001/api/deleteUrl/${id}`
      );

      if (res.status === 200) {
        // ✅ After successful delete, fetch all URLs again
        setLoading(true);
        try {
          const response = await axios.get("http://localhost:4001/api/allUrls");
          setUrls(response.data);
        } catch (error) {
          console.error("Failed to fetch URLs:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("Failed to delete URLs:", res.status);
      }
    } catch (error) {
      console.error("Error deleting URLs:", error);
    }
  }

  useEffect(() => {
    const fetchAllUrls = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4001/api/allUrls");
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
              href={"http://localhost:4001/api/deleteAllUrl"}
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
                  {url.originalUrl.length > 60
                    ? `${url.originalUrl.slice(0, 60)}...`
                    : url.originalUrl}
                </p>
                <h3 className="absolute bottom-2 right-4 font-semibold text-sm">
                  Views : {url.clicks.length}
                </h3>

                <h1 className="text-gray-700 text-[12px] font-semibold mt-2">
                  {new Date(url.createdAt).toLocaleString()}
                </h1>

                <div className="absolute top-2 right-3 flex justify-center items-center flex-row gap-3 text-sm">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      url.shortUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faFacebook} color="blue" size="lg" />
                  </a>
                  <Link
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      url.shortUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={faWhatsapp}
                      color="green"
                      size="lg"
                    />
                  </Link>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      url.shortUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      size="lg"
                      className="text-blue-600"
                    />
                  </a>

                  <button
                    onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      try {
                        await navigator.clipboard.writeText(
                          `http://localhost:4001/${url.shortUrl}`
                        );
                      } catch (error) {
                        console.error("Failed to copy:", error);
                      }
                    }}
                    className=""
                  >
                    <FontAwesomeIcon
                      icon={faCopy}
                      color="blue"
                      className="text-base"
                    />
                  </button>

                  <button onClick={() => deleteUrl(url._id)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      color="red"
                      className="text-base"
                    />
                  </button>
                </div>
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
