import prisma from '@/lib/prisma';

const PostCard = async ({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: string;
}) => {
  let author = await prisma.user.findFirst({
    where: { id: id },
  });
  return (
    <div className='rounded-md bg-slate-800 p-2'>
      <h1 className='text-center text-xl font-bold text-gray-400'>{title}</h1>
      <div className='my-2 rounded-md p-2 text-sm'>{description}</div>
      <p className='my-1 text-center italic text-gray-400'>~ {author?.name}</p>
    </div>
  );
};

export default PostCard;
