/** @format */

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import OtherPageLayout from "@/components/Layout/OtherPageLayout";
import useFetch from "@/hooks/useFetch";
import SongsList from "@/components/SongsList";
import { useAppContext } from "@/lib/context";

export const getServerSideProps = withPageAuthRequired();

const SinglePlaylist = ({ user }) => {
  const { getPlaylists, playlists, deletePlaylist } = useAppContext();
  const router = useRouter();
  
  
  useEffect(() => {
    getPlaylists(user.nickname);
  }, [user]);
  

  const { data, loading, error } = useFetch(
    `http://localhost:1337/api/songs?populate=singers,album,album.image,playlists&pagination[page]=1&pagination[pageSize]=44`
  );

  const songs = loading
    ? null
    : data?.map((item) => {
        return {
          id: item.id,
          song_name: item.attributes.name,
          album_cover:
            item.attributes.album.data.attributes.image.data.attributes.formats
              .thumbnail.url,
          singers: item.attributes.singers.data,
          playlists_slug: item.attributes.playlists?.data?.map(
            (item) => item.attributes.slug
          ),
          playlist_id: item.attributes.playlists?.data?.map(
            (item) => item.id
          )[0],
          album_name: item.attributes.album.data.attributes.name,
        };
      });

      
  const getSpecificPlaylist = playlists?.filter(
    (item) => item.slug === router.query.playlist
  );
  const filterSongs = songs?.filter((song) => {
    return getSpecificPlaylist.length > 0
      ? getSpecificPlaylist[0].songs_id?.includes(song.id)
      : null;
  });

  

  return (
    <OtherPageLayout>
      <article className="songlist-container">
        <div className="heading-container">
          {getSpecificPlaylist.length > 0 ? (
            <MdDeleteForever
              className="absolute top-4 right-4 md:top-6  md:right-5  w-6 h-6 cursor-pointer lg:top-7 md:w-8  md:h-8 hover:text-gray-500/50 hover:scale-105"
              onClick={() => {
                router.push('/profile')
                deletePlaylist(getSpecificPlaylist[0].id);
              }}
            />
          ) : null}
          <Link
            href="/profile"
            className="absolute top-5 left-4 md:top-6  md:left-5 hover:scale-105 lg:top-7 hover:text-gray-200/60 cursor-pointer"
          >
            <AiOutlineDoubleLeft className="md:w-6 md:h-6" />
          </Link>
          <h1 className="heading md:mb-4">
            {router.query.playlist.split("-").join(" ").toUpperCase()}
          </h1>
          <hr />
        </div>
        <SongsList
          songs={filterSongs}
          loading={loading}
          error={error}
          isPlaylist
        />
      </article>
    </OtherPageLayout>
  );
};

export default SinglePlaylist;
