// pages/api/tweet/search.js
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    const body = await req.json();
    const { search } = body;

    try {
      const result = await prisma.tweet.findMany({
        where: {
          content: {
            contains: search,
          },
        },
        select :{
         content:true
        }
      });
      // console.log(result);
      return NextResponse.json(result);

    } catch (error) {
      console.error('Error fetching tweets:', error);
      return NextResponse.json({ error: 'Internal Server Error' });
    }
  } else {
   return NextResponse.json({ error: 'Method Not Allowed' });
  }
}
