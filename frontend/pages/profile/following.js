/** @format */

import ArtistsList from "@/components/ArtistsList";
import OtherPageLayout from "@/components/Layout/OtherPageLayout";
import useFetch from "@/hooks/useFetch";
import { useAppContext } from "@/lib/context";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import React, { useEffect } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";

export const getServerSideProps = withPageAuthRequired();

const Following = ({ user }) => {
  const {getFavourites, favourite} = useAppContext();
  const { data, loading, error } = useFetch("/singers?populate[0]=photo");

  useEffect(() => {
    if (user) {
      getFavourites(user.nickname);
    }
  }, [user]);


  const artists = data?.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name,
      image: item.attributes.photo.data.attributes.formats.thumbnail.url,
      slug: item.attributes.slug,
    };
  });

  const followingArtists = artists?.filter(artist => favourite?.singers_slug?.includes(artist.slug))


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
          <h1 className="heading">Following</h1>
          <hr />
        </div>
        <ArtistsList artists={followingArtists} favourite={favourite} loading={loading} error={error} isFollowingPage/>
      </article>
    </OtherPageLayout>
  );
};

export default Following;
