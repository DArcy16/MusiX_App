/** @format */

import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi"
import ArtistsList from "./ArtistsList";

const ArtistsSection = () => {
  const { data, loading, error } = useFetch(
    "/singers?populate[0]=photo&pagination[start]=0&pagination[limit]=4"
  );

  const artists = data?.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name,
      image: item.attributes.photo.data.attributes.formats.thumbnail.url,
      slug : item.attributes.slug
    };
  });


  return (
    <section className="w-11/12 mx-auto mt-2 mb-8 backdrop-blur-sm p-4 rounded-lg">
      <h2 className="sub-heading">Artists</h2>
      <ArtistsList artists={artists} loading={loading} error={error}/>
      <Link href="/artists">
        <BiDotsHorizontalRounded className="w-6 h-6 mx-auto hover:scale-105" />
      </Link>
    </section>
  );
};

export default ArtistsSection;
