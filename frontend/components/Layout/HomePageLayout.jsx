/** @format */

import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { easeIn, easeInOut, motion } from "framer-motion";

const HomePageLayout = ({ children }) => {
  return (
    <div className="relative">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="custom-container"
      >
        {children}
      </motion.div>
      <Footer />
    </div>
  );
};

export default HomePageLayout;
