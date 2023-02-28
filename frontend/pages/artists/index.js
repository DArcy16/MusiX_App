/** @format */

import ArtistsList from "@/components/ArtistsList";
import Footer from "@/components/Footer";
import OtherPageLayout from "@/components/Layout/OtherPageLayout";
import useFetch from "@/hooks/useFetch";
import React from "react";

const index = () => {
  const { data, loading, error } = useFetch(
    "/singers?populate[0]=photo&sort=name%3Aasc"
  );

  const artists = data?.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name,
      image: item.attributes.photo.data.attributes.formats.thumbnail.url,
      slug: item.attributes.slug,
    };
  });



  return (
    <OtherPageLayout>
      <article className="relative top-4 w-[92vw] max-w-full h-[90vh] mx-auto backdrop-blur-sm rounded-lg px-4 pb-4 text-center md:px-6  md:top-6 overflow-auto [&::-webkit-scrollbar]:hidden">
        <div className="sticky w-full top-0 mb-4 md:mb-8 backdrop-blur-sm p-4 z-50">
          <h1 className="heading">Artists</h1>
          <hr />
        </div>
          <ArtistsList artists={artists} loading={loading} isArtistsPage error={error}/>
      </article>
    </OtherPageLayout>
  );
};

export default index;
