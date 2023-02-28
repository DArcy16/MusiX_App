import Link from 'next/link';
import React from 'react'

const AlbumsList = ({albums, loading, error}) => {
  return (
    <>
      {error ? (
        <div className="w-full h-36 text-lg text-primary font-bold mt-2">
          Something Went Wrong ... Check your network connection or URL
        </div>
      ) : loading ? (
        <div className="w-full h-36  text-lg text-primary font-bold mt-2">
          Loading ...
        </div>
      ) : (
        albums?.map((album) => (
          <div key={album.id} className="w-1/3 md:w-1/4 lg:w-1/5 mb-4 mx-auto">
            <div className="w-full h-[28vw] md:h-[23vw] lg:h-[187px] rounded-lg overflow-hidden">
              <Link href={`/albums/${album.id}`}>
                <img
                  src={album.image}
                  alt={album.name}
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>

            <h2 className="uppercase text-sm  font-bold mt-2 md:text-lg md:mt-4">
              {album.name}
            </h2>
          </div>
        ))
      )}
    </>
  );
}

export default AlbumsList