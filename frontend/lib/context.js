/** @format */

import makeRequest from "@/hooks/MakeRequest";
import { useUser } from "@auth0/nextjs-auth0/client";

const { useContext, createContext, useState } = require("react");

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { user, loading, error } = useUser();
  const [playing, setPlaying] = useState();
  const [favourite, setFavourite] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [recent, setRecent] = useState([]);
  const [currentlyPlayingSong, setCurrentlyPlayingSong] = useState({
    id: "",
    list: [],
  });
  const [addingSongId, setAddingSongId] = useState(""); // id of song going to added to playlists
  const [showModal, setShowModal] = useState(false);
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);

  async function getFavourites(username) {
    try {
      const { data } = await makeRequest.get(
        `/favourites?populate=songs,singers,singers.slug`
      );
      const filterArrByUser = data.data.filter(
        (item) => item.attributes.user_name === username
      )[0];

      setFavourite({
        id: filterArrByUser?.id,
        songs_id: filterArrByUser?.attributes?.songs?.data?.map(
          (song) => song.id
        ),
        singers_slug: filterArrByUser?.attributes?.singers?.data?.map(
          (singer) => singer.attributes.slug
        ),
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function addSongToFavourite(favourite, songId) {
    if (favourite.id === undefined) {
      try {
        await makeRequest.post(`/favourites`, {
          data: {
            user_name: user.nickname,
            songs: {
              connect: [
                {
                  id: songId,
                },
              ],
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await makeRequest.put(`/favourites/${favourite.id}`, {
          data: {
            songs: {
              connect: [
                {
                  id: songId,
                  // position: {
                  //   after: favourite.songs_id[favourite.songs_id.length - 1],
                  // },
                },
              ],
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
    await getFavourites(user.nickname);
  }

  async function removeSongFromFavourite(favourite, songId) {
    try {
      await makeRequest.put(`favourites/${favourite.id}`, {
        data: {
          songs: {
            disconnect: [songId],
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
    getFavourites(user.nickname);
  }

  async function removeArtistFromFavourite(favourite, singerId) {
    try {
      await makeRequest.put(`favourites/${favourite.id}`, {
        data: {
          singers: {
            disconnect: [singerId],
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
    getFavourites(user.nickname);
  }

  async function addArtistToFavourite(favourite, singerId) {
    if (favourite.id === undefined) {
      try {
        await makeRequest.post(`/favourites`, {
          data: {
            user_name: user.nickname,
            singers: {
              connect: [
                {
                  id: singerId,
                },
              ],
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await makeRequest.put(`/favourites/${favourite.id}`, {
          data: {
            singers: {
              connect: [singerId],
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
    await getFavourites(user.nickname);
  }

  async function getPlaylists(username) {
    try {
      const data = await makeRequest.get(`/playlists?populate=songs`);

      const filterArrByUser = data.data.data.filter(
        (item) => item.attributes.user_name === username
      );

      setPlaylists(
        filterArrByUser?.map((item) => {
          return {
            id: item?.id,
            name: item?.attributes?.name,
            slug: item?.attributes?.slug,
            user_name: item?.attributes?.user_name,
            songs_id: item?.attributes?.songs?.data?.map((item) => item?.id),
          };
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function addPlaylists(name, songId = "") {
    if (songId === "") {
      try {
        makeRequest.post(`/playlists`, {
          data: {
            user_name: user.nickname,
            name: name,
            slug: name.toLowerCase().split(" ").join("-"),
          },
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        makeRequest.post(`/playlists`, {
          data: {
            user_name: user.nickname,
            name: name,
            slug: name.toLowerCase().split(" ").join("-"),
            songs: {
              connect: [songId],
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
    getPlaylists(user.nickname);
  }

  async function removeSongFromPlaylist(songId, playlistId) {
    try {
      await makeRequest.put(`/playlists/${playlistId}`, {
        data: {
          songs: {
            disconnect: [songId],
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
    getPlaylists(user.nickname);
  }

  async function addSongToPlaylist(playlistId) {
    try {
      await makeRequest.put(`playlists/${playlistId}`, {
        data: {
          songs: {
            connect: [addingSongId],
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
    getPlaylists();
  }

  async function deletePlaylist(playlistId) {
    try {
      makeRequest.delete(`/playlists/${playlistId}`);
    } catch (e) {
      console.log(e);
    }
    getPlaylists();
  }

  async function getRecents(username) {
    try {
      const { data } = await makeRequest.get(
        "/recents?populate=songs,songs.categories"
      );
      const filterArr = data.data.filter(
        (item) => item.attributes.user_name === username
      )[0];

      const categories_id = filterArr?.attributes?.songs?.data?.map(
        (song) =>
          song?.attributes?.categories?.data?.map((category) => category?.id)[0]
      );

      const filterCategoriesId = categories_id?.reduce((arr, value) => {
        return categories_id?.filter((item) => item === value)?.length >= 3 &&
          arr?.indexOf(value) === -1
          ? [...arr, value]
          : arr;
      }, []);

      setRecent({
        id: filterArr?.id,
        songs_id: filterArr?.attributes?.songs?.data?.map((song) => song?.id),
        categories_id: filterCategoriesId,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function addSongToRecent(song, recent, username) {
    if (recent.id === undefined) {
      makeRequest.post("/recents", {
        data: {
          user_name: username,
          songs: {
            connect: [song.id],
          },
        },
      });
    } else {
      if (recent.songs_id.includes(song.id)) {
        makeRequest.put(`/recents/${recent.id}`, {
          data: {
            songs: {
              disconnect: [song.id],
              connect: [song.id],
            },
          },
        });
      } else if (recent.songs_id.length > 15) {
        makeRequest.put(`/recents/${recent.id}`, {
          data: {
            songs: {
              disconnect: [recent.songs_id[0]],
              connect: [song.id],
            },
          },
        });
      } else {
        makeRequest.put(`recents/${recent.id}`,{
          data : {
            songs : {
              connect : [song.id]
            }
          }
        })
      }
    }
    getRecents(user.nickname)
  }

  return (
    <AppContext.Provider
      value={{
        user,
        favourite,
        setFavourite,
        getFavourites,
        addSongToFavourite,
        removeSongFromFavourite,
        removeArtistFromFavourite,
        addArtistToFavourite,
        getPlaylists,
        playlists,
        addPlaylists,
        removeSongFromPlaylist,
        showModal,
        setShowModal,
        showAddToPlaylistModal,
        setShowAddToPlaylistModal,
        setAddingSongId,
        addingSongId,
        addSongToPlaylist,
        deletePlaylist,
        currentlyPlayingSong,
        setCurrentlyPlayingSong,
        playing,
        setPlaying,
        getRecents,
        recent,
        addSongToRecent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
