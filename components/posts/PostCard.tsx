import prisma from '@/lib/prisma';

interface PostCardProps {
  title: string;
  description: string;
  id: string;
}

const PostCard = async (props: PostCardProps) => {
  let author = await prisma.user.findFirst({
    where: {
      id: props.id,
    },
  });
  return (
    <div className='rounded-md bg-slate-800 p-2'>
      <h1 className='text-center text-xl font-bold text-gray-400'>
        {props.title}
      </h1>
      <div className='my-2 rounded-md p-2 text-sm'>{props.description}</div>
      <div className='flex justify-between'>
        <p className='my-1 text-center italic text-gray-400'>
          ~ {author?.name}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
