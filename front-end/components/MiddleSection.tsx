"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function MiddleSection() {
  const [url, seturl] = useState("");
  const [msg, setmsg] = useState("");
  const [shortUrl, setshortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  async function CreateShortURL(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://tinyz-backend.vercel.app/api/shorten",
        {
          longUrl: url,
        }
      );

      // ✅ Set short URL and message after successful response
      setshortUrl(response.data.shortUrl);
      setmsg(
        "Your short link is ready to go! Copy and share it wherever you're ready!"
      );
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  }

  const copyToClipboard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="w-full h-auto flex justify-center items-center">
      <div className="w-full h-auto flex justify-center items-center flex-col 2xl:w-[96rem]">
        <div className="w-[64%] h-auto flex justify-center items-center flex-col rounded-md px-7 py-6 gap-4 shadow-md bg-white max-md:w-full max-md:px-3 max-md:py-10 max-md:gap-8">
          <form
            onSubmit={CreateShortURL}
            method="post"
            className="w-full h-auto flex justify-center items-center flex-col gap-4 max-md:gap-8"
          >
            {/* Input for Long URL */}
            <div className="w-full flex justify-center items-center relative flex-row rounded-md border border-gray-300 overflow-hidden shadow-md shadow-gray-300">
              <input
                type="text"
                placeholder="Paste your long url here..."
                className="w-full h-auto p-[10px] outline-none rounded-md max-md:px-1 max-md:py-3"
                onChange={(e) => seturl(e.target.value)}
              />
              <button
                type="submit"
                className="bg-cyan-800 px-4 max-md:px-2 text-white text-base py-[7px] font-semibold absolute right-1 rounded-md"
              >
                Shorten
              </button>
            </div>

            {/* Success Message */}
            <div className="msg w-full h-auto hidden justify-start text-green-800 items-center bg-green-200 max-md:px-3 px-4 py-2 rounded-md shadow-md shadow-green-800 max-md:tracking-wider leading-5">
              <p>
                <span className="mr-1">&#10003;</span> {msg}
              </p>
            </div>

            {/* Short URL Box */}
            <div className="w-full flex justify-center items-center relative flex-row rounded-md border border-gray-300 overflow-hidden shadow-md shadow-gray-300">
              <input
                type="text"
                disabled
                className="w-full h-auto p-[10px] outline-none rounded-md max-md:px-1 max-md:py-3"
                value={shortUrl}
              />
              <button
                type="button"
                id="copyBtn"
                className={`${
                  copied ? "bg-green-800" : "bg-cyan-800"
                } px-4 max-md:px-2 text-white tracking-wide max-md:tracking-normal text-base py-[7px] font-bold absolute right-1 rounded-md transition-colors duration-300`}
                onClick={copyToClipboard}
              >
                <FontAwesomeIcon
                  icon={faClipboard}
                  size="1x"
                  className="mr-1"
                />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </form>

          {/* Social Buttons */}
          <div className="w-full flex justify-start max-md:gap-2 text-white items-center gap-4 py-2 flex-row overflow-hidden">
            <Link
              href={"#"}
              className="bg-blue-700 hover:bg-blue-900 py-2 px-4 font-semibold text-base rounded-md shadow-md shadow-gray-400 max-md:px-2"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" className="mr-1" />
              Facebook
            </Link>
            <Link
              href={"#"}
              className="bg-green-700 hover:bg-green-900 py-2 px-4 font-semibold text-base rounded-md shadow-md shadow-gray-600 max-md:px-2"
            >
              <FontAwesomeIcon icon={faWhatsapp} size="lg" className="mr-1" />
              Whatsapp
            </Link>
            <Link
              href={"#"}
              className="bg-cyan-700 hover:bg-cyan-900 py-2 px-4 font-semibold text-base rounded-md shadow-md shadow-gray-400 max-md:px-2"
            >
              <FontAwesomeIcon icon={faTwitter} size="lg" className="mr-1" />
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleSection;
