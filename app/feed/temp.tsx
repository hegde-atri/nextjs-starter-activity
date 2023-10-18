const Skeleton = () => {
  return (
    <div className='mx-auto my-2 w-1/2 animate-pulse rounded-md bg-slate-800 p-2'>
      <h1 className='mx-auto my-1 h-6 w-48 rounded-md bg-slate-700 text-center text-xl font-bold'></h1>
      <div className='mx-auto mt-2 h-4 w-3/4 rounded-md bg-slate-700 p-2'></div>
      <div className='mx-auto mt-2 h-4 w-3/4 rounded-md bg-slate-700 p-2'></div>
      <div className='mx-auto mt-2 h-4 w-3/4 rounded-md bg-slate-700 p-2'></div>
      <div className='mx-auto mt-2 h-4 w-3/4 rounded-md bg-slate-700 p-2'></div>
      <p className='mx-auto my-1 my-1 h-4 w-1/5 animate-pulse rounded-md bg-slate-700 text-center italic'></p>
    </div>
  );
};
const Loading = () => {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
};

export default Loading;
