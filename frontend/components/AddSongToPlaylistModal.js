/** @format */

import { useAppContext } from "@/lib/context";
import React, { useEffect } from "react";
import PlaylistsList from "./PlaylistsList"; 
import {motion} from 'framer-motion'

const AddSongToPlaylistModal = () => {
  const { user, getPlaylists, playlists } = useAppContext();
  useEffect(() => {
    getPlaylists(user?.nickname);
  }, [user]);

  return (
    <motion.section
      initial={{  opacity: 0 }}
      animate={{  opacity: 1 }}
      className="custom-container absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center"
    >
      <PlaylistsList playlists={playlists} isModal />
    </motion.section>
  );
};

export default AddSongToPlaylistModal;
