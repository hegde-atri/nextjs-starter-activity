import React from 'react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Testing</h1>
      {children}
    </div>
  );
}
