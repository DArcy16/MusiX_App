/** @format */

import { useAppContext } from "@/lib/context";
import React, { useEffect, useState } from "react";
import { TbPlaylistX } from "react-icons/tb";
import { GiSelfLove } from "react-icons/gi";
import { GiEternalLove } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";

const SingleSong = ({ song, isPlaylist = false, songs }) => {
  const {
    user,
    favourite,
    getFavourites,
    addSongToFavourite,
    removeSongFromFavourite,
    removeSongFromPlaylist,
    setCurrentlyPlayingSong,
    setPlaying,
    getRecents,
    recent,
    addSongToRecent,
  } = useAppContext();

  useEffect(() => {
    if (user) {
      getFavourites(user.nickname);
      getRecents(user.nickname);
    }
  }, [user]);

  const handleOnClick = (song, songs, recent) => {
    setCurrentlyPlayingSong({
      id: song.id,
      list: songs,
    });
    setPlaying(true);
    if (user) {
      addSongToRecent(song, recent, user.nickname);
    }
  };

  const addedToFavourite = favourite?.songs_id?.includes(song.id);
  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="w-11/12 md:w-1/2 mb-2 md:mb-4"
    >
      <div className="w-full md:w-11/12 rounded-md py-2 px-4 flex justify-between items-center border border-solid border-gray-200/50 mx-auto">
        <div
          className="w-4/5 flex items-center gap-4 md:gap-6 cursor-pointer hover:scale-105 active:scale-100"
          onClick={() => handleOnClick(song, songs, recent)}
        >
          <div className="w-1/5 rounded-lg flex-none">
            <img
              src={song.album_cover}
              className="w-full object-cover rounded-lg"
            />
          </div>
          <div className="text-start leading-tight truncate font-semibold">
            <p className="md:text-2xl capitalize">{song.song_name}</p>
            <small className="md:text-base">
              {/* {song?.singers[0]?.attributes?.name} */}
            </small>
          </div>
        </div>
        {!user ? null : isPlaylist ? (
          <TbPlaylistX
            className="w-7 h-7 hover:text-gray-100/50 hover:scale-105 active:scale-100"
            onClick={() => {
              removeSongFromPlaylist(song.id, song.playlist_id);
            }}
          />
        ) : addedToFavourite ? (
          <GiEternalLove
            className="md:w-6 md:h-6 hover:text-gray-100/50 hover:scale-105 active:scale-100"
            onClick={() => {
              removeSongFromFavourite(favourite, song.id);
            }}
          />
        ) : (
          <GiSelfLove
            className="md:w-6 md:h-6 hover:text-gray-100/50 hover:scale-105 active:scale-100"
            onClick={() => {
              addSongToFavourite(favourite, song.id);
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default SingleSong;
