import PostCard from '@/components/posts/PostCard';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { Suspense } from 'react';
import Loading from './loading';
import { redirect } from 'next/navigation';
import CreatePost from '@/components/posts/createPost';

const Feed = async () => {
  const session = await getServerSession(authOptions);
  let posts = await prisma.post.findMany();

  if (session) {
    return (
      <div>
        <Suspense fallback={<Loading />}>
          <div className='mx-auto w-1/2'>
            {posts.map((post, index) => {
              return (
                <div className='my-2'>
                  <PostCard
                    title={post.title}
                    description={post.description}
                    id={post.userId}
                    key={index}
                  />
                </div>
              );
            })}
          </div>
          <div className='mx-auto w-1/2'>
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
