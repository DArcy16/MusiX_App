import React, { useEffect } from 'react'
import Link from 'next/link';
import {AiOutlineDoubleLeft} from "react-icons/ai"
import OtherPageLayout from '@/components/Layout/OtherPageLayout'
import SongsList from '@/components/SongsList';
import useFetch from '@/hooks/useFetch';

import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useAppContext } from '@/lib/context';

export const getServerSideProps = withPageAuthRequired();

const Favourite = ({user}) => {
  const {getFavourites, favourite } = useAppContext();

  useEffect(() => {
    getFavourites(user.nickname);
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
          album_name: item.attributes.album.data.attributes.name,
        };
      });


      const favSongs = songs?.filter(song => favourite?.songs_id?.includes(song.id))

  
  return (
    <OtherPageLayout>
      <article className="songlist-container">
        <div className="heading-container">
          <Link
            href="/profile"
            className="absolute top-4 left-4 hover:scale-105 hover:text-gray-200/60 cursor-pointer"
          >
            <AiOutlineDoubleLeft className="md:w-6 md:h-6" />
          </Link>
          <h1 className="heading">Favourite</h1>
          <hr />
        </div>
        <SongsList songs={favSongs} loading={loading} error={error}/>
      </article>
    </OtherPageLayout>
  );
}

export default Favourite