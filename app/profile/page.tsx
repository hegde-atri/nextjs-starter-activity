'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Protected = () => {
  let { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });
  if (session) {
    return (
      <div>
        <h1>Client Protected page</h1>
      </div>
    );
  }
};

export default Protected;
