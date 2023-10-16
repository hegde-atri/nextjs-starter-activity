'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import GoogleSignInButton from './auth/GoogleSignInButton';

const AuthButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className='flex items-center space-x-2'>
        <Link className='flex items-center space-x-2' href='/profile'>
          <img
            className='rounded-full'
            src={session?.user?.image!}
            width={45}
            height={45}
          />
          <p className='text-gray-200'>{session?.user?.name}</p>
        </Link>
        <button
          className='rounded-md bg-slate-900 p-2 transition duration-300 hover:bg-slate-950'
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    );
  }
  return (
    <div className='flex space-x-2'>
      <GoogleSignInButton />
    </div>
  );
};

export default function NavMenu() {
  return (
    <nav className='flex justify-between bg-slate-800 px-8 py-2 text-white'>
      <Link href='/' className='flex items-center'>
        <Image src='/logo.png' width={50} height={50} alt='Logo' />
        <h1 className='ml-2 font-sans text-3xl font-bold'>Instr</h1>
      </Link>
      <AuthButton />
    </nav>
  );
}
