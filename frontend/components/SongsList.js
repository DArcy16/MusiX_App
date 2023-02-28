/** @format */

import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import React from "react";
import ShowLoadingError from "./ShowLoadingError";
import SingleSong from "./SingleSong";
import {BiDotsHorizontalRounded} from "react-icons/bi"

const SongsList = ({ songs, loading, error, isPlaylist = false}) => {
  return (
    <div className="w-full flex flex-wrap py-1 items-center justify-center overflow-auto mt-2 md:mt-4">
      <ShowLoadingError loading={loading} error={error}>
        {songs && songs.map((song) => <SingleSong key={song.id} songs={songs}
         song={song} isPlaylist={isPlaylist} />)}

        {/* {isArtistPage ? (
          <Link href="/artists/justin-bieber/songs">
            <BiDotsHorizontalRounded className=" mt-2 w-6 h-6 mx-auto hover:scale-105" />
          </Link>
        ) : null} */}
      </ShowLoadingError>
    </div>
  );
};

export default SongsList;
