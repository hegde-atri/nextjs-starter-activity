const Loading = () => {
  return (
    <div
      className='fixed left-0 top-0 flex h-screen w-screen items-center
  justify-center'
    >
      <div
        className='h-16 w-16 animate-spin rounded-full border-b-2 border-t-2
  border-gray-100'
      ></div>
    </div>
  );
};

export default Loading;
