import React from 'react'
import Footer from '../Footer'

const OtherPageLayout = ({children}) => {
  return (
    <>
      <div className="custom-container">{children}</div>
      <Footer />
    </>
  );
}

export default OtherPageLayout