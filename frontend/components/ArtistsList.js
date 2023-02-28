/** @format */

import { useAppContext } from "@/lib/context";
import Link from "next/link";
import React from "react";
import { AiFillCheckCircle} from "react-icons/ai"

const ArtistsList = ({ artists, loading, error, isArtistsPage = false, isFollowingPage = false, favourite }) => {
  const {removeArtistFromFavourite} = useAppContext();


  return (
    <div className="w-full flex flex-wrap gap-1 justify-center mt-4">
      {error ? (
        <div className="w-full h-36 text-lg text-primary font-bold mt-2">
          Something Went Wrong ... Check your network connection or URL
        </div>
      ) : loading ? (
        <div className="w-full h-36  text-lg text-primary font-bold mt-2">
          Loading ...
        </div>
      ) : (
        artists?.map((artist) => (
          <div key={artist.id} className="w-1/3 md:w-1/4 lg:w-1/5 mb-4 mx-auto">
            <div
              className="relative w-full h-[28vw] md:h-[23vw] lg:h-[187px] rounded-full"
              key={artist.id}
            >
              {isFollowingPage ? (
                <AiFillCheckCircle
                  onClick={() =>
                    removeArtistFromFavourite(favourite, artist.id)
                  }
                  className="absolute z-40 w-6 h-6 text-sky-500 md:w-10 md:h-10 bottom-1 right-1 font-semibold"
                />
              ) : null}
              <Link href={`/artists/${artist.slug}`}>
                <img
                  src={artist.image}
                  alt="artist.name"
                  className="relative w-full h-full object-cover rounded-full"
                />
              </Link>
            </div>
            {isArtistsPage || isFollowingPage ? (
              <h2 className="uppercase text-sm  font-bold mt-2 md:text-lg md:mt-4 text-center">
                {artist.name}
              </h2>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
};

export default ArtistsList;
