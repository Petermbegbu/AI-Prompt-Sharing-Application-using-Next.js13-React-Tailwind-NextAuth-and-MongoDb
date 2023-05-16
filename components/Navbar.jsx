"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { ProfileAvatar } from "@/utils/globalVariables";

const Navbar = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const getProvidersFunc = async () => {
      const resp = await getProviders();

      setProviders(resp);
    };

    getProvidersFunc;
  }, []);

  return (
    <nav className="flex justify-between items-center w-full mb-16 pt-3">
      <Link href="/" className="flex justify-center items-center gap-2">
        <h1 className="font-extrabold text-orange-600 text-2xl sm:text-3xl">
          PUM
        </h1>
      </Link>

      {/* Desktop Devices */}
      <div className="hidden sm:block">
        {isUserLoggedIn ? (
          <div className="flex gap-3">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>

            <button className="outline_btn">Sign Out</button>

            <Link href="/profile">
              <Image
                src={ProfileAvatar}
                width={40}
                height={40}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Devices */}
      <div className="flex relative sm:hidden">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src={ProfileAvatar}
              alt="profile"
              width={35}
              height={35}
              className="rounded-full cursor-pointer"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />

            {toggleDropdown && (
              <div className="flex flex-col bg-white rounded-lg absolute right-0 top-full w-full p-3 min-w-[210px] shadow-lg">
                <Link
                  href="#"
                  className="text-sm font-medium  text-center py-2 hover:bg-black hover:text-white"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="#"
                  className="text-sm font-medium text-center py-2  hover:bg-black hover:text-white"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="w-full black_btn mt-5"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  SIgn Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
