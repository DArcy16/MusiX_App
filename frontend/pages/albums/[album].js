/** @format */

import OtherPageLayout from "@/components/Layout/OtherPageLayout";
import ShowLoadingError from "@/components/ShowLoadingError";
import SongsList from "@/components/SongsList";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {AiOutlineDoubleLeft} from "react-icons/ai"

const Album = () => {
  const { query } = useRouter();

  const { data, loading, error } = useFetch(
    `/songs?populate=singers,album,album.image&sort[0]=createdAt%3Adesc&pagination[start]=0&pagination[limit]=5&filters[album][id][$eq]=${query.album}`
    
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
          singers: item.attributes.singers.data,
          album_name:
            item.attributes.album.data.attributes.name,
        };
      });



  return (
    <OtherPageLayout>
      {!loading && songs.length > 0 ? (
        <article className="songlist-container">
          <div className="relative headinig-container flex flex-col items-center justify-center pt-4 md:pt-8">
            <Link
              href="/albums"
              className="absolute top-4 left-4 hover:scale-105 hover:text-gray-200/60 cursor-pointer"
            >
              <AiOutlineDoubleLeft className="md:w-6 md:h-6" />
            </Link>
            <div className="w-1/2 md:w-1/4 mb-2 md:mb-4">
              <img
                src={songs ? songs[0].album_cover : null}
                alt={songs ? songs[0].album_name : null}
                className="w-full object-cover rounded-lg"
              />
            </div>
            <h1 className="heading text-center">
              {songs ? songs[0].album_name : null}
            </h1>
          </div>
          <hr />

          <SongsList songs={songs} loading={loading} error={error} />
        </article>
      ) : null}
    </OtherPageLayout>
  );
};

export default Album;
