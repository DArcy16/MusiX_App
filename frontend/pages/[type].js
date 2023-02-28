/** @format */

import OtherPageLayout from "@/components/Layout/OtherPageLayout";
import ShowLoadingError from "@/components/ShowLoadingError";
import SongsList from "@/components/SongsList";
import useFetch from "@/hooks/useFetch";
import { useAppContext } from "@/lib/context";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";

const Recommend = () => {
  const { query } = useRouter();
  const { user, getRecents, recent } = useAppContext();

  useEffect(() => {
    if (user) {
      getRecents(user.nickname);
    }
  }, [user]);

  const { data, loading, error } = useFetch(
    query.type === "recent"
      ? `/songs?populate=singers,album,categories,album.image&pagination[page]=1&pagination[pageSize]=44`
      : query.type === "recommend"
      ? `/songs?populate=singers,album,categories,album.image&pagination[page]=1&pagination[pageSize]=44&sort=name%3Aasc`
      : `/songs?populate=singers,categories,album,album.image&sort=name%3Aasc&filters[categories][id][$eq]=${query.type}`
  );


  const songs = loading
    ? null
    : data?.map((item) => {
        return {
          id: item.id,
          song_name: item.attributes.name,
          album_id: item.attributes.album.data.id,
          categories: item.attributes.categories.data,
          album_cover:
            item.attributes.album.data.attributes.image.data.attributes.formats
              .thumbnail.url,
          singers: item.attributes.singers.data,
          album_name: item.attributes.album.data.attributes.name,
        };
      });


  const filterSongs =
    query.type === "recent"
      ? recent?.songs_id?.map(item => {
        return songs?.filter((song) => song?.id === item)[0]
      }).reverse()
      : query.type === "recommend"
      ? songs?.filter((song) => {
          return recent?.categories_id?.includes(song?.categories[0]?.id);
        })
      : songs;



  return (
    <OtherPageLayout>
      <article className="songlist-container relative">
        {!loading ? (
          <div className="heading-container">
            <Link
              href="/"
              className="absolute top-4 left-4 hover:scale-105 hover:text-gray-200/60 cursor-pointer"
            >
              <AiOutlineDoubleLeft className="md:w-6 md:h-6" />
            </Link>
            <h1 className="heading">
              {query.type === "recent"
                ? "Recently Played"
                : query.type === "recommend"
                ? "Recommended"
                : songs?.length > 0
                ? songs[0].categories[0].attributes.name
                : `${query.type} Does Not Exist!!`}
            </h1>
            <hr />
          </div>
        ) : null}
        <ShowLoadingError loading={loading} error={error}>
          {filterSongs?.length > 0 ? (
            <SongsList songs={filterSongs} />
          ) : (
            <div className="w-full h-36 mx-auto flex items-center justify-center sub-heading">
              Currently, no songs yet.
            </div>
          )}
        </ShowLoadingError>
      </article>
    </OtherPageLayout>
  );
};

export default Recommend;
