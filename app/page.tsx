'use client';

import { Dosis } from 'next/font/google';
import {
  IconEyeCheck,
  IconMessage2Bolt,
  IconMoodWink2,
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const dosis = Dosis({
  subsets: ['latin'],
});

export default function Home() {
  let { data: session } = useSession();
  return (
    <div className='mt-16'>
      <div className={dosis.className + ' text-center text-6xl font-bold'}>
        <h1>Welcome to</h1>
        <h1>Instr</h1>
      </div>
      <div className='mt-12 flex flex-col items-center space-y-3'>
        <div className='mx-auto flex items-center justify-center space-x-2'>
          <IconMessage2Bolt height={40} width={40} />
          <p>Share your thoughts.</p>
        </div>
        <div className='mx-auto flex items-center justify-center space-x-2'>
          <IconEyeCheck height={40} width={40} />
          <p>View your friend's thoughts.</p>
        </div>
        <div className='mx-auto flex items-center justify-center space-x-2'>
          <IconMoodWink2 height={40} width={40} />
          <p>React to thoughts.</p>
        </div>
      </div>

      <div>
        {session ? (
          <div className='mt-16 text-center text-gray-300'>
            <p>Looks like you're already signed in.</p>
            <p>
              Head over to your{' '}
              <Link
                className='underline transition duration-300 hover:text-white'
                href='/feed'
              >
                feed
              </Link>{' '}
              and start posting!
            </p>
          </div>
        ) : (
          <p className='mt-16 text-center text-gray-300'>
            You're missing out on all the fun!{' '}
            <Link
              className='underline transition duration-300 hover:text-white'
              href={'/api/auth/signin'}
            >
              Signup.
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
