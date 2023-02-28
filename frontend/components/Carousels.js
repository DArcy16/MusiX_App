/** @format */

import React from "react";
import useFetch from "@/hooks/useFetch";
import SingleCarousel from "@/components/SingleCarousel";

const Carousels = () => {
  const { data, loading, error } = useFetch(
    "/songs?populate=singers,album,album.image&sort[0]=createdAt%3Adesc&pagination[start]=0&pagination[limit]=5"
  );

  const carousels = loading
    ? null
    : data?.map((item) => {
        return {
          id: item.id,
          song_name: item.attributes.name,
          album_cover:
            item.attributes.album.data.attributes.image.data.attributes.formats
              .thumbnail.url,
          singers: item.attributes.singers.data,
          album_name:
            item.attributes.album.data.attributes.name,
        };
      });

  return (
    <>
      {error ? (
        <div className="w-full h-36 text-lg text-primary font-bold mt-2">
          Something Went Wrong ...
        </div>
      ) : loading ? (
        <div className="w-full h-36  text-lg text-primary font-bold mt-2">
          Loading ...
        </div>
      ) : (
        <article className="w-full relative rounded-lg mt-2 snap-start scroll-mt-14">
          <div className="carousel w-11/12 rounded-lg py-6 mx-auto h-full backdrop-blur-sm">
            {carousels?.length
              ? carousels.map((carousel, index) => (
                  <SingleCarousel
                    carousel={carousel}
                    songs = {carousels}
                    index={index}
                    key={carousel.id}
                  />
                ))
              : null}
          </div>
        </article>
      )}
    </>
  );
};

export default Carousels;
