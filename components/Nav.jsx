"use client";

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {
  signIn,
  signOut,
  useSession,
  getProviders
} from 'next-auth/react'
import { FaGoogle } from "react-icons/fa"


function Nav() {
const { data: session } = useSession();

const [providers, setProviders] = useState(null);
const [toggleDropdown, setToggleDropdown] = useState(false);

// Fetching the providers
useEffect(() => {
  (async () => {
    const res = await getProviders();
    setProviders(res);
   
  })();
}, []);


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.png"
          width={30}
          height={30}
          alt="logo"
          className="object-contain"
        />
        <p className="logo_text">
          AI Prompts
        </p>

      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
  {session?.user ? (
    <div className="flex gap-2">
      <Link href="/create-prompt"
      className="blue_btn"
      >Create Prompt
      </Link>
      <button 
      type="button"
      onClick={signOut}
      className="outline_btn"
      >
        Sign Out
      </button>
    <Link href={'/profile'}>
    {session?.user.image ? 
    <Image 
    src={session?.user.image}
    width={37}
    height={37}
    alt="profile"
    className="rounded-full"
    />
    : 
    <div className="rounded-full bg-orange-500 text-white">
      <h1 className="mx-1 p-3">
        {session?.user.name[0].toUpperCase()}
      </h1>
      </div>

  }
    </Link>

    </div>
  ) : (
    <>
    
      {/* Sign In */}
      {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='white_btn'
                >
                  <FaGoogle className="mr-2" />
                  <span>Sign In</span>
                </button>
              ))}

    </>
  )}
</div>

{/* Mobile Navigation */}
<div className="sm:hidden flex relative">
{session?.user ? (
    <div className="flex">
      {session?.user.image ? 
    <Image 
    src={session?.user.image}
    width={37}
    height={37}
    alt="profile"
    className="rounded-full"
    />
    : 
    <div
    onClick={() => setToggleDropdown(!toggleDropdown)}
    className="rounded-full bg-orange-500 text-white cursor-pointer">
      <h1 className="mx-1 p-3">
        {session?.user.name[0].toUpperCase()}
      </h1>
      </div>

  }

    {toggleDropdown && (
      <div className="dropdown">
        <Link href="/create-prompt" 
        className="dropdown_link"
        onClick={() => setToggleDropdown(false)}
        >
          Create Prompt
        </Link>
        <Link href="/profile" 
        className="dropdown_link"
        onClick={() => setToggleDropdown(false)}
        >
          My Profile
        </Link>

        <button 
        type="button"
        onClick={() => {setToggleDropdown(false)
           signOut()}}
        className="mt-5 black_btn w-full"
        >
          Sign Out
          </button>

      </div>
    )}

    </div>

  ) : (
    <>
      {/* Sign In */}
      {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='white_btn'
                >
                  <FaGoogle className="mr-2" />
                  <span>Sign In</span>
                </button>
              ))}

    </>
  )}
</div>


    </nav>
  )
}

export default Nav