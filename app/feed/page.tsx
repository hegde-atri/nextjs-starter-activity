'use client';

import PostCard from '@/components/PostCard';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Feed = () => {
  let { data: session } = useSession();

  if (session?.user) {
    return (
      <div>
        <PostCard title='testing' />
        <div className='flex'>
          <div className='mx-auto mt-5 rounded-md p-2'></div>
        </div>
      </div>
    );
  } else {
    redirect('/');
  }
};

export default Feed;
