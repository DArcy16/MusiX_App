/** @format */

import useFetch from "@/hooks/useFetch";
import { useAppContext } from "@/lib/context";
import Link from "next/link";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { RiGroupFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";

const Footer = () => {
  const {
    currentlyPlayingSong,
    setCurrentlyPlayingSong,
    setPlaying,
    getRecents,
    recent,
    user,
    addSongToRecent,
  } = useAppContext();

  useEffect(() => {
    if (user) {
      getRecents(user.nickname);
    }
  }, [user]);
  // console.log(currentlyPlayingSong)
  const { data, loading, error } = useFetch(
    `/albums?populate[0]=image&filters[songs][id][$eq]=${currentlyPlayingSong.id}
  `
  );

  return (
    <footer className="w-full sticky bottom-0 p-3 flex justify-around items-center bg-black/50 backdrop-blur-sm text-gray-200 z-50 md:p-5">
      <Link href="/" className="hover:scale-125">
        <AiOutlineHome className="w-6 h-6" />
      </Link>
      <Link href="/artists" className="hover:scale-125">
        <RiGroupFill className="w-6 h-6" />
      </Link>
      {currentlyPlayingSong.id !== "" ? (
        loading ? null : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-12 md:-top-16"
          >
            <Link href="/player">
              <MdOutlineKeyboardArrowUp className="mx-auto w-8 h-8 md:w-12 md:h-12 -mb-1 md:-mb-3 hover:scale-105 animate-pulse" />
            </Link>
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full object-fit relative flex items-center justify-center ">
              <img
                src={
                  data[0]?.attributes?.image?.data?.attributes?.formats
                    ?.thumbnail?.url
                }
                alt={data[0]?.attributes?.name}
                className="w-full h-full object-fit rounded-full animate-spin-slow"
              ></img>
              <ImCross
                className="absolute w-8 h-8 text-white/70 text-gray hover:scale-105 cursor-pointer animate-pulse"
                onClick={() => {
                  if (user) {
                    addSongToRecent(
                      currentlyPlayingSong,
                      recent,
                      user.nickname
                    );
                  }
                  setCurrentlyPlayingSong({
                    id: "",
                    list: [],
                  });
                  setPlaying(false);
                }}
              />
            </div>
          </motion.div>
        )
      ) : null}
    </footer>
  );
};

export default Footer;
