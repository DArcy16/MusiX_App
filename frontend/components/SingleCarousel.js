/** @format */

import { useAppContext } from "@/lib/context";
import React, { useEffect } from "react";
import { BsPlay } from "react-icons/bs";

const SingleCarousel = ({ carousel, index, songs }) => {
  const {setCurrentlyPlayingSong, user, setPlaying, getRecents, recent, addSongToRecent} = useAppContext();

  useEffect(() => {
    if(user) {
      getRecents(user.nickname)
    }
  },[user])

  const handleOnClick = (song, songs, recent) => {
    setCurrentlyPlayingSong({
      id: song.id,
      list: songs,
    });
    setPlaying(true);
    addSongToRecent(song, recent, user.nickname);
  };

  return (
    <div
      id={`slide${index}`}
      className="carousel-item relative w-full flex justify-center items-center gap-6"
    >
      <div className="w-1/3 md:w-1/4 relative rounded-lg flex items-center justify-center">
        <img src={carousel.album_cover} className="w-full rounded-lg" />
          <BsPlay
            className="absolute flex items-center justify-center transform -translate-y-1/2 top-1/2 text-white/70 font-bold hover:scale-125 w-14 h-14"
            onClick={() => handleOnClick(carousel, songs, recent)
            }
          />
        
      </div>

      <div className="w-1/3 rounded-lg">
        <h1 className="heading"> {carousel.song_name} </h1>
        <hr className="mt-1" />
        <small className="md:text-lg font-semibold">
          {carousel.singers[0].attributes.name}
        </small>
      </div>

      <div className="absolute flex items-center justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
        <a
          href={index < 1 ? `#slide${4}` : `#slide${index - 1}`}
          className="hover:text-gray-500 hover:scale-125"
        >
          ❮
        </a>
        <a
          href={index > 3 ? `#slide${0}` : `#slide${index + 1}`}
          className="hover:text-gray-500 hover:scale-125"
        >
          ❯
        </a>
      </div>
    </div>
  );
};

export default SingleCarousel;
