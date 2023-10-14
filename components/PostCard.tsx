const PostCard = ({ title }: { title: string }) => {
  return (
    <div className='rounded-md bg-slate-800 p-2'>
      <h1 className='text-center text-xl font-bold'>{title}</h1>
      <p className='mt-2 rounded-md bg-slate-700 p-2'>testing</p>
    </div>
  );
};

export default PostCard;
