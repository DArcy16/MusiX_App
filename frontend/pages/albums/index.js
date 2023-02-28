/** @format */

import React from "react";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import {AiOutlineDoubleLeft} from "react-icons/ai"
import OtherPageLayout from "@/components/Layout/OtherPageLayout";
import AlbumsList from "@/components/AlbumsList";

const Index = () => {
  const { data, loading, error } = useFetch(
    "/albums?populate[0]=image&sort=name%3Aasc"
  );

  const albums = data?.map(item => {
    return {
      id: item.id,
      name: item.attributes.name,
      image: item.attributes.image.data.attributes.formats.thumbnail.url,
    };
  })

  return (
    <OtherPageLayout>
      <article className="relative top-4 w-[92vw] max-w-full h-[90vh] mx-auto backdrop-blur-sm rounded-lg px-4 pb-4 text-center md:px-6  md:top-6 overflow-auto [&::-webkit-scrollbar]:hidden">
        <div className="sticky w-full top-0 mb-4 md:mb-8 backdrop-blur-sm p-4">
          <Link
            href="/"
            className="absolute top-4 left-4 hover:scale-105 hover:text-gray-200/60 cursor-pointer"
          >
            <AiOutlineDoubleLeft className="md:w-6 md:h-6" />
          </Link>
          <h1 className="md:text-3xl font-bold uppercase mb-2 block md:mb-4">
            Albums
          </h1>
          <hr />
        </div>
        <div className="w-full flex flex-wrap gap-1 justify-center mt-4">
          <AlbumsList albums={albums} loading={loading} error={error} />
        </div>
      </article>
    </OtherPageLayout>
  );
};

export default Index;
