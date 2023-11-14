// Your React component
'use client'
import { signIn, signOut, useSession } from 'next-auth/react';

function MyApp() {
  const { data: session } = useSession();
  
  return (
    <>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}!</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>Not signed in</p>
          <button onClick={() => signIn('google')}>Sign in with Google</button>
        </>
      )}
    </>
  );
}

export default MyApp