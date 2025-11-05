"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faClipboard, faLink } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function MiddleSection() {
  const [url, seturl] = useState("");
  const [msg, setmsg] = useState("");
  const [shortUrl, setshortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [validUrl, setvalidUrl] = useState("");
  const [shareBtns, setshareBtns] = useState("");
  const [urlBox, seturlBox] = useState("");
  const [urlLoading, seturlLoading] = useState(false);

  async function CreateShortURL(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Improved validation and normalization
    const raw = url.trim();
    if (!raw) {
      setvalidUrl("Please enter a URL.");
      setTimeout(() => setvalidUrl(""), 3000);
      return;
    }

    if (raw.length < 7) {
      setvalidUrl(
        "URL is too short — please provide a full domain (e.g. example.com)."
      );
      setTimeout(() => setvalidUrl(""), 3000);
      return;
    }

    // Ensure protocol for validation and request
    let normalizedUrl = raw;
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    try {
      // Validate format
      // new URL() will throw if the URL is invalid
      new URL(normalizedUrl);
    } catch (err) {
      setvalidUrl(
        "Please enter a valid URL (include a domain, e.g. example.com, and optional http:// or https://)."
      );
      setTimeout(() => setvalidUrl(""), 3500);
      return;
    }

    try {
      seturlLoading(true);
      const response = await axios.post("http://localhost:4001/api/shorten", {
        longUrl: url,
      });
      seturlLoading(false);
      setshortUrl(response.data.shortUrl);
      setmsg(
        "Your short link is ready to go! Copy and share it wherever you're ready!"
      );

      const resetBtn = document.querySelector("#resetBtn");
      resetBtn?.classList.remove("hidden");

      const urlBox = document.querySelector(".urlBox");
      urlBox?.classList.remove("hidden");
      urlBox?.classList.add("flex");

      const shareBtns = document.querySelector(".shareBtns");
      shareBtns?.classList.remove("hidden");
      shareBtns?.classList.add("flex");

      const msg = document.querySelector(".msg");
      msg?.classList.remove("hidden");
      msg?.classList.add("flex");
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  }

  function resetAll() {
    setmsg("");
    setshortUrl("");

    const resetBtn = document.querySelector("#resetBtn");
    resetBtn?.classList.remove("flex");
    resetBtn?.classList.add("hidden");

    const shareBtns = document.querySelector(".shareBtns");
    shareBtns?.classList.add("hidden");

    const urlBox = document.querySelector(".urlBox");
    urlBox?.classList.add("hidden");
    urlBox?.classList.remove("flex");

    const msg = document.querySelector(".msg");
    msg?.classList.remove("flex");
    msg?.classList.add("hidden");
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
        <div className="w-[64%] max-xl:w-[80%] h-auto flex justify-center items-center flex-col rounded-md px-7 py-6 gap-4 shadow-md bg-white max-md:w-full max-md:px-3 max-md:py-10 max-md:gap-8">
          <form
            onSubmit={CreateShortURL}
            method="post"
            className="w-full h-auto flex justify-center items-center flex-col gap-4 max-md:gap-8 relative"
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
                className="valueBtn bg-cyan-800 px-4 max-md:px-2 text-white text-base py-[7px] font-semibold absolute right-1 rounded-md"
              >
                <FontAwesomeIcon icon={faLink} size="1x" className="mr-1" />
                {urlLoading ? "Loading..." : "Shorten"}
              </button>
            </div>
            <p className="text-left text-red-700 font-semibold text-sm mt-[-8px]">
              {validUrl}
            </p>

            {/* Success Message */}
            <div className="msg w-full h-auto hidden justify-start text-green-800 items-center bg-green-200 max-md:px-3 px-4 py-2 rounded-md shadow-md shadow-green-800 max-md:tracking-wider leading-5">
              <p>
                <span className="mr-1">&#10003;</span> {msg}
              </p>
            </div>

            {/* Short URL Box */}
            <div className="urlBox w-full hidden justify-center items-center relative flex-row rounded-md border border-gray-300 overflow-hidden shadow-md shadow-gray-300">
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
                } px-4 max-md:px-2 text-white font-semibold text-base py-[7px] absolute right-1 rounded-md transition-colors duration-300`}
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
            <button
              type="reset"
              onClick={resetAll}
              id="resetBtn"
              className="hidden absolute right-1 bottom-[-4rem] py-2 px-6 bg-blue-200 hover:bg-blue-300 text-blue-700 font-semibold text-base rounded-md"
            >
              Reset
            </button>
          </form>

          {/* Social Buttons */}
          <div className="shareBtns w-full hidden justify-start max-md:gap-2 text-white items-center gap-4 py-2 flex-row overflow-hidden">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shortUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 hover:bg-blue-900 py-2 px-4 font-semibold text-base rounded-md shadow-md shadow-gray-400 max-md:px-2"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" className="mr-1" />
              Facebook
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                shortUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-700 hover:bg-green-900 py-2 px-4 font-semibold text-base rounded-md shadow-md shadow-gray-600 max-md:px-2"
            >
              <FontAwesomeIcon icon={faWhatsapp} size="lg" className="mr-1" />
              Whatsapp
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                shortUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-700 hover:bg-cyan-900 py-2 px-4 font-semibold text-base rounded-md shadow-md shadow-gray-400 max-md:px-2"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" className="mr-1" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleSection;
