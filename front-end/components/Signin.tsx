"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

function Signin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function UserLogin() {
    try {
      const res = await axios.post("http://localhost:4001/api/login", {
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full h-auto flex justify-center items-center">
      <div className="w-full h-auto flex justify-center items-center flex-col py-8 2xl:w-[96rem]">
        <h1 className="text-4xl font-bold mb-6">Sign In</h1>
        <form
          onSubmit={UserLogin}
          className="w-1/2 flex justify-center items-start flex-col gap-1 bg-white py-8 px-4 rounded-md shadow-md shadow-gray-500"
        >
          <h1 className="text-sm font-semibold text-gray-700">
            Email <span className="text-orange-800">*</span>
          </h1>
          <input
            type="email"
            value={email}
            placeholder="Enter Your Email eg. ali@gmail.com"
            className="w-full py-2 px-3 mb-2 rounded-md outline-none border border-gray-400 shadow-sm shadow-gray-300"
            onChange={(e) => setemail(e.target.value)}
          />
          <h1 className="text-sm font-semibold text-gray-700">
            Password <span className="text-orange-800">*</span>
          </h1>
          <input
            type="password"
            value={password}
            placeholder="Enter Your Password"
            className="w-full py-2 px-3 mb-2 rounded-md outline-none border border-gray-400 shadow-sm shadow-gray-300"
            onChange={(e) => setpassword(e.target.value)}
          />
          <Link href={"/Signin"}>
            <p className="text-blue-500 hover:underline">
              New to Tinyz?{" "}
              <span className="text-black font-semibold ml-2">Sign Up</span>
            </p>
          </Link>
          <button
            type="submit"
            className="bg-blue-500 font-semibold text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
