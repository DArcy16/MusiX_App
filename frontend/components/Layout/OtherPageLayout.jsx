import React from 'react'
import Footer from '../Footer'
import { easeInOut, motion} from 'framer-motion'

const OtherPageLayout = ({children}) => {
  return (
    <>
      <motion.div
        initial={{ opacity : 0 }}
        animate={{ opacity: 1}}
        transition={{ duration: 0.5, easeInOut }}
        className="custom-container"
      >
        {children}
      </motion.div>
      <Footer />
    </>
  );
}

export default OtherPageLayout