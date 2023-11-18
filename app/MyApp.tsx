// Your React component
'use client';
import prisma from '@/prisma/client';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
interface IContent {
  content: String;
}

function MyApp() {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');
  const [list, setList] = useState<IContent[]>([]);

  const handleSubmit = () => {
    axios.post('/api/tweet', {
      content: content,
      userId: 1,
    });
    setContent('');
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('/api/tweet/search', { search });
      const result = response.data;
      console.log(result);
      
      setList(result);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

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
      <br />

      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border-solid bg-slate-300"
        placeholder="Enter your tweet"
      />
      <button onClick={handleSubmit}> Tweet</button>

      <br />
      <br />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-solid bg-slate-300"
        placeholder="Search your tweet"
      />
      <button onClick={handleSearch}> Search</button>
      {list.map((item, index) => {
        return <li key={index}> {item.content}</li>;
      })}
    </>
  );
}

export default MyApp;
