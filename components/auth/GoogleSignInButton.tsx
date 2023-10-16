import { IconBrandGoogle } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

interface buttonProps {
  callbackUrl?: string;
}

const GoogleSignInButton = (props: buttonProps) => {
  const url = props.callbackUrl ?? useSearchParams().get('callbackUrl') ?? '';
  return (
    <button
      className='flex items-center rounded-md bg-slate-900 p-2 transition duration-300 hover:bg-slate-950'
      onClick={() => signIn('google', { callbackUrl: url })}
    >
      <p className='pr-2'>Login</p> <IconBrandGoogle height={25} width={25} />
    </button>
  );
};

export default GoogleSignInButton;
