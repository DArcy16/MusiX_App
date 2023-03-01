/** @format */

import { useAppContext } from "@/lib/context";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { GiSplitCross } from "react-icons/gi";

const AddPlaylistModal = ({ isProfilePage = false }) => {
  const { setShowModal, addingSongId, setShowAddToPlaylistModal } =
    useAppContext();
  const { addPlaylists } = useAppContext();
  const [playlistName, setPlaylistName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    isProfilePage
      ? addPlaylists(playlistName)
      : addPlaylists(playlistName, addingSongId) &&
        toast.success(`Added to ${playlistName}`);
    setShowAddToPlaylistModal(false);

    e.target.value = "";
    setShowModal(false);
  };

  return (
    <motion.div
      initial={{  opacity: 0 }}
      animate={{  opacity: 1 }}
      className="custom-container absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center"
    >
      <form className="py-4 px-8 rounded-lg w-11/12 md:w-1/2 bg-black/30 backdrop-blur-lg text-center relative">
        <GiSplitCross
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 w-4 h-4 text-gray-100/80 hover:scale-105"
        />
        <h2 className="sub-heading">Add Playlists</h2>
        <hr className="mt-2 mb-4" />
        <input
          className=" py-2 bg-transparent border border-solid w-11/12 md:w-2/3 border-gray-50/50 rounded-lg text-center focus:ring-1 focus:ring-white/50"
          type="text"
          placeholder="Add Playlist Name"
          name="name"
          required
          onChange={(e) => {
            setPlaylistName(e.target.value);
          }}
        ></input>
        <div>
          <button
            type="submit"
            className="primary-btn mt-4"
            onClick={(e) => handleSubmit(e)}
          >
            Add
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddPlaylistModal;
