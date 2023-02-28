import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'

const HomePageLayout = ({children}) => {
  return (
    <div className='relative'>
      <Navbar />
      <div className="custom-container">{children}</div>
      <Footer />
    </div>
  );
}

export default HomePageLayout