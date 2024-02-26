"use client";

import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  const handleLogin = async () => {
    setError(null); // Reset any previous errors
    setIsLoading(true); // Show loading indicator

    const user = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
    setIsLoading(false); // Hide loading indicator
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-4rem)] py-0 mx-auto my-0 justify-items-center">
      <form className="w-4/5 px-6 py-3 border-none lg:w-2/5 md:w-3/5 glass text-[#F9DC34]}">
        <h2 className="py-4 text-3xl text-center text-[#F9DC34] ">
          Login
        </h2>
        <div>
          <label className="my-1 text-xl text-[#F9DC34] ">Email:</label>
          <input
            type="email"
            value={email}
            className="w-full px-4 py-2 my-1 bg-transparent border rounded-lg shadow-md outline-none form-control border-bgold-200"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="justify-center w-full my-3 ">
          <label className="text-xl  text-[#F9DC34]">Password:</label>
          <div className="flex justify-between w-full py-2 pl-4 pr-2 my-1 border rounded-lg shadow-md form-control border-bgold-200">
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              className="w-full bg-transparent outline-none"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              type="button"
              className="text-xl duration-300 border rounded-lg cursor-pointer bg-bblue-200 text-void border-bgold-200 hover:bg-bblue-300"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? (
                <EyeIcon className="w-6 h-5 text-gray-500" />
              ) : (
                <EyeSlashIcon className="w-6 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <button
            type="button"
             className="px-4 py-2 my-2 hover:text-yellow-300 hover:bg-[#9834ec] text-[#F9DC34] text-xl font-bold duration-300 border rounded-lg cursor-pointer  border-bgold-200 hover:text-bgold-200"
            onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
