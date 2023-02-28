/** @format */

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/context";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import OtherPageLayout from "@/components/Layout/OtherPageLayout";
import Slider from "@/components/Slider";
import SongsList from "@/components/SongsList";
import useFetch from "@/hooks/useFetch";

const Artist = () => {
  const {
    user,
    getFavourites,
    favourite,
    removeArtistFromFavourite,
    addArtistToFavourite,
  } = useAppContext();

  const { query } = useRouter();

  useEffect(() => {
    if (user) {
      getFavourites(user.nickname);
    }
  }, [user]);

  const { data, loading, error } = useFetch(
    `/songs?populate=singers,album,album.image,singers.photo&sort=name%3Aasc&filters[singers][slug][$eq]=${query.artist}`
  );
  const songs = loading

    ? null
    : data?.map((item) => {
        return {
          id: item.id,
          song_name: item.attributes.name,
          album_id: item.attributes.album.data.id,
          album_cover:
            item.attributes.album.data.attributes.image.data.attributes.formats
              .thumbnail.url,
          singer_id : item.attributes.singers.data[0].id,
          singers: item.attributes.singers.data,
          album_name: item.attributes.album.data.attributes.name,
        };
      });

  const hasFollowed = favourite?.singers_slug?.includes(query.artist);
  return (
    <OtherPageLayout>
      <article className="songlist-container">
        {loading ? null : songs.length > 0 ? (
          <div className="headinig-container flex flex-col items-center justify-center pt-4 md:pt-8">
            <Link
              href="/artists"
              className="absolute top-4 left-4 hover:scale-105 hover:text-gray-200/60 cursor-pointer"
            >
              <AiOutlineDoubleLeft className="md:w-6 md:h-6" />
            </Link>
            <div className="relative w-1/3 h-[31vw] md:w-1/4 md:h-[23vw] lg:w-1/5 lg:h-[204.5px] mb-2 md:mb-4">
              <img
                src={
                  songs[0].singers[0].attributes.photo.data.attributes.formats
                    .thumbnail.url
                }
                className=" w-full h-full object-cover rounded-full"
              />
              {!user ? null : hasFollowed ? (
                <AiFillCheckCircle onClick={() => removeArtistFromFavourite(favourite, songs[0].singer_id)} className="absolute w-6 h-6 text-sky-500 md:w-10 md:h-10 bottom-1 right-1 font-semibold" />
                ) : (
                <AiOutlinePlusCircle onClick={() => addArtistToFavourite(favourite, songs[0].singer_id)} className="absolute w-6 h-6 md:w-10 md:h-10 bottom-1 right-1 font-semibold" />
              )}
            </div>
            <h1 className="heading text-center">
              {songs[0].singers[0].attributes.name}
            </h1>
            <p className="w-11/12 md:w-3/4 mb-2 md:mb-4">
              {songs[0].singers[0].attributes.about}
            </p>
          </div>
        ) : null}
        <hr />

        <h2 className="sub-heading mt-2 md:mt-4">Songs</h2>

        <SongsList isArtistPage songs={songs} loading={loading} error={error} />

        <Slider type="albums" isArtistPage songs={songs} slug={query.artist} />
      </article>
    </OtherPageLayout>
  );
};

export default Artist;
