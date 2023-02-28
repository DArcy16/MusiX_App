/** @format */

import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { BsPlusSquareDotted } from "react-icons/bs";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import {GiSplitCross} from "react-icons/gi";

const PlaylistsList = ({ playlists, isProfilePage = false }) => {
  const { setShowModal, setShowAddToPlaylistModal, addSongToPlaylist } =
    useAppContext();
  const router = useRouter();


  return (
    <article
      className={`relative content-card ${
        isProfilePage ? null : "bg-black/40 backdrop-blur-sm w-11/12 md:w-1/2"
      }`}
    >
      {isProfilePage ? null : (
        <GiSplitCross
          onClick={() => setShowAddToPlaylistModal(false)}
          className="absolute top-5 right-6 w-4 h-4 text-gray-100/80 hover:scale-105"
        />
      )}
      <div className=" md:w-3/4 mx-auto">
        <h2 className="sub-heading text-center">
          {isProfilePage ? "Playlists" : "Add To Playlists"}
        </h2>
        <hr className="mt-2 mb-4" />
        {playlists?.map((playlist) => (
          <div
            onClick={
              isProfilePage
                ? () => router.push(`/profile/${playlist.slug}`)
                : () => {
                    addSongToPlaylist(playlist.id);
                    setShowAddToPlaylistModal(false);
                  }
            }
            key={playlist.id}
            className="w-10/12  capitalize font-bold mx-auto rounded-lg border border-gray-400/80 flex justify-between items-center px-4 py-2 mt-2 md:w-3/4 md:mt-4 hover:scale-105 cursor-pointer"
          >
            <p>{playlist.name}</p>
            {isProfilePage ? <IoIosArrowForward /> : null}
          </div>
        ))}

        <BsPlusSquareDotted
          onClick={() => setShowModal(true)}
          className="mt-2 cursor-pointer mx-auto w-6 h-6 hover:scale-105"
        />
      </div>
    </article>
  );
};

export default PlaylistsList;
