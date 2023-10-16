'use client';

import PostCard from '@/components/posts/PostCard';
import { Suspense, useEffect, useState } from 'react';
import Loading from './loading';
import { redirect } from 'next/navigation';
import type { Post } from '@prisma/client';
import { useSession } from 'next-auth/react';
import CreatePost from '@/components/posts/createPost';

const Feed = () => {
  const { data: session } = useSession();
  let url = 'http://localhost:3000/api/posts';
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
        <Suspense fallback={<Loading />}>
          <div className='mx-auto w-1/2'>
            {posts.map((post, index) => {
              return (
                <div className='rounded-md bg-slate-800 p-2'>
                  <div className='font-3xl'>{post.title}</div>
                  <div>{post.description}</div>
                </div>
              );
            })}
            <CreatePost />
          </div>
        </Suspense>
      </div>
    );
  } else {
    redirect('/');
  }
};

export default Feed;
