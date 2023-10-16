import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const posts = await prisma.post.findMany();
  setTimeout(() => {}, 2000);
  return NextResponse.json(posts);
}

export async function POST() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  let title = 'title';
  let description = 'description';
  await prisma.post.create({
    data: {
      title: title,
      description: description,
      userId: user?.id!,
    },
  });
}
