/** @format */

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import React from "react";

const RecentSection = () => {
  const {user, loading, error} = useUser();

  return (
    <section className="w-11/12 flex flex-col items-center text-center gap-2 md:flex-row md:justify-between rounded-lg mx-auto mt-2">
      {user ? (
        <>
          <div className="p-4 w-full md:w-1/2 md:h-20 flex justify-center items-center backdrop-blur-sm rounded-lg">
            <Link href="/recent">
              <h2 className="sub-heading">Recently Played</h2>
            </Link>
          </div>
          <div className="p-4 w-full md:w-1/2 md:h-20 flex justify-center items-center backdrop-blur-sm rounded-lg">
            <Link href="/recommend">
              <h2 className="sub-heading">Recommended</h2>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="custom-card w-full flex-col md:w-full md:flex-col">
            <h2 className="sub-heading">You Need to login to get this feature</h2>
            <Link href="/api/auth/login"
              className="secondary-btn mt-2 hover:bg-slate-100/20 backdrop-blur-sm
            "
            >
              Login
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default RecentSection;
