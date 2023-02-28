/** @format */

import React, { useEffect, useState } from "react";
import { MdPlaylistAddCheck } from "react-icons/md";
import { TbPlaylistOff } from "react-icons/tb";
import { FaRandom } from "react-icons/fa";
import { MdOutlineSkipNext } from "react-icons/md";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlinePlayArrow } from "react-icons/md";
import { MdOutlinePause } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GiSelfLove } from "react-icons/gi";
import { GiEternalLove } from "react-icons/gi";
import { SlVolume2 } from "react-icons/sl";
import { MdPlaylistAdd } from "react-icons/md";
import Link from "next/link";
import { useAppContext } from "@/lib/context";
import AddPlaylistModal from "@/components/AddPlaylistModal";
import AddSongToPlaylistModal from "@/components/AddSongToPlaylistModal";

const Player = () => {
  const [index, setIndex] = useState();
  const [random, setRandom] = useState(false);

  const {
    currentlyPlayingSong,
    setCurrentlyPlayingSong,
    user,
    getFavourites,
    favourite,
    getPlaylists,
    setShowAddToPlaylistModal,
    setAddingSongId,
    removeSongFromFavourite,
    addSongToFavourite,
    showAddToPlaylistModal,
    showModal,
    playing,
    setPlaying,
    getRecents,
    recent,
    addSongToRecent
  } = useAppContext();

  useEffect(() => {
    if (user) {
      getFavourites(user.nickname);
      getPlaylists(user.nickname);
      getRecents(user.nickname);
    }
  }, [user]);

  const songs = currentlyPlayingSong.list;

  const songIndex = songs.findIndex(
    (song) => song.id === currentlyPlayingSong.id
  );

  const song = index === undefined ? songs[songIndex] : songs[index];

  const addedToFavourite = favourite?.songs_id?.includes(
    currentlyPlayingSong.id
  );

  function handleSkipNext(song) {
    

    const arrIndex = index;
    const randomNo = Math.floor(Math.random() * songs?.length);

    if (random) {
      setIndex(randomNo);
      setCurrentlyPlayingSong({
        id: songs[randomNo]?.id,
        list: songs,
      });
    } else if (index === undefined) {
      if (songIndex >= songs?.length - 1) {
        setIndex(0);
        setCurrentlyPlayingSong({
          id: songs[0]?.id,
          list: songs,
        });
      } else {
        setIndex(songIndex + 1);
        setCurrentlyPlayingSong({
          id: songs[songIndex + 1]?.id,
          list: songs,
        });
      }
    } else {
      if (index >= songs?.length - 1) {
        setIndex(0);
        setCurrentlyPlayingSong({
          id: songs[0]?.id,
          list: songs,
        });
      } else {
        setIndex(index + 1);
        setCurrentlyPlayingSong({
          id: songs[arrIndex + 1]?.id,
          list: songs,
        });
      }
    }
    addSongToRecent(song, recent, user.nickname);
  }

  function handleSkipPrevious(song) {
    const arrIndex = index;
    if (index === undefined) {
      if (songIndex <= 0) {
        setIndex(songs?.length - 1);
        setCurrentlyPlayingSong({
          id: songs[songs.length - 1]?.id,
          list: songs,
        });
      } else {
        setIndex(songIndex - 1);
        setCurrentlyPlayingSong({
          id: songs[songIndex - 1]?.id,
          list: songs,
        });
      }
    } else {
      if (index <= 0) {
        setIndex(songs?.length - 1);
        setCurrentlyPlayingSong({
          id: songs[songs.length - 1]?.id,
          list: songs,
        });
      } else {
        setIndex(index - 1);
        setCurrentlyPlayingSong({
          id: songs[arrIndex - 1]?.id,
          list: songs,
        });
      }
    }
        addSongToRecent(song, recent, user.nickname);

  }

  return (
    <div className="lg:flex relative lg:items-center lg:justify-center w-[100vw] h-[100vh] min-h-[100vh]">
      <div className="relative flex flex-col w-full h-full items-center justify-enenly backdrop-blur-md lg:w-8/12 lg:items-center lg:justify-center lg:h-[80vh] lg:rounded-lg lg:flex-row">
        <Link href="/" className="absolute top-4 left-5">
          <MdKeyboardArrowDown className=" w-8 h-8 md:w-12 md:h-12  hover:text-gray-500/50 hover:scale-105" />
        </Link>
        {!user ? null : addedToFavourite ? (
          <GiEternalLove
            className="absolute w-6 h-6 md:w-9 md:h-9  hover:text-gray-100/50 hover:scale-105 active:scale-100 top-5 right-6"
            onClick={() => removeSongFromFavourite(favourite, song.id)}
          />
        ) : (
          <GiSelfLove
            className="absolute w-6 h-6 md:w-9 md:h-9 hover:text-gray-100/50 hover:scale-105 active:scale-100 top-5 right-6"
            onClick={() => addSongToFavourite(favourite, song.id)}
          />
        )}
        <div className="flex flex-col items-center justify-center w-11/12 h-2/3 md:w-4/5 lg:h-full lg:w-1/2">
          <div className="w-1/2">
            <img
              src={song?.album_cover}
              alt={song?.song_name}
              className="w-full object-fit"
            />
          </div>
          <h1 className="text-2xl text text-center md:text-4xl font-bold uppercase  mt-4 md:mt-5">
            {song?.song_name}
          </h1>
          <p className="text md:text-lg text-center font-bold capitalize mt-1">
            {song?.singers?.map((singer) => (
              <span key="singer.id">{singer?.attributes.name} </span>
            ))}
          </p>
          <hr className="w-full mt-4 lg:w-0" />
        </div>
        <div className="flex flex-col items-center justify-center gap-12 w-11/12 md:w-4/5 lg:h-full lg:w-1/2">
          <input
            type="range"
            min={0}
            max={100}
            className="w-11/12 lg:w-3/4 bg-white/40"
          />
          <div className="flex justify-between items-center w-11/12 lg:w-3/4  text-white">
            <FaRandom
              className={`w-6 h-6 hover:scale-95 ${
                random ? "text-white" : "text-gray-500/40"
              }`}
              onClick={() => setRandom(!random)}
            />
            <MdOutlineSkipPrevious
              className={`w-10 h-10 ${
                random
                  ? "text-gray-200/20"
                  : "hover:text-gray-500/50  text-white"
              }`}
              onClick={() => {
                random ? null : handleSkipPrevious(song);
              }}
            />
            {playing ? (
              <MdOutlinePause
                className="w-14 h-14 hover:text-gray-500/50 text-white"
                onClick={() => setPlaying(false)}
              />
            ) : (
              <MdOutlinePlayArrow
                className="w-14 h-14 hover:text-gray-500/50 text-white"
                onClick={() => setPlaying(true)}
              />
            )}
            <MdOutlineSkipNext
              className="w-10 h-10 hover:text-gray-500/50  text-white"
              onClick={() => handleSkipNext(song)}
            />
            {
              user ? <MdPlaylistAdd
              className={`w-10 h-10 hover:text-gray-500/50 text-white`}
              onClick={() => {
                if (user) {
                  setShowAddToPlaylistModal(true);
                  setAddingSongId(song?.id);
                }
              }}
            /> : 
            <TbPlaylistOff className="w-7 h-7 text-gray-200/30" />
            }
          </div>
          <div className="flex w-full lg:w-3/4 md:w-4/5 items-center justify-center gap-4">
            <SlVolume2 className="w-7 h-7" />
            <input type="range" min={0} max={100} className="w-3/4" />
          </div>
        </div>
      </div>
      {showAddToPlaylistModal ? <AddSongToPlaylistModal /> : null}
      {showModal ? <AddPlaylistModal /> : null}
    </div>
  );
};

export default Player;
