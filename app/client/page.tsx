'use client';

import { useEffect, useState } from 'react';
import Loading from './loading';
import { redirect } from 'next/navigation';
import type { Post } from '@prisma/client';
import { useSession } from 'next-auth/react';
import CreatePost from '@/components/posts/createPost';

const Feed = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data as Post[]);
        setLoading(false);
      });
  }, []);

  if (session) {
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <div className='mx-auto w-1/2'>
          {posts.map((post, index) => {
            return (
              <div className='my-2 rounded-md bg-slate-800 p-2' key={index}>
                <div className='font-3xl'>{post.title}</div>
                <div>{post.description}</div>
              </div>
            );
          })}
          <CreatePost />
        </div>
      </div>
    );
  } else {
    redirect('/');
  }
};

export default Feed;
