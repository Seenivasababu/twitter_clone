import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  
  const session = await getServerSession(authOptions);
  console.log(session);
  
  if (!session) return NextResponse.json({}, { status: 401 });
  
  const body = await req.json();

  const res = await prisma.tweet.create({
   data:body
  })

  return NextResponse.json({message:res}, { status: 200 });
}
