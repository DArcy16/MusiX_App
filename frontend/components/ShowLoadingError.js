import React from 'react'

const ShowLoadingError = ({children, loading, error}) => {
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
        children
      )}
    </>
  );
}

export default ShowLoadingError