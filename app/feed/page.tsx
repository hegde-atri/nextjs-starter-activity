import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import PostCard from '@/components/posts/PostCard';
import CreatePost from '@/components/posts/createPost';

const Feed = async () => {
  const session = await getServerSession(authOptions);
  let posts = await prisma.post.findMany();

  if (session) {
    return (
      <div>
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
      </div>
    );
  } else {
    redirect('/');
  }
};

export default Feed;
