/** @format */

import React from "react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const Slider = ({ type, isArtistPage = false , slug = ''}) => {
  const { data, loading, error } = useFetch(
    type === "albums" && isArtistPage
      ? `albums?populate=image,songs&filters[songs][singers][slug]=${slug}`
      : type === "albums"
      ? "/albums?populate[0]=image&sort[0]=createdAt%3Adesc&pagination[start]=0&pagination[limit]=5"
      : "/categories"
  );
  const albumsOrGenres = data?.map((item) => {
    return type === "albums"
      ? {
          id: item.id,
          image: item.attributes.image.data.attributes.formats.thumbnail.url,
        }
      : {
          id: item.id,
          name: item.attributes.name,
        };
  });

  return (
    <section className="w-11/12 mx-auto mt-2 backdrop-blur-sm p-3 rounded-lg">
      <h2 className="sub-heading">
        {type === "albums" && isArtistPage
          ? "Albums"
          : type === "albums"
          ? "Recently released albums"
          : type}
      </h2>
      <div className="w-full flex overflow-auto  [&::-webkit-scrollbar]:hidden gap-4 mt-2">
        {error ? (
          <div className="w-full h-36 text-lg text-primary font-bold mt-2">
            Something Went Wrong ...
          </div>
        ) : loading ? (
          <div className="w-full h-36  text-lg text-primary font-bold mt-2">
            Loading ...
          </div>
        ) : (
          albumsOrGenres?.map((item) => (
            <div
              className="w-1/4 md:w-1/5 flex-none hover:scale-105 hover:rounded-lg rounded-lg"
              key={item.id}
            >
              {type === "albums" ? (
                <Link href={`/albums/${item.id}`}>
                  <img
                    src={item.image}
                    alt="album_cover"
                    className="w-full object-cover rounded-lg"
                  />
                </Link>
              ) : (
                <Link href={`/${item.id}`}>
                  <div className="w-full h-12 md:h-28 flex items-center justify-center rounded-lg bg-gradient-to-tr from-gray-500/60 to-black/50  backdrop-blur-sm uppercase font-bold text-sm md:text-lg">
                    {item.name}
                  </div>
                </Link>
              )}
            </div>
          ))
        )}
      </div>
      {isArtistPage ? null : type === "albums" ? (
        <Link href="/albums">
          <BiDotsHorizontalRounded className=" mt-2 w-6 h-6 mx-auto hover:scale-105" />
        </Link>
      ) : null}
    </section>
  );
};

export default Slider;
