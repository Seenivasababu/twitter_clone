// Your React component
'use client';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function MyApp() {
  const { data: session } = useSession();

  const handleSubmit = () => {
   axios.post('/api/tweet', {
      content : 'Hi',
      userId : 1
   });
  }

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
      <br/>
     
        <button onClick={handleSubmit}> Tweet</button>
     
    </>
  );
}

export default MyApp;
