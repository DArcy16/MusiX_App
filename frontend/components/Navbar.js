import React from 'react'
import { BiSearchAlt } from 'react-icons/bi';
import UserItem from './UserItem';

const Navbar = () => {
  return (
    <nav className="sticky snap-start scroll-mt-12
     top-0 z-50 bg-primary/10 backdrop-blur-sm flex items-center justify-between w-[100vw] py-3 px-5 md:px-8 lg:px-20">
      <UserItem />
      <h2 className='font-bold text-lg md:text-2xl lg:text-2xl text-white/60  capitalize'>MusiX</h2>
      {/* <BiSearchAlt className="w-7 h-7 md:w-8 md:h-8 text-primary/60" /> */}
    </nav>
  );
}

export default Navbar