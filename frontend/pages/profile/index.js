/** @format */

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import OtherPageLayout from "@/components/Layout/OtherPageLayout";
import AddPlaylistModal from "@/components/AddPlaylistModal";
import { useAppContext } from "@/lib/context";
import PlaylistsList from "@/components/PlaylistsList";

export const getServerSideProps = withPageAuthRequired();

const Profile = ({ user }) => {
  const { getPlaylists, playlists, showModal } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    getPlaylists(user.nickname);
  }, [user]);

  return (
    <OtherPageLayout>
      <div className="w-full bg-gray-20/40 h-[100vh] mx-auto overflow-auto p-4 [&::-webkit-scrollbar]:hidden">
        <div className="relative content-card flex flex-col gap-2 mb-2 justify-center items-center">
          <Link
            href="/"
            className="absolute top-4 left-4 hover:scale-105 hover:text-gray-200/60 cursor-pointer"
          >
            <AiOutlineDoubleLeft className="md:w-6 md:h-6" />
          </Link>
          <img
            src={user?.picture}
            alt="user.name"
            className="w-1/3 lg:w-1/5 rounded-full object-cover"
          />
          <h1 className="heading"> {user?.name} </h1>
        </div>
        <article className="custom-card-container">
          <Link href="/profile/following" className="custom-card">
            <h2 className="sub-heading">Following</h2>
          </Link>
          <Link href="/profile/favourite" className="custom-card">
            <h2 className="sub-heading">Favourite</h2>
          </Link>
        </article>

        <PlaylistsList playlists={playlists} isProfilePage />

        <div className="w-11/12 md:w-2/4 md:mx-auto text-center mt-2 rounded-lg mx-auto bg-red-500/40 backdrop-blur-sm border-rounded py-2">
          <button
            onClick={() => router.push("/api/auth/logout")}
            className="uppercase font-bold text-center tracking-widest"
          >
            LOgout
          </button>
        </div>
        {showModal ? <AddPlaylistModal isProfilePage /> : null}
      </div>
    </OtherPageLayout>
  );
};

export default Profile;
