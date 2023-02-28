import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link';
import React from 'react'

const UserItem = () => {
    const {user, loading, error} = useUser();

    if(!user) {
        return <Link href="/api/auth/login" className='secondary-btn'>Login</Link>
    } 
    return (
      <Link href="/profile">
        <img
          src={user.picture}
          alt={user.name}
          className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full hover:scale-105"
        />{" "}
      </Link>
    );
    
//   return (
    
//   )
}

export default UserItem